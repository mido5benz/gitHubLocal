import {Component, HostListener, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DispoStopp, TourSum} from '@models/index';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ComponentCanDeactivate} from '@app/core/guards/pending-changes/pending-changes-guard.service';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {TourInfoHeaderComponent} from '@manual-dispo-views/tour-detail-view/components/tour-info-header/tour-info-header.component';
import {TourDetailStoppListComponent} from '@manual-dispo-views/tour-detail-view/components/tour-detail-stopp-list/tour-detail-stopp-list.component';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {MoveStoppPopupComponent} from '@modules/manual-dispo/components';
import {ChangeStoppsOrderFacade} from '@store/manual-dispo/stopps/facades/change-stopps-order.facade';
import {setSelectedTourId} from '@store/manual-dispo/tour/actions/selected-tour.actions';
import {changeTourStoppsOrderRequest} from '@store/manual-dispo/tour/actions/change-stopps-order.actions';
import {TourService} from '@app/core/services';
import {ToastrService} from 'ngx-toastr';
import {MergeRecipientsDialogComponent} from '@modules/stammdaten/components';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Component({
  selector: 'app-tour-detail-view',
  templateUrl: './tour-detail-view.component.html',
  styleUrls: ['./tour-detail-view.component.scss']
})
export class TourDetailViewComponent implements OnInit, ComponentCanDeactivate {

  @ViewChild(TourDetailStoppListComponent) tourDetailStoppListComponent: TourDetailStoppListComponent;
  @ViewChild(TourInfoHeaderComponent) tourInfoHeaderComponent: TourInfoHeaderComponent;

  public selectedStopps: DispoStopp[] = [];
  public tourId: number;
  public sortOrderChanged: boolean;

  public tourNr$: Observable<string>;
  public loading$: Observable<boolean>;
  public frozen$: Observable<boolean>;
  public stopps$: Observable<DispoStopp[]>;
  public ausliefertag$: Observable<string>;
  public tourDuration$: Observable<number>;
  public tourSums$: Observable<TourSum>;
  public kennzeichenPflichtig$: Observable<boolean>;
  public abgefertigt$: Observable<boolean>;
  public isTourBlocked$: Observable<boolean>;
  public isPotenziellGleicheZieleVorhanden$: Observable<boolean>;
  public hasAllStoppsSollstopp: boolean;

  public editModeEnabled = false;

