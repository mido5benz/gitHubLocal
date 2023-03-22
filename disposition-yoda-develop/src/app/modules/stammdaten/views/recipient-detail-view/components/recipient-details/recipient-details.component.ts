import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StammdatenFacade} from '@store/stammdaten/facades/stammdate.facade';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'ngx-bootstrap-multiselect';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment*';
import {ToastrService} from 'ngx-toastr';
import {StammdatenService} from '@app/core/services';

@Component({
  selector: 'app-recipient-details',
  templateUrl: './recipient-details.component.html',
  styleUrls: ['./recipient-details.component.scss']
})
export class RecipientDetailsComponent implements OnInit {

  currentRecipient;
  optionsModel: number[] = [];
  settingsList: IMultiSelectOption[];

  public sendungAvisTyp: SendungAvisTyp;
  public emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public fahrzeugTypen: any[];

  public istAvisChecked: boolean;
  public sollAvisChecked: boolean;
  public avisDezimalKomma: boolean;
  public avisOhneVolumen: boolean;
  public avisSamstag: boolean;

  public signatureTypes = [
    {
      name: 'easy + RK',
    },
    {
      name: 'easy',
    },
    {
      name: 'Rollkarte',
    }];

  settingTexts: IMultiSelectTexts = {
    defaultTitle: 'Bitte auswählen',
  };

  selectSettings: IMultiSelectSettings = {
    buttonClasses: 'btn btn-primary btn-sm',
  };

  addressForm: FormGroup = this.fb.group({
    name1: [{value: '', disabled: true}, Validators.required],
    name2: [{value: '', disabled: true}, Validators.required],
    name3: [{value: '', disabled: true}, Validators.required],
    strasse: [{value: '', disabled: true}, Validators.required],
    hausnr: [{value: '', disabled: true}, Validators.required],
    plz: [{value: '', disabled: true}, Validators.required],
    ort: [{value: '', disabled: true}, Validators.required],
    land: [{value: '', disabled: true}, Validators.required],
    type: [{value: 0}, Validators.required],
  });

  sendungAvisForm: FormGroup = this.fb.group({
    emails: this.fb.array([
      // this.fb.control('')
    ]),
    avistyp: [{value: 0, disabled: false}],
    trennzeichen: [{value: '', disabled: false}],
    soll_avis: [{value: false, disabled: false}],
    // ist_avis: [{value: false, disabled: false}],
    avis_dezimal_komma: [{value: false, disabled: false}],
    avis_ohne_volumen: [{value: false, disabled: false}],
    avis_samstag: [{value: false, disabled: false}]
  });

  get getEmails() {
    return this.sendungAvisForm.get('emails') as FormArray;
  }

  public addNewEmail() {
    this.getEmails.push(this.fb.control('', Validators.pattern(this.emailRegularExpression)));
  }

  public removeEmail(index: number) {
    if (index !== 0) {
      this.getEmails.removeAt(index);
    }
  }

  @Input() set address(value: any) {
    if (value) {
      this.addressForm.patchValue({
        strasse: value.address.strasse,
        hausnr: value.address.hausnr,
        plz: value.address.plz,
        ort: value.address.ort,
        land: value.address.land,
      });
    }
  }

  @Input() set recipient(value: any) {
    this.currentRecipient = value;

    if (value) {
      value.eigenschaften.every((selectedOption: string) => this.optionsModel.push(this.getCodeForSettingsCaption(selectedOption)));

      if (value.email.length > 1) {
        for (let i = 1; i < value.email.length; i++) {
          this.addNewEmail();
        }
      }

      this.sendungAvisForm.patchValue({
        emails: value?.email,
        avistyp: value?.sendungavistyp_id,
        trennzeichen: value?.sendungavis_trennzeichen,
        soll_avis: value?.soll_avis,
        // ist_avis: value?.ist_avis,
        avis_dezimal_komma: value?.avis_dezimal_komma,
        avis_ohne_volumen: value?.avis_ohne_volumen,
        avis_samstag: value?.avis_samstag
      });

      this.fillAvisCheckboxes();
    }

    this.addressForm.patchValue({
      name1: value?.name1,
      name2: value?.name2,
      name3: value?.name3,
    });

    this.stammdatenFacade.fahrzeugtypen$.subscribe((fahrzeugTypen: any) => {
      const flags = [];
      const output = [];
      const l = fahrzeugTypen.length;
      let i;
      for (i = 0; i < l; i++) {
        if (flags[fahrzeugTypen[i].fahrzeugklasse_id]) {
          continue;
        }
        flags[fahrzeugTypen[i].fahrzeugklasse_id] = true;
        output.push(fahrzeugTypen[i]);
      }
      output.push(
        {
          type: 'empty',
          fahrzeugklasse_id: 777,
          fk_code: 'Bitte wählen'
        }
      );
      this.fahrzeugTypen = output.reverse();

      if (value) {
        if (!value.fahrzeugklasse_id) {
          this.addressForm.patchValue({
            type: '777',
          });
        } else {
          this.addressForm.patchValue({
            type: value.fahrzeugklasse_id,
          });
        }
      }
    });
  }

