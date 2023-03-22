import {Component, OnInit} from '@angular/core';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {RecipientFacade} from '@store/stammdaten/facades/recipient.facade';
import {Observable} from 'rxjs';
import {addDeliveryPeriod} from '@store/stammdaten/actions/recipient.actions';
import {Zeitfenster} from '@models/recipient/recipient.models';
import moment from 'moment';

const parseTime = (timeVal: string): string[] => timeVal.split(':');

@Component({
  selector: 'app-recipient-delivery-period',
  templateUrl: './recipient-delivery-period.component.html',
  styleUrls: ['./recipient-delivery-period.component.scss']
})
export class RecipientDeliveryPeriodComponent implements OnInit {

  dayFormInvalid = true;
  timeFormInvalid = false;

  loading$: Observable<boolean>;
  hasError$: Observable<boolean>;

  formGroup = this.fb.group({
    monday: new FormControl(false),
    tuesday: new FormControl(false),
    wednesday: new FormControl(false),
    thursday: new FormControl(false),
    friday: new FormControl(false),
    saturday: new FormControl(false)
  });

  timeFormGroup = this.fb.group({
    von: new FormControl('08:00', [Validators.required]),
    bis: new FormControl('20:00', Validators.required)
  });

  constructor(
    private recipientFacade: RecipientFacade,
    private modalRef: DialogRef,
    private fb: FormBuilder) {
    this.hasError$ = this.recipientFacade.deliverPeriodHasError$;
    this.loading$ = this.recipientFacade.deliverPeriodLoading$;
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((values: any) => {
      this.dayFormInvalid = !Object.keys(values).some((k) => values[k]);
    });

    this.timeFormGroup.controls.von.valueChanges.subscribe((timeVon: string) => {
        const timeBis = this.timeFormGroup.controls.bis.value;
        this.timeFormInvalid = timesValid(timeVon, timeBis);
      }
    );

    this.timeFormGroup.controls.bis.valueChanges.subscribe((timeBis: string) => {
        const timeVon = this.timeFormGroup.controls.von.value;
        this.timeFormInvalid = timesValid(timeVon, timeBis);
      }
    );
  }

  closeCancel(): void {
    this.modalRef.close();
  }

  closeOk(): void {
    const values = {
      bis: this.timeFormGroup.value.bis,
      von: this.timeFormGroup.value.von,
      ...this.formGroup.value
    };

    const deliveryTimeFrame: Zeitfenster[] = this.createTimeFramesFromFormValues(values);
    this.recipientFacade.dispatch(addDeliveryPeriod({deliveryPeriodTimeFrames: deliveryTimeFrame}));
    this.modalRef.close();
  }

  private getNumberForWeekday(weekdayName: string): number {
    switch (weekdayName) {
      case 'monday':
        return 1;
      case 'tuesday':
        return 2;
      case 'wednesday':
        return 3;
      case 'thursday':
        return 4;
      case 'friday':
        return 5;
      case 'saturday':
        return 6;
      case 'sunday':
        return 7;
      default:
        return -1;
    }
  }

  private createTimeFramesFromFormValues(formValues: any): Zeitfenster[] {
    const timeFrames: any[] = [];
    const checkedWeekDays = this.getCheckedDays(formValues);

    const startDate = formValues.von;
    const endDate = formValues.bis;

    const offset = new Date().getTimezoneOffset();

    const start = moment();
    const startTimeParts = parseTime(startDate);
    start.hour(+startTimeParts[0]);
    start.minute(+startTimeParts[1]);
    start.subtract(offset, 'minutes');

    const end = moment();
    const endTimeParts = parseTime(endDate);
    end.hour(+endTimeParts[0]);
    end.minute(+endTimeParts[1]);
    end.subtract(offset, 'minutes');

    checkedWeekDays.forEach((checkedDayValue) => {
      const timeFrame = {
        von: start.toISOString().slice(0, -1),
        bis: end.toISOString().slice(0, -1),
        wochentag: this.getNumberForWeekday(checkedDayValue),
        status: '',
        bemerkung: ''
      };
      timeFrames.push(timeFrame);
    });

    return timeFrames;
  }

  private getCheckedDays(formValue: any): string[] {
    const keys = Object.keys(formValue);
    return keys.filter((key) => formValue[key] === true);
  }
}

const timesValid = (timeVon: string, timeBis: string) => {
  const timePartsVon = parseTime(timeVon);
  const timePartsBis = parseTime(timeBis);

  const bis = moment().month(0).date(1).year(1970).hours(+timePartsBis[0]).minutes(+[timePartsBis[1]]);
  const von = moment().month(0).date(1).year(1970).hours(+timePartsVon[0]).minutes(+timePartsVon[1]);

  return von.isAfter(bis);
};