  private stopps: DispoStopp[] = [];

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.editModeEnabled;
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private router: Router,
    private changeStoppsOrderFacade: ChangeStoppsOrderFacade,
    private dialogService: DialogService,
    private rescheduleFacade: RescheduleFacade,
    private route: ActivatedRoute,
    private selectedTourFacade: SelectedTourFacade,
    private alertService: ToastrService,
    private tourService: TourService) {
    this.route.parent.params.pipe(
      map((params) => {
        this.tourId = params.tourId;
        return params.tourId;
      }),
      map((tourId: string) => this.selectedTourFacade.dispatch(setSelectedTourId({id: +tourId})))).subscribe();
  }

  ngOnInit(): void {
    this.frozen$ = this.selectedTourFacade.frozen$;
    this.loading$ = this.rescheduleFacade.loading$;
    this.stopps$ = this.selectedTourFacade.stopps$;
    this.tourNr$ = this.selectedTourFacade.tourNr$;
    this.ausliefertag$ = this.selectedTourFacade.ausliefertag$;
    this.tourDuration$ = this.selectedTourFacade.duration$;
    this.tourSums$ = this.selectedTourFacade.tourSums$;
    this.kennzeichenPflichtig$ = this.selectedTourFacade.kennzeichenPflicht$;
    this.abgefertigt$ = this.selectedTourFacade.abgefertigt$;
    this.isPotenziellGleicheZieleVorhanden$ = this.selectedTourFacade.potenziellGleicheZiele$;
    this.isTourBlocked$ = this.tourService.isTourBlocked(this.tourId);

    this.hasTourStoppnr();
  }

  // Wird überprüft ob alle Stopps auf der Tour eine soll_stopp haben
  hasTourStoppnr() {
    this.stopps$.subscribe((stopps) => {
      stopps.map((stopp) => {
        this.hasAllStoppsSollstopp = stopp.soll_stopp === null;
      })
    })
  }

  onStoppSelected(stopps: DispoStopp[]): void {
    this.selectedStopps = stopps;
  }

  onSortOrderChanged(stopps: DispoStopp[]): void {
    this.sortOrderChanged = true;
    this.stopps = stopps.filter((stopp: DispoStopp) => !stopp.isReloadStopp);
  }

  toggleEditMode(): void {
    // If the edit mode is enabled
    if (!this.editModeEnabled) {
      this.tourInfoHeaderComponent.resetStoppSelection();
    }
    this.editModeEnabled = !this.editModeEnabled;
  }

  openDispositionDialog(data: { sourceTourId: number; stopps: DispoStopp[] }): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 400,
        closeOnOutsideClicked: true,
        showTitle: true,
        title: 'Stopp umdisponieren',
        data
      },
      MoveStoppPopupComponent);

    dialogRef.afterClosed.subscribe(() => {
      this.tourDetailStoppListComponent.gridApi.deselectAll();
      this.tourInfoHeaderComponent.resetStoppSelection();
    });
  }

  saveNewSortOrder(): void {
    const requestBody: any = [];
    const filteredStopps = this.stopps.filter((stopp: DispoStopp) => !stopp.isReloadStopp);
    filteredStopps.map((stopp) => requestBody.push({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        dispostopp_id: stopp.dispostopp_id,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        soll_stopp: stopp.soll_stopp
      })
    );

    this.sortOrderChanged = false;
    this.toggleEditMode();
    this.changeStoppsOrderFacade.dispatch(changeTourStoppsOrderRequest({tourId: +this.tourId, stopps: filteredStopps}));
  }

  isBearbeitungAbschliesenClicked(isButtonClicked: boolean) {
    if (isButtonClicked) {
      this.tourService.setPotenzielleZieleBearbeitung(this.tourId).subscribe((result) => {
        if (result === true) {
          this.alertService.success('Bearbeitung erfolgreich abgeschlossen!', 'Bearbeitung der Ziele');
        } else {
          this.alertService.error('Die Bearbeitung konnte nicht abgeschlossen werden!', 'Bearbeitung der Ziele');
        }
      });
    }
  }

  routeToStoppDeliveries(event$): void {
    this.router.navigate(['../stopps', event$.node.data.dispostopp_id], {relativeTo: this.route});
  }

  newTourDuration(tourDuration: number) {
    this.tourDuration$ = of(tourDuration);
  }

  openMergeZieleDialog(event: any) {
    let recipientsToMerge = [];
    let recipients;
    for (let i = 0; i < event.length; i++) {
      recipients = {
        showRecipientsFlag: true,
        name1: event[i].ziel_name.name1,
        name2: event[i].ziel_name.name2,
        name3: event[i].ziel_name.name3,
        strasse: event[i].ziel_name.geoposition.geoadresse.strasse,
        hausnr: event[i].ziel_name.geoposition.geoadresse.hausnr,
        plz: event[i].ziel_name.geoposition.geoadresse.plz,
        ort: event[i].ziel_name.geoposition.geoadresse.ort,
        landCode: event[i].ziel_name.geoposition.geoadresse.land,
        tour_id: event[i].tour_id,
        dispostopp_id: event[i].dispostopp_id,
        geoposition_id: event[i].ziel_name.geoposition.geoposition_id
      };
      recipientsToMerge.push(recipients);
    }

    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 400,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Ziele zusammenführen',
        data: {recipientsToMerge},
      },
      MergeRecipientsDialogComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
        if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
          this.hasAllRecipientsSameGeoposition(recipientsToMerge);
        }
      }
    );
  };

  hasAllRecipientsSameGeoposition(recipientsToMerge) {
    let recipientTempArray = [];

    for (let i = 0; i < recipientsToMerge.length; i++) {
      if (recipientsToMerge[i].geoposition_id === recipientsToMerge[i + 1]?.geoposition_id) {
        recipientTempArray.push(recipientsToMerge[i].geoposition_id);
      }
    }

    // Kein guter Still --> muss angepasst werden
    if (recipientTempArray.length + 1 == recipientsToMerge.length) {
      this.tourService.setZieleZusammenfuehren(recipientsToMerge);
    } else {
      this.alertService.error('Die Einträge haben unterschiedliche Geopositionen und können nicht zusammengeführt werden');
    }
  }

}
