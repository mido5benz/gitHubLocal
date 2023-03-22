import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DialogModalType} from '@app/modules/dialog/models/dialog-config.model';
import {TourService} from '@app/core/services';
import {Consignment, DispoStopp, Tour} from '@models/index';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {MoveDeliveryPopupComponent, SuppliesListComponent} from '@modules/manual-dispo/components';
import {NgxSpinnerService} from 'ngx-spinner';
import {ConsignmentFacade} from '@store/manual-dispo/consignments/facades/consignment.facade';
import {fetchConsignmentsRequest} from '@store/manual-dispo/consignments/actions/fetch-consignments.actions';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {moveConsignmentsRequest} from '@store/manual-dispo/consignments/actions/move-consignment.actions';
import {fetchAvailableToursRequest} from '@store/manual-dispo/tour/actions/fetch-available-tours.actions';

@Component({
  selector: 'app-dispostopp-detail-view',
  templateUrl: './dispostopp-detail-view.component.html',
  styleUrls: ['./dispostopp-detail-view.component.scss']
})
export class DispostoppDetailViewComponent implements OnInit {

  @ViewChild(SuppliesListComponent) suppliesListComponent: SuppliesListComponent;

  public isLoading: boolean;
  public tourDetails: Tour;

  public dispoStoppId;
  public tourId;
  public selectedDeliveries = [];
  public dispoStopp: DispoStopp;

  public sendungen$: Observable<Consignment[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private spinnerService: NgxSpinnerService,
    private tourService: TourService,
    private consignmentFacade: ConsignmentFacade,
    private tourListFacade: TourlistFacade
  ) {

    this.tourListFacade.dispatch(fetchAvailableToursRequest());

    this.route.parent.params.pipe(
      tap((params) => this.dispoStoppId = this.route.snapshot.paramMap.get('stoppid')),
      map((params) => {
        this.tourId = params.tourId;
        this.tourService.fetchTourById(this.tourId).subscribe((tourDetails: any) => {
          this.tourDetails = tourDetails;
          this.dispoStopp = tourDetails.dispostopps.find((stopp) => +stopp.dispostopp_id === +this.dispoStoppId);
        });

        return params.tourId;
      }),
      map((tourId: string) => this.consignmentFacade.dispatch(fetchConsignmentsRequest({
        tourId: +tourId,
        stoppId: +this.dispoStoppId
      })))
    ).subscribe();
  }

  ngOnInit(): void {
    this.sendungen$ = this.consignmentFacade.all$;
  }

  openMoveDeliveryDialog(): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 400,
        closeOnOutsideClicked: true,
        showTitle: true,
        title: 'Sendung umdisponieren',
        data: {
          sourceDispoStopp: this.dispoStoppId,
          sendungen: this.selectedDeliveries
        }
      },
      MoveDeliveryPopupComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {

      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
        this.consignmentFacade.dispatch(moveConsignmentsRequest({
          sourceTourId: this.tourId,
          sourceStoppId: dialogCloseEvent.data.sourceStopp,
          consignments: dialogCloseEvent.data.sendungen,
          targetTourId: dialogCloseEvent.data.targetTour,
        }));

        this.suppliesListComponent.reset();
        this.reset();
      }
    });
  }

  onRowSelectionChanged($event): void {
    this.selectedDeliveries = $event;
  }

  reset(): void {
    this.selectedDeliveries = [];
  }
}
