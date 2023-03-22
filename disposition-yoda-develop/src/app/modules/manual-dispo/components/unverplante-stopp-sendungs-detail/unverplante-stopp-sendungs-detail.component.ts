import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConsignmentFacade} from '@store/manual-dispo/consignments/facades/consignment.facade';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {locatedText} from '@shared/aggrid-localization';
import {ConsignmentService} from '@app/core/services/consignments/consignment.service';
import {Consignment} from '@shared/models';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {MoveDeliveryPopupComponent} from '@modules/manual-dispo/components';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {moveConsignmentsRequest} from '@store/manual-dispo/consignments/actions/move-consignment.actions';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-unverplante-stopp-sendungs-detail',
  templateUrl: './unverplante-stopp-sendungs-detail.component.html',
  styleUrls: ['./unverplante-stopp-sendungs-detail.component.scss']
})
export class UnverplanteStoppSendungsDetailComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  public gridApi;
  public gridColumnApi;
  public gridOptions;

  public columnDefs;
  public defaultColDef;
  public localText;

  tour_id: number;
  dispostopp_id: number;
  tournr: string;
  soll_stopp: number;

  public sendungsDetail;
  public selectedDeliveries = [];
  public overlayLoadingTemplate;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private consignment: ConsignmentService,
              private dialogService: DialogService,
              private consignmentFacade: ConsignmentFacade) {
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Sendungen werden geladen...</span>';
    this.gridOptions = {
      columnDefs: this.columnDefs,
      accentedSort: true
    }

    this.defaultColDef = {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    };

    this.localText = locatedText;

    this.columnDefs = [
      {
        field: 'auftragart',
        headerName: 'A',
      },
      {
        field: 'versender_name',
        headerName: 'Versender',
      },
      {
        field: 'versender_bcvsnr',
        headerName: 'BCV',
        headerTooltip: 'Barcodeversender'
      },
      {
        field: 'name1',
        headerName: 'Name 1',
      },
      {
        field: 'name2',
        headerName: 'Name 2',
      },
      {
        field: 'name3',
        headerName: 'Name 3',
      },
      {
        field: 'ist_dispo_colli',
        headerName: 'IST-COL',
      },
      {
        field: 'soll_dispo_colli',
        headerName: 'SOLL-COL',
      },
      {
        field: 'ist_dispo_paletten',
        headerName: 'IST-PAL',
      },
      {
        field: 'soll_dispo_paletten',
        headerName: 'SOLL-PAL',
      },
      {
        field: 'ist_gewicht',
        headerName: 'IST-KG',
      },
      {
        field: 'soll_gewicht',
        headerName: 'SOLL-KG',
      },
      {
        field: 'amb_colli',
        headerName: 'AMB-COL',
      },
      {
        field: 'amb_paletten',
        headerName: 'AMB-PAL',
      },
      {
        field: 'gefahrgut',
        headerName: 'GG-KL.',
        headerTooltip: 'Gefahrgutklasse'
      },
      {
        field: 'gg_punkte',
        headerName: 'GG-P.',
        headerTooltip: 'Gefahrgutpunkte',
        valueFormatter: (params) => params.data?.gg_punkte.toFixed(2)
      },
      {
        field: 'dienste',
        headerName: 'Dienste',
      },
      {
        field: 'sendungsNr',
        headerName: 'SDGNR',
      },
    ];
  }

  ngOnInit(): void {
    this.tour_id = this.route.snapshot.params.tour_id;
    this.dispostopp_id = this.route.snapshot.params.dispostopp_id;

    this.subscription.add(this.consignment.fetchConsignments(this.tour_id, this.dispostopp_id).subscribe((sendungsDetail) => {
      this.sendungsDetail = sendungsDetail;
      setTimeout(() => {
        this.gridApi.setRowData(this.sendungsDetail);
      }, 2000);
    }));
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onRowDoubleClicked($event): void {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        tour_id: this.tour_id,
        dispostopp_id: this.dispostopp_id,
        tournr: $event.data.tournr,
        empfaenger: this.getVersenderName(this.sendungsDetail),
        sendungsId: $event.data.sendung_id,
        unverplanteStopp: true
      }
    };
    this.router.navigate(['sendungsdetail'], navigationExtras);
  }

  public getVersenderName(sendungsDetail: Consignment[]): string {
    let name1, name2, name3;
    sendungsDetail.forEach((sendung) => {
      name1 = sendung.name1 === null ? '' : sendung.name1;
      name2 = sendung.name2 === null ? '' : sendung.name2;
      name3 = sendung.name3 === null ? '' : sendung.name3;
    });
    return `${name1}  ${name2}  ${name3}`;
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
          sourceDispoStopp: this.dispostopp_id,
          sendungen: this.selectedDeliveries
        }
      },
      MoveDeliveryPopupComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {

      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
        this.gridApi.showLoadingOverlay();
        this.consignmentFacade.dispatch(moveConsignmentsRequest({
          sourceTourId: this.dispostopp_id,
          sourceStoppId: dialogCloseEvent.data.sourceStopp,
          consignments: dialogCloseEvent.data.sendungen,
          targetTourId: dialogCloseEvent.data.targetTour,
        }));
        setTimeout(() => {
          this.subscription.add(this.consignment.fetchConsignments(this.tour_id, this.dispostopp_id).subscribe((sendungen) => {
            this.gridApi.setRowData(sendungen);
            this.gridApi.hideOverlay();
          }));
        }, 3000);
        this.selectedDeliveries = [];
      }
    });
  }

  rowSelected(event: any) {
    this.selectedDeliveries = this.gridApi.getSelectedRows();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
