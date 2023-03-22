import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {DispoStopp, Tour} from '@shared/models';
import {TourService} from '@app/core/services';
import {RescheduleService} from '@app/core/services/reschedule/reschedule.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tour-info',
  templateUrl: './tour-info.component.html',
  styleUrls: ['./tour-info.component.scss']
})
export class TourInfoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  @Input() tourNr: string;
  @Input() tourWeight: string;
  @Input() colliCount: number;
  @Input() tourDuration: number;
  @Input() paletteCount: number;
  public beforeReloadline = [];
  public beneathReloadline = [];

  public tourWeightBeforeReloadline: number = 0;
  public tourWeightBeneathReloadline: number = 0;

  public colliCountBeforeReloadline: number = 0;
  public colliCountBeneathReloadline: number = 0;

  public paletteCountBeforeReloadline: number = 0;
  public paletteCountBeneathReloadline: number = 0;

  public resultTimeBeforReloadLine: number;
  public resultTimeAfterReloadLine: number;

  public maxFahrtzeitInSec = 28800;

  public sollAbfahrszeit: string;

  constructor(private selectedTourFacade: SelectedTourFacade, private tourService: TourService, private rescheduleService: RescheduleService, private cd: ChangeDetectorRef) {
    this.subscription.add(this.selectedTourFacade.tourId$.subscribe((tourid: number) => {
      if (tourid !== 0 && tourid !== undefined) {
        this.subscription.add(this.tourService.fetchTourById(tourid, true).subscribe((tour: Tour) => {
          this.sollAbfahrszeit = tour?.tour?.soll_abfahrtszeit;
        }));
      }
    }));

    setTimeout(() => {

      this.selectedTourFacade.stoppsWithReload$.subscribe((stopps) => {
        let stoppsArray = stopps?.filter((stopp) => stopp?.soll_stopp !== null && stopp?.sum !== undefined);
        if (stoppsArray !== undefined) {

          this.resetValues();
          let indexNull;

          for (let i = 0; i < stoppsArray.length; i++) {
            if (stoppsArray[i].dispostopp_id === null) {
              indexNull = i;
              break;
            } else {
              this.beforeReloadline.push(stoppsArray[i]);
            }
          }
          for (let i = (indexNull + 1); i < stoppsArray.length; i++) {
            this.beneathReloadline.push(stoppsArray[i]);
          }

          this.getTourWeightBeforReloadline(this.beforeReloadline);
          this.getTourBeneathReloadline(this.beneathReloadline);
          this.timeReloadLine();

          if (!this.cd['destroyed']) {
            this.cd.detectChanges();
          }
        }
      });

    }, 1000);
  }

  ngOnInit(): void {
    this.rescheduleService.emptyTour.subscribe((empty: boolean) => {
      if (empty) {
        this.tourNr = '';
      }
    });
  }

  public timeReloadLine() {
    this.selectedTourFacade.duration$.subscribe((tourDauer) => {
      this.tourDuration = tourDauer;
      let getTimeRegex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;

      let startBefore = this.beforeReloadline[0]?.planAnkunft?.match(getTimeRegex)[0];
      let endBefore = this.beforeReloadline[this.beforeReloadline.length - 1]?.planAnkunft?.match(getTimeRegex)[0];

      let startBeneath = this.beneathReloadline[0]?.planAnkunft?.match(getTimeRegex)[0];
      let endBeneath = this.beneathReloadline[this.beneathReloadline.length - 1]?.planAnkunft?.match(getTimeRegex)[0];

      if (endBeneath !== undefined) {
        if (startBefore !== undefined && endBefore !== undefined && startBeneath !== undefined) {

          let timeBeforReloadLine = this.calculateTime(this.sollAbfahrszeit, endBefore);
          let restDauerInSekunden = tourDauer - timeBeforReloadLine;

          this.resultTimeBeforReloadLine = timeBeforReloadLine;
          this.resultTimeAfterReloadLine = restDauerInSekunden;

        }
      } else {
        // Wenn Nachladebereich nicht definiert wurde
        this.resultTimeBeforReloadLine = tourDauer;
        this.resultTimeAfterReloadLine = 0;
      }
    });
  }

  public calculateTime(start, end) {
    if (start !== undefined && end !== undefined) {
      const startTime = start.split(':');
      const startSeconds = startTime[0] * 3600 + startTime[1] * 60 + (+startTime[2]);
      const endTime = end.split(':');
      const endSeconds = endTime[0] * 3600 + endTime[1] * 60 + (+endTime[2]);

      return endSeconds - startSeconds;
    }
  }

  resetValues(): void {
    this.beforeReloadline = [];
    this.beneathReloadline = [];

    this.tourWeightBeforeReloadline = 0;
    this.tourWeightBeneathReloadline = 0;
    this.colliCountBeforeReloadline = 0;
    this.colliCountBeneathReloadline = 0;
    this.paletteCountBeforeReloadline = 0;
    this.paletteCountBeneathReloadline = 0;
  }

  getTourWeightBeforReloadline(beforeReloadline) {
    beforeReloadline.map((dispostopp: DispoStopp) => {
      this.tourWeightBeforeReloadline = this.tourWeightBeforeReloadline + dispostopp?.sum.soll_gewicht_sum;
      this.colliCountBeforeReloadline = this.colliCountBeforeReloadline + dispostopp?.sum.soll_col_sum;
      this.paletteCountBeforeReloadline = this.paletteCountBeforeReloadline + dispostopp?.sum.soll_pal_sum;
    });
  };

  getTourBeneathReloadline(beneathReloadline) {
    beneathReloadline.map((dispostopp: DispoStopp) => {
      this.tourWeightBeneathReloadline = this.tourWeightBeneathReloadline + dispostopp?.sum.soll_gewicht_sum;
      this.colliCountBeneathReloadline = this.colliCountBeneathReloadline + dispostopp?.sum.soll_col_sum;
      this.paletteCountBeneathReloadline = this.paletteCountBeneathReloadline + dispostopp?.sum.soll_pal_sum;
    });
  };


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
