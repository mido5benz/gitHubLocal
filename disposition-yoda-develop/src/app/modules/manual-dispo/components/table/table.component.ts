import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {setSelectedTourId} from '@store/manual-dispo/tour/actions/selected-tour.actions';
import {
  closeTourDetails,
  openTourDetails,
  toggleTourTable
} from '@app/store/ui/actions/manual-dispo/manual-dispo-ui.actions';
import {DispoStopp, Tour} from '@models/index';
import {CellValueChangedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent,} from 'ag-grid-community';
import {TourNumberPipe} from '@shared/pipes';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {TourService} from '@app/core/services';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {TourNumberCellComponent} from '@shared/component';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {ManualDispoUiFacade} from '@store/ui/facades/manual-dispo/manual-dispo-ui.facade';
import {isAmbientTour} from '@shared/utils/tour.utils';
import {AG_GRID_LOCALE_DE} from '@manual-dispo-components/stopp-list/locale.de';
import {Subscription} from 'rxjs';
import {TableInfoButtonCellRendererComponent} from '@manual-dispo-components/table/table-info-button-cell-renderer/table-info-button-cell-renderer.component';

@Component({
  selector: 'app-manual-dispo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {

  @Output() rowSelect = new EventEmitter();
  @Output() rowChange = new EventEmitter();

  @Input() selectedTour: Tour;

  public rowData: Tour[];
  public columnDefs: ColDef[];
  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public defaultColDef: ColDef;
  public frameworkComponents: any;
  public isCollapsed: boolean;
  public overlayLoadingTemplate;
  public rowClassRules;
  public locale = AG_GRID_LOCALE_DE;
  private timer;
  private preventSimpleClick: boolean;

  private subscription: Subscription = new Subscription();

  constructor(
    private uiFacade: ManualDispoUiFacade,
    private selectedTourFacade: SelectedTourFacade,
    private router: Router,
    private route: ActivatedRoute,
    private transformTourNumber: TourNumberPipe,
    private umdispoFacade: RescheduleFacade,
    private tourService: TourService,
    private tourListFacade: TourlistFacade
  ) {

    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Die Liste der Touren wird geladen...</span>';
    this.tourListFacade.fetchTourList();

    this.defaultColDef = {
      resizable: true,
      // sortable: true,
      flex: 1,
    };
    this.columnDefs = [
      {
        field: 'tour',
        headerName: 'Tour',
        sortable: true,
        maxWidth: 80,
        valueGetter: (params) => this.sliceTournr(params),
      },
      {
        field: 'tour',
        headerName: 'Kennzeichen',
        width: 50,
        minWidth: 50,
        cellRendererFramework: TourNumberCellComponent
      },
      {
        field: 'tour.name_1',
        headerName: 'FF',
        headerTooltip: 'Frachtführer',
        width: 100,
        minWidth: 120,
        sortable: true,
        valueGetter: (params) => this.tourService.getFrachfuehrer(params.data),
      },
      {
        field: 'amb_col_sum',
        headerName: 'AMB-C',
        headerTooltip: 'Ambient Colli',
        sortable: true,
        maxWidth: 80,
      },
      {
        field: 'amb_pal_sum',
        headerName: 'AMB-P',
        headerTooltip: 'Ambient Paletten',
        sortable: true,
        maxWidth: 80,
      },

      {
        headerName: 'F-Details',
        filter: 'agTextColumnFilter',
        maxWidth: 100,
        cellRenderer: 'tableInfoButtonCellRenderer',
      },
      {
        field: 'p8Sum',
        sortable: true,
        headerName: '+8',
        maxWidth: 60,
      },
      {
        field: 'p9Sum',
        sortable: true,
        headerName: '+9',
        maxWidth: 60,
      },
      {
        field: 'p10Sum',
        sortable: true,
        headerName: '+10',
        maxWidth: 65,
      },
      {
        field: 'p12Sum',
        sortable: true,
        headerName: '+12',
        maxWidth: 65,
      },
      {
        field: 'abendSum',
        sortable: true,
        headerName: 'Abend',
        maxWidth: 80,
      },
      {
        field: 'tmSum',
        headerName: 'TM',
        sortable: true,
        headerTooltip: 'ThermoMed',
        maxWidth: 60,
      },
      {
        field: 'kl7Sum',
        sortable: true,
        headerName: 'KL7',
        maxWidth: 60,
      },
      {
        field: 'ggPunkteSum',
        headerName: 'GG-P.',
        headerTooltip: 'Gefahrgutpunkte',
        sortable: true,
        maxWidth: 90,
        valueFormatter: params => params.data?.ggPunkteSum.toFixed(2)
      },
      {
        field: 'sendungSum',
        headerName: 'SDG',
        sortable: true,
        headerTooltip: 'Sendung',
        maxWidth: 70,
      },
      {
        field: 'istColSum',
        sortable: true,
        headerName: 'IST-COL',
        maxWidth: 90,
      },
      {
        field: 'sollColSum',
        sortable: true,
        headerName: 'SOLL-COL',
        maxWidth: 100,
      },
      {
        field: 'istPalSum',
        sortable: true,
        headerName: 'IST-PAL',
        maxWidth: 90,
      },
      {
        field: 'sollPalSum',
        sortable: true,
        headerName: 'SOLL-PAL',
        maxWidth: 100,
      },
      {
        field: 'istGewichtSum',
        headerName: 'IST-KG',
        sortable: true,
        valueFormatter: (params) => (Math.round(params.value * 100) / 100).toFixed(2)
      },
      {
        field: 'sollGewichtSum',
        headerName: 'SOLL-KG',
        sortable: true,
        valueFormatter: (params) => (Math.round(params.value * 100) / 100).toFixed(2)
      },
      {
        field: 'planTourdauer',
        headerName: 'Dauer',
        sortable: true,
        valueGetter: (params) => this.timeConvert(params.data.planTourdauer)

      }
    ];

    this.frameworkComponents = {
      tableInfoButtonCellRenderer: TableInfoButtonCellRendererComponent
    };

    this.rowClassRules = {
      'tour-error-stopps': (params) => params.data.dispostopps.some((stopp: DispoStopp) => stopp.soll_stopp === null),
    };
  }

  public getRowNodeId = (data: Tour) => data.tour.tour_id;

  ngOnInit(): void {
    this.uiFacade.tableCollapsed$.subscribe((isCollapsed: boolean) => (this.isCollapsed = isCollapsed));
  }

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.subscription.add(this.tourListFacade.filteredTours$.subscribe((tours: Tour[]) => {

      if (!tours || tours.length === 0) {
        this.gridApi.setRowData([]);
      } else if (tours.length > 0) {
        tours = tours.slice().sort((a: Tour, b: Tour) =>
          a.tour.tournr < b.tour.tournr ? -1 : 1
        );
        this.gridApi.setRowData(tours);
      }
    }));
  }

  public onCellValueChanged(params: CellValueChangedEvent): any {
    this.rowChange.emit(params.data);
  }

  sliceTournr(params) {
    let tournr = params.data.tour.tournr;
    return tournr ? tournr.slice(0, 1) + '-' + tournr.slice(1) : '';
  }

  public onCellClicked(event): void {
    this.timer = 0;
    this.preventSimpleClick = false;
    const delay = 1000;

    this.timer = setTimeout(() => {
      if (!this.preventSimpleClick) {
        const selectedTour: Tour = this.gridApi.getSelectedRows().pop() as Tour;

        if ((selectedTour?.tour?.tournr !== '9997')) {
          this.selectedTourFacade.dispatch(setSelectedTourId({id: selectedTour?.tour?.tour_id}));
          this.uiFacade.dispatch(openTourDetails());
          this.rowSelect.emit(selectedTour);
        }
      }
    }, delay);
  }

  tempColPal(data) {
    let col: string = data.colSum;
    let sdg: string = data.sendungSum;

    console.log(sdg + " / " + col)

    return sdg + " / " + col
  }

  onCellDoubleClick(event): void {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);

    const tour = event.data as Tour;
    this.router.navigate(['manual-dispo', 'tour', tour.tour.tour_id]);

    // if(event.data.tour.tournr === '9999') {
    //   this.uiFacade.dispatch(closeTourDetails());
    // }
  }

  collapse(): void {
    this.uiFacade.dispatch(toggleTourTable());
  }

  timeConvert(seconds: number) {
    let secondsToHHmm = new Date(seconds * 1000).toISOString().substr(11, 5);
    return secondsToHHmm + ' h';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