  fillAvisCheckboxes() {
    this.sendungAvisForm.get('soll_avis').value ? this.sollAvisChecked = true : this.sollAvisChecked = false;
    // this.sendungAvisForm.get('ist_avis').value ? this.istAvisChecked = true : this.istAvisChecked = false;
    this.sendungAvisForm.get('avis_dezimal_komma').value ? this.avisDezimalKomma = true : this.avisDezimalKomma = false;
    this.sendungAvisForm.get('avis_ohne_volumen').value ? this.avisOhneVolumen = true : this.avisOhneVolumen = false;
    this.sendungAvisForm.get('avis_samstag').value ? this.avisSamstag = true : this.avisSamstag = false;

  }

  constructor(
    private toastrService: ToastrService,
    private http: HttpClient,
    private fb: FormBuilder,
    private stammdatenFacade: StammdatenFacade,
    private stammdaten: StammdatenService) {

    this.stammdaten.getSendungAvisTypen().subscribe((sendungAvisTypen) => {
      this.sendungAvisTyp = sendungAvisTypen;
    });
  }

  ngOnInit(): void {
    this.settingsList = [
      {id: 1, name: 'Lieferliste'},
      {id: 2, name: 'Unterschrift auf Rollkarte'},
    ];
    // Wird initial einmal hier aufgerufen, damit das erste E-Mail inputfeld angezeigt wird
    this.addNewEmail();
  }

  update(): void {
    const formValue = this.addressForm.value;
    const settings = [];
    this.optionsModel.every((selectedOption: number) => settings.push(this.getCaptionForSettingCode(selectedOption)));

    if (formValue.type === '777') {
      this.toastrService.error('Bitte einen Tour-Typ auswählen');
    } else {
      const requestBody = this.buildRequestBody(formValue, settings);
      this.http.post(`${environment.apiHost}/ziele`, requestBody).subscribe(
        result => this.toastrService.success('Erfolgreich gespeichert'),
        error => this.toastrService.error('Konnte nicht gespeichert werden'),
      );
    }
  }

  private getCaptionForSettingCode(code: number): string {
    switch (code) {
      case 1:
        return 'LL_DRUCK';
      case 2:
        return 'RK_DRUCK';
    }
  }

  private getCodeForSettingsCaption(caption: string): number {
    switch (caption) {
      case 'LL_DRUCK':
        return 1;
      case 'RK_DRUCK':
        return 2;
    }
  }

  private buildRequestBody(formValues: any, codes: string[]): ZielNameRequest {
    return {
      ziel_name_id: this.currentRecipient.ziel_name_id,
      geoposition_id: this.currentRecipient.geoposition_id,
      name: this.currentRecipient.name,
      name1: this.currentRecipient.name1,
      name2: this.currentRecipient.name2,
      name3: this.currentRecipient.name3,
      name123: this.currentRecipient.name123,
      fahrzeugklasse_id: +formValues.type,
      eigenschaften: codes,

      // SendungAvis
      email: this.sendungAvisForm.controls['emails'].value,
      sendungavistyp_id: this.sendungAvisForm.controls['avistyp'].value,
      sendungavis_trennzeichen: this.sendungAvisForm.controls['trennzeichen'].value,
      soll_avis: this.sendungAvisForm.controls['soll_avis'].value,
      // ist_avis: this.sendungAvisForm.controls['ist_avis'].value,
      avis_dezimal_komma: this.sendungAvisForm.controls['avis_dezimal_komma'].value,
      avis_ohne_volumen: this.sendungAvisForm.controls['avis_ohne_volumen'].value,
      avis_samstag: this.sendungAvisForm.controls['avis_samstag'].value,
    };
  }

  avisCheckboxValue(event) {
    if (event.target.id === 'soll_avis') {
      this.sendungAvisForm.patchValue({soll_avis: event.target.checked});
    }
    // if (event.target.id === 'ist_avis') {
    //   this.sendungAvisForm.patchValue({ist_avis: event.target.checked});
    // }
    if (event.target.id === 'avis_dezimal_komma') {
      this.sendungAvisForm.patchValue({avis_dezimal_komma: event.target.checked});
    }
    if (event.target.id === 'avis_ohne_volumen') {
      this.sendungAvisForm.patchValue({avis_ohne_volumen: event.target.checked});
    }
    if (event.target.id === 'avis_samstag') {
      this.sendungAvisForm.patchValue({avis_samstag: event.target.checked});
    }
  }

}

export interface ZielNameRequest {
  ziel_name_id: string;
  geoposition_id: string;
  name: string;
  name1: string;
  name2: string;
  name3: string;
  name123: string;
  fahrzeugklasse_id: number;
  eigenschaften: string[];
  email: string[];
  sendungavistyp_id: number;
  sendungavis_trennzeichen: string;
  soll_avis: boolean;
  // ist_avis: boolean;
  avis_dezimal_komma: boolean;
  avis_ohne_volumen: boolean;
  avis_samstag: boolean;
}

export interface SendungAvisTyp {
  sendungavistyp_id: number;
  code: string;
  bezeichnung: string;
}

