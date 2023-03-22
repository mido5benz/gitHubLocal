import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalService, TypeaheadMatch} from 'ngx-bootstrap';
import {SpontaneousTakeoversService} from '@app/core/services/spontaneous-takeovers/spontaneous-takeovers.service';
import {LadestelleAdresse, SpontaneUebernahme} from '@models/spontaneous-takeovers/spontaneous-takeovers.model';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogConfig, DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {TakeoverAddressModalComponent} from '@shared/component/spontaneous-takeover/takeover-address-modal/takeover-address-modal.component';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {DialogRef} from '@modules/dialog/dialog-ref';
import moment from 'moment';
import {noop, Observable, Observer, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';


@Component({
  selector: 'app-spontaneous-takeover-modal',
  templateUrl: './spontaneous-takeover-modal.component.html',
  styleUrls: ['./spontaneous-takeover-modal.component.scss']
})
export class SpontaneousTakeoverModalComponent implements OnInit, OnDestroy {

  //@Input() tournr;

  public versenderLadestellen: LadestelleAdresse[] = [];
  public spontaneUebernahme: SpontaneUebernahme = {} as SpontaneUebernahme;

  public selectedAmbient: boolean = false;
  public uebernahmeDatumFormatted: string;
  public submittedForm: boolean = false;
  public noResult = false;
  public depotId;

  // For TourNr Dropdown
  public tourNr: string;
  public dataSource$: Observable<any[]>;
  public selectedTour: any;
  public typeaheadLoading: boolean;

  constructor(private modalService: BsModalService,
              private dialogService: DialogService,
              private dialogConfig: DialogConfig,
              private dialogRef: DialogRef,
              private cd: ChangeDetectorRef,
              private spontaneousTakeoverService: SpontaneousTakeoversService,
              private tourListFacade: TourlistFacade) {
  }

  ngOnInit(): void {

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

    this.spontaneUebernahme = this.dialogConfig.data;
    // Initial wird die TourNr aus der selektierten Zeile entnommen, um es im Formular vorerst anzuzeigen.
    this.tourNr = this.spontaneUebernahme.tour_nr;

    // DatePicker expects the format 'yyyy-mm-dd'
    this.dateFormatter();
  }

  dateFormatter() {
    if (this.submittedForm) {
      // Convert String 'yyyy-mm-dd' to 'dd.mm.yyyy' to send to the backend
      let dateString = this.uebernahmeDatumFormatted;
      let momentVariable = moment(dateString, 'YYYY-MM-DD');
      this.uebernahmeDatumFormatted = momentVariable.format('DD.MM.YYYY');

    } else {
      // Convert String 'dd.mm.yyyy' to 'yyyy-mm-dd' to show in formular
      let dateString = new Date();
      let momentVariable = moment(dateString, 'DD-MM-YYYY');
      this.uebernahmeDatumFormatted = momentVariable.format('YYYY-MM-DD');
    }
  }

  onSubmit(): void {
    this.spontaneousTakeoverService.newDepotNr.subscribe((depotnr) => {
      if(depotnr) {
        this.depotId = depotnr;
      }else {
        this.depotId = localStorage.getItem('userDepot');
      }
    })

    this.submittedForm = true;
    this.dateFormatter();

    const requestObject: SpontaneUebernahme = {
      uebernahme_id: this.spontaneUebernahme.uebernahme_id === undefined ? null : this.spontaneUebernahme.uebernahme_id,
      ueb_ladestelle_id: this.spontaneUebernahme.ueb_ladestelle_id,
      tour_nr: this.tourNr,
      depot: this.depotId,
      ambient: this.selectedAmbient,
      ladestelle_adresse_id: this.spontaneUebernahme.ladestelle_adresse.adresse_id,
      versender_adresse_id: this.spontaneUebernahme.versender_adresse.adresse_id,
      name_1: this.spontaneUebernahme.name_1,
      name_2: this.spontaneUebernahme.name_2,
      name_3: this.spontaneUebernahme.name_3,
      strasse: this.spontaneUebernahme.strasse,
      hausnr: this.spontaneUebernahme.hausnr,
      plz: this.spontaneUebernahme.plz,
      ort: this.spontaneUebernahme.ort,
      land: this.spontaneUebernahme.land,
      uebernahmeDatum: this.uebernahmeDatumFormatted,
      uebernahmeZeit: this.spontaneUebernahme.uebernahmeZeit
    };

    this.spontaneousTakeoverService.saveSpontaneousTakeovers(requestObject).subscribe((response) => {
      if (response) {
        this.spontaneousTakeoverService.formSubmitted(true);
      }
    });
    this.resetFormular();
  }

  openTakeoverAddressModal(): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 1200,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Übernahmeanschrift auswählen',
        height: 315,
        data: this.versenderLadestellen
      },
      TakeoverAddressModalComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
      }
    });
  }

  checkedAmbientBox(event: any) {
    this.selectedAmbient = event.target.checked;
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedTour = event.item;
    this.cd.detectChanges();
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  resetFormular() {
    this.spontaneUebernahme = {} as SpontaneUebernahme;
    this.submittedForm = false;
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK
    });
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }

}
