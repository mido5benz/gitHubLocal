import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {noop, Observable, Observer, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import moment from 'moment';
import {RulePickup, Uebernahmen} from '@models/spontaneous-takeovers/rule-pickup.model';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {RulePickupService} from '@app/core/services/spontaneous-takeovers/rule-pickup.service';

@Component({
  selector: 'app-rule-pickup-modal',
  templateUrl: './rule-pickup-modal.component.html',
  styleUrls: ['./rule-pickup-modal.component.scss']
})
export class RulePickupModalComponent implements OnInit {

  public rulePickup: RulePickup = {} as RulePickup;

  // For TourNr Dropdown
  public tourNr: string;
  public dataSource$: Observable<any[]>;
  public selectedTour: any;
  public typeaheadLoading: boolean;
  public gueltigVonFormatted: string;
  public gueltigBisFormatted: string;

  public submittedForm: boolean = false;
  public selectedAmbient: boolean = false;
  public noResult: boolean = false;
  public duplicateWeekday: boolean = false;

  public ladestelle;
  public wochentage: any[] = [
    {
      kuerzel: 'MON',
      tag: 'Montag'
    },
    {
      kuerzel: 'DIE',
      tag: 'Dienstag'
    },
    {
      kuerzel: 'MIT',
      tag: 'Mittwoch'
    },
    {
      kuerzel: 'DON',
      tag: 'Donnerstag'
    },
    {
      kuerzel: 'FRE',
      tag: 'Freitag'
    },
    {
      kuerzel: 'SAM',
      tag: 'Samstag'
    },
    {
      kuerzel: 'SON',
      tag: 'Sonntag'
    },
  ];

  public uebernahmen: any[] = [
    {
      id: 1,
      wochentag: '',
      ankunftZeit: '',
      anzahlUebernahmen: 1,
      anzahlFahrzeuge: 0
    }
  ];

  constructor(
    private dialogConfig: DialogConfig,
    private dialogRef: DialogRef,
    private cd: ChangeDetectorRef,
    private tourListFacade: TourlistFacade,
    private rulePickupService: RulePickupService) {
  }

  ngOnInit(): void {
    this.fillModalWithData();

    this.dataSource$ = new Observable((observer: Observer<string>) => {
      observer.next(this.tourNr);
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          return this.tourListFacade.searchTour(query).pipe(
            map((data: any) => data || []),
            tap(
              () => noop,
              (err) => {
                // in case of http error
              }
            )
          );
        }
        return of([]);
      })
    );
  }

  fillModalWithData() {
    this.ladestelle = this.dialogConfig.data;
    this.rulePickup = this.dialogConfig.data;
    this.tourNr = this.dialogConfig.data.tournr;

    if (this.dialogConfig.data.versender_adresse && this.dialogConfig.data.ladestelle_adresse) {
      this.rulePickup.versender_adresse_id = this.dialogConfig.data.versender_adresse.adresse_id;
      this.rulePickup.ladestelle_adresse = this.dialogConfig.data.ladestelle_adresse;
    }

    if (this.dialogConfig.data?.uebernahmen) {
      for (let i = 0; i < this.dialogConfig.data.uebernahmen.length; i++) {
        if (i > 0) {
          this.addField();
        }
        this.uebernahmen[i] = this.dialogConfig.data.uebernahmen[i];
        this.uebernahmen[i].id = i;
      }
    }
    this.dateFormatter();
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedTour = event.item;
    this.cd.detectChanges();
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  checkedAmbientBox(event: any) {
    this.selectedAmbient = event.target.checked;
  }

  dateFormatter() {
    if (this.submittedForm) {
      // Convert String 'yyyy-mm-dd' to 'dd.mm.yyyy' to send to the backend
      let dateStringVon = this.gueltigVonFormatted;
      let momentVariableVon = moment(dateStringVon, 'YYYY-MM-DD');
      this.gueltigVonFormatted = momentVariableVon.format('DD.MM.YYYY');

      let dateStringBis = this.gueltigBisFormatted;
      let momentVariableBis = moment(dateStringBis, 'YYYY-MM-DD');
      this.gueltigBisFormatted = momentVariableBis.format('DD.MM.YYYY');

    } else {
      // Convert String 'dd.mm.yyyy' to 'yyyy-mm-dd' to show in formular
      let dateStringVon = this.rulePickup.gueltigvon;
      let momentVariableVon = moment(dateStringVon, 'DD-MM-YYYY');
      this.gueltigVonFormatted = momentVariableVon.format('YYYY-MM-DD');
      //
      let dateStringBis = this.rulePickup.gueltigbis;
      let momentVariableBis = moment(dateStringBis, 'DD-MM-YYYY');
      this.gueltigBisFormatted = momentVariableBis.format('YYYY-MM-DD');
    }
  }

  onSubmit() {
    this.submittedForm = true;
    let tempUebernahme: Uebernahmen[] = [];

    this.uebernahmen.forEach((uebernahme) => {
      const requestUebernahmeObject: Uebernahmen = {
        wochentag: uebernahme.wochentag,
        ankunftZeit: uebernahme.ankunftZeit + ':00',
        anzahlUebernahmen: uebernahme.anzahlUebernahmen,
        anzahlFahrzeuge: uebernahme.anzahlFahrzeuge
      };
      tempUebernahme.push(requestUebernahmeObject);
    });

    this.dateFormatter();

    const requestObject: RulePickup = {
      dauerauftrag_id: this.rulePickup.dauerauftrag_id,
      ladestelle_adresse: this.rulePickup.ladestelle_adresse,
      versender_adresse_id: this.rulePickup.versender_adresse_id,
      tornr: this.rulePickup.tornr,
      tournr: this.tourNr,
      info: this.rulePickup.info,
      eurodiskz: this.rulePickup.eurodiskz,
      auftragsname: this.rulePickup.auftragsname ? this.rulePickup.auftragsname : 'Regelübernahme',
      ambient: this.selectedAmbient,
      gueltigvon: this.gueltigVonFormatted,
      gueltigbis: this.gueltigBisFormatted,
      uebernahmen: tempUebernahme,

    };

    this.rulePickupService.saveRulePickup(requestObject).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        this.rulePickupService.createdRegelabholung(true);
      }
    });

    this.resetFormular();
  }

  checkDuplicateWeekday(event: any) {
    let checkDiplicate = [];

    for (let i = 0; i < this.uebernahmen.length; i++) {
      for (let j = i + 1; j < this.uebernahmen.length; j++) {
        if (this.uebernahmen[i].wochentag === this.uebernahmen[j].wochentag) {
          checkDiplicate.push(true);
        } else {
          checkDiplicate.push(false);
        }
      }
    }
    this.duplicateWeekday = checkDiplicate.find((duplicate) => duplicate === true);
  }

  addField() {
    this.uebernahmen.push({
      id: this.uebernahmen.length + 1,
      wochentag: '',
      ankunftZeit: '',
      anzahlUebernahmen: 1,
      anzahlFahrzeuge: 0
    });
  }

  removeField(i: number) {
    if (i !== 0) {
      this.uebernahmen.splice(i, 1);
    }
  }

  resetFormular() {
    this.submittedForm = false;
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK
    });
  }

}
