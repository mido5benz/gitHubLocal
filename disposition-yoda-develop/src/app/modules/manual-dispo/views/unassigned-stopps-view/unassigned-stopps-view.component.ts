import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, throwError} from 'rxjs';
import {locatedText} from '@shared/aggrid-localization';
import {DispoStopp} from '@shared/models';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {StoppsFacade} from '@store/manual-dispo/stopps/facades/stopps.facade';
import {MoveUnassignedStoppsPopupComponent} from '@manual-dispo-components/move-unassigned-stopps-popup/move-unassigned-stopps-popup.component';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TourService} from '@app/core/services';
import {Store} from '@ngrx/store';
import {setUnassignedStopps} from '@store/manual-dispo/stopps/actions/stopps.actions';
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-unassigned-stopps-view',
  templateUrl: './unassigned-stopps-view.component.html',
  styleUrls: ['./unassigned-stopps-view.component.scss'],
})
export class UnassignedStoppsViewComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public unassignedStopCount$: Observable<number>;
  public errorCount$: Observable<number>;

  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions;
  public rowData: any;

  public currentRow: any;
  public localeText;

  public stopps;

  public tempStoppsData = [];

  public selectedStopps = [];
  public targetTourId = 0;

  constructor(
    private addressFacade: AddressFacade,
    private stoppsFacade: StoppsFacade,
    private tourListFacade: TourlistFacade,
    private dialogService: DialogService,
    private alertService: ToastrService,
    private router: Router,
    private tourService: TourService,
    private store: Store) {
    this.localeText = locatedText;

    this.gridOptions = {
      columnDefs: this.columnDefs,
      accentedSort: true
    };

    this.defaultColDef = {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      filterParams: {newRowsAction: 'keep'}
    };

    this.columnDefs = this.columnDefs = [
      {
        field: 'ziel_name.name1',
        headerName: 'Name 1',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ziel_name.name2',
        headerName: 'Name 2',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ziel_name.name3',
        headerName: 'Name 3',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ziel_name.geoposition.geoadresse.strasse',
        headerName: 'Straße',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ziel_name.geoposition.geoadresse.hausnr',
        headerName: 'Hausnr.',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ziel_name.geoposition.geoadresse.plz',
        headerName: 'PLZ',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ziel_name.geoposition.geoadresse.ort',
        headerName: 'Ort',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'sum.sendung_sum',
        headerName: 'Sendungen',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'sum.ist_col_sum',
        headerName: 'IST-COL',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'sum.soll_col_sum',
        headerName: 'SOLL-COL',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'sum.ist_pal_sum',
        headerName: 'IST-PAL',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'sum.soll_pal_sum',
        headerName: 'SOLL-PAL',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'sum.amb_col_sum',
        headerName: 'AMB-C',
        filter: 'agTextColumnFilter',
        //valueGetter: (value) => value.data?.sum?.amb_sum > 0 ? 'Ja' : 'Nein',
      },
      {
        field: 'sum.amb_pal_sum',
        headerName: 'AMB-P',
        filter: 'agTextColumnFilter',
        //valueGetter: (value) => value.data?.sum?.amb_sum > 0 ? 'Ja' : 'Nein',
      },
      {
        headerName: 'Dienste',
        filter: 'agTextColumnFilter',
        valueGetter: (value) => this.getDienste(value.data)
      },
      {
        field: 'sum.gg_punkte_sum',
        headerName: 'GG-P.',
        headerTooltip: 'Gefahrgutpunkte',
        filter: 'agTextColumnFilter',
        valueFormatter: (params) => params.data?.sum?.gg_punkte_sum.toFixed(2)
      },
    ];
  }

  ngOnInit(): void {
    this.unassignedStopCount$ = this.stoppsFacade.unassignedStoppsCount$;
    this.errorCount$ = this.addressFacade.unassignedAddressesCount$;
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const defaultSortModel = [
      {
        colId: 'soll_stopp',
        sort: 'asc',
      }
    ];
    params.api.setSortModel(defaultSortModel);

    this.stoppsFacade.unassignedStopps$.subscribe((stopps: DispoStopp[]) => {
      if (stopps.length >= 0) {
        this.tempStoppsData = stopps;
        console.log(stopps)
        this.gridApi.setRowData(stopps);
      }
    });

    this.subscription.add(this.tourListFacade.loading$.subscribe((loading: boolean) => {
      if (loading) {
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    }));
  }

  // Aktuell nur Standarddienste
  public getDienste(value) {
    let abend = value.sum.abend_sum > 0 ? 'Abe' : '';
    let ambient = value.sum.amb_sum > 0 ? 'Amb' : '';
    let kl7 = value.sum.kl7_sum > 0 ? 'KL7' : '';
    let plus8 = value.sum.p8_sum > 0 ? '+8' : '';
    let plus9 = value.sum.p9_sum > 0 ? '+9' : '';
    let plus10 = value.sum.p10_sum > 0 ? '+10' : '';
    let plus12 = value.sum.p12_sum > 0 ? '+12' : '';
    let thermoMed = value.sum.tm_sum > 0 ? 'TM' : '';

    return `${abend} ${ambient} ${kl7} ${plus8} ${plus9} ${plus10} ${plus12} ${thermoMed}`

  }

  public openMoveStoppDialog(): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 400,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Umdisponieren',
        data: {stopps: this.selectedStopps, sourceTourId: 0}
      },
      MoveUnassignedStoppsPopupComponent);

    dialogRef.afterClosed.subscribe((closeResult) => {
      if (closeResult.result !== 1) {
        this.gridApi.showLoadingOverlay();
        this.tourService.moveStoppsToTour(closeResult.data.tourId, closeResult.data.stopps)
          .pipe(
            catchError(err => {
              this.gridApi.hideOverlay();
              this.alertService.error(err.error[0].error.message, 'Umdisponierung fehlgeschlagen')
              return throwError(err);
            })
          ).subscribe(moveStopps => {
          if (moveStopps.status === 200) {
            this.alertService.success('Stopps werden Umdisponiert!');
            this.tourService.fetchTour9999().subscribe((tourList9999) => {

              tourList9999.dispostopps.map((stopps: DispoStopp) => {
                this.tempStoppsData.find((tempStopps) => {
                  if (tempStopps.dispostopp_id === stopps.dispostopp_id) {
                    stopps.sum = tempStopps.sum;
                  }
                });
              });

              this.store.dispatch(setUnassignedStopps({unassignedStopps: tourList9999.dispostopps}));
            });
          }
        });
        this.selectedStopps = [];
      }
    });
  }

  onRowSelectionChanged(): void {
    this.selectedStopps = this.gridApi.getSelectedRows().map((stopp) => this.selectedStopps = stopp);
  }

  reloadData(): void {
    this.tourListFacade.dispatch(fetchTourListRequest());
  }

  onRowDoubleClicked($event: any) {
    this.router.navigate(['manual-dispo/feindisposition/sendungsebene/tourId', $event.data.tour_id, 'dispostoppId', $event.data.dispostopp_id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
