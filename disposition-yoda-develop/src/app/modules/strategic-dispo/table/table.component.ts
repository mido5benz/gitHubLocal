import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {toggleTourTable} from '@app/store/ui/actions/strategic-dispo/strategic-dispo.ui.actions';
import {getTourTableState} from '@app/store/ui/selectors/strategic-dispo/strategic-dispo.selectors';
import {Fahrzeugtypen} from '@models/index';
import {Store} from '@ngrx/store';
import {CellValueChangedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent, RowNode, SelectionChangedEvent} from 'ag-grid-community';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {forkJoin, Subscription} from 'rxjs';
import {TourFilterComponent} from '@shared/component';
import {LayerFilter, TourFilter} from '@shared/component/tour-filter/tour-filter.model';
import {Raster, RasterDetails} from '@models/strategic-dispo/raster.model';
import {StrategicTour} from '@models/strategic-dispo/strategic-tour.model';
import {StammdatenService} from '@app/core/services';
import {LayerComponent} from '../layer/layer.component';
import {LayerService} from '@app/core/services/layer/layer.service';
import {StrategicTourService} from '@app/core/services/strategic-tour/strategic-tour.service';
import {ButtonCellComponent} from './button-cell/button-cell.component';
import {ActiveLayerFacade} from '@app/store/strategic-dispo/facades/activate-layer.facade';

@Component({
  selector: 'app-strategic-dispo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  isCollapsed = false;
  modalRef: BsModalRef;

  @Output() rowSelect = new EventEmitter();
  @Output() rowChange = new EventEmitter();

  public rowData: StrategicTour[];
  public columnDefs: ColDef[];
  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public defaultColDef: ColDef;
  public frameworkComponents: any;
  public rowSelection = 'single';
  public suppressCellSelection = true;
  public overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Lade Touren...</span>';
  public overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">Keine Touren gefunden</span>';
  public getRowNodeId = (data: StrategicTour) => data.tour_id;

  constructor(
    private activeLayerFacade: ActiveLayerFacade,
    private store: Store,
    private stammdatenService: StammdatenService,
    private tourService: StrategicTourService,
    private layerService: LayerService
  ) {

    this.tourService.selectTourControl.subscribe((tourid) => {
      if (this.gridApi) {
        this.gridApi.forEachNode((node: RowNode) => {
          if (node.id === tourid) {
            node.setSelected(true);
          }
        });
      }
    });

    this.frameworkComponents = {tourFilter: TourFilterComponent, layerFilter: LayerComponent};
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      sortable: true,
    };
    this.columnDefs = [
      {
        field: 'tournr',
        headerName: 'Tour',
        cellClass: 'ag-row-status',
        cellClassRules: {
          'ag-row-status-green': (params) =>
            params.data.raster_total && params.data.raster_total.length > 0,
        },
        valueGetter: (params) => this.convertTourNr(params.data.tournr),
      },
      {
        field: 'name_1',
        headerName: 'Frachtführer',
        flex: 3,
        valueGetter: (params) =>
          params.data.name_2
            ? `${params.data.name_1} - ${params.data.name_2}`
            : params.data.name_1,
        tooltipValueGetter: (params) =>
          params.data.name_2
            ? `${params.data.name_1} - ${params.data.name_2}`
            : params.data.name_1,
      },
      {
        field: 'fahrzeugart_id',
        headerName: 'FZ-Art',
        filter: 'layerFilter',
        flex: 2,
        valueFormatter: (params) =>
          this.convertFzArt(params.data.fahrzeugart_id),
        tooltipValueGetter: (params) =>
          this.convertFzArt(params.data.fahrzeugart_id),
      },
      {
        field: 'plus8',
        headerName: '+8',
        valueGetter: (params) => this.sum(params.data.raster_total, 'plus8'),
      },
      {
        field: 'plus9',
        headerName: '+9',
        valueGetter: (params) => this.sum(params.data.raster_total, 'plus9'),
      },
      {
        field: 'frueh',
        headerName: '+10',
        valueGetter: (params) => this.sum(params.data.raster_total, 'frueh'),
      },
      {
        field: 'vormittag',
        headerName: '+12',
        valueGetter: (params) => this.sum(params.data.raster_total, 'vormittag'),
      },
      {
        field: 'abend',
        headerName: 'Abend',
        valueGetter: (params) => this.sum(params.data.raster_total, 'abend'),
      },
      {
        field: 'amb',
        headerName: 'Ambient',
        valueGetter: (params) => this.sum(params.data.raster_total, 'amb'),
      },
      {
        field: 'kuehl_raum',
        headerName: 'ThermoMed',
        valueGetter: (params) => this.sum(params.data.raster_total, 'kuehl_raum'),
      },
      {
        field: 'teilmenge_radioaktiv',
        headerName: 'KL7',
        valueGetter: (params) => this.sum(params.data.raster_total, 'teilmenge_radioaktiv'),
      },
      {
        field: 'stops',
        headerName: 'Stopps',
        valueGetter: (params) => this.sum(params.data.raster_total, 'anzahl_stopps'),
      },
      {
        field: 'shipments',
        headerName: 'Sendungen',
        valueGetter: (params) => this.sum(params.data.raster_total, 'gesamtmenge'),
      },
      {
        field: 'colli',
        headerName: 'Colli',
        valueGetter: (params) => this.sum(params.data.raster_total, 'anzahl_col'),
        tooltipValueGetter: (params) =>
          'Ambient: ' + this.sum(params.data.raster_total, 'anzahl_col_ambient') +
          ' | ThermoMed: ' + this.sum(params.data.raster_total, 'anzahl_col_blau'),
      },
      {
        field: 'palettes',
        headerName: 'Pal',
        valueGetter: (params) => this.sum(params.data.raster_total, 'anzahl_pal'),
        tooltipValueGetter: (params) =>
          'Ambient: ' + this.sum(params.data.raster_total, 'anzahl_pal_ambient') +
          ' | ThermoMed: ' + this.sum(params.data.raster_total, 'anzahl_pal_blau'),
      },
      {
        field: 'kg',
        headerName: 'kg',
        valueGetter: (params) => this.sum(params.data.raster_total, 'gesamtgewicht'),
      },
      {
        field: 'tournr',
        headerName: '',
        cellRendererFramework: ButtonCellComponent
      },
    ];
  }

  ngOnInit(): void {
    forkJoin([
      this.stammdatenService.getFahrzeugtypen(),
      this.tourService.getTours(),
    ]).subscribe(([fahrzeugtypen, tours]) => {
      this.rowData = tours;
      this.rowData.sort((a: StrategicTour, b: StrategicTour) =>
        a.tournr < b.tournr ? -1 : 1
      );
    });

    this.layerService.search.subscribe((searchTerm) => this.filterRows(searchTerm));
    this.store
      .select(getTourTableState)
      .subscribe((isCollapsed: boolean) => (this.isCollapsed = isCollapsed));
  }

  public onCellValueChanged(params: CellValueChangedEvent): any {
    this.rowChange.emit(params.data);
  }

  public onSelectionChanged(params: SelectionChangedEvent): any {
    const selectedRow = this.gridApi.getSelectedRows().pop();
    this.rowSelect.emit(selectedRow);
  }

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.subscription.add(this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
      if (this.gridApi) {
        this.gridApi.forEachNode((node: RowNode) => {
          node.setSelected(false);
        });
      }

      if (layer === 'lkw') {
        this.filterFzgart({
          column: 'fahrzeugart_id', filters: [
            {type: 'startsWith', filter: '2341'},
            {type: 'startsWith', filter: '2342'},
            {type: 'startsWith', filter: '2343'},
            {type: 'startsWith', filter: '2344'}
          ]
        });
      }
      if (layer === 'sattel') {
        this.filterFzgart({
          column: 'fahrzeugart_id', filters: [
            {type: 'startsWith', filter: '2345'}
          ]
        });
      }
      if (layer === 'express' || layer === 'regel') {
        this.filterFzgart({
          column: 'fahrzeugart_id', filters: [
            {type: 'startsWith', filter: '2336'},
            {type: 'startsWith', filter: '2337'},
            {type: 'startsWith', filter: '2338'},
            {type: 'startsWith', filter: '2339'},
            {type: 'startsWith', filter: '2340'},
            {type: 'startsWith', filter: '2341'},
            {type: 'startsWith', filter: '2342'},
            {type: 'startsWith', filter: '2343'},
            {type: 'startsWith', filter: '2344'},
          ]
        });
      }
      if (layer === 'samstag') {
        this.filterFzgart({
          column: 'fahrzeugart_id', filters: [
            {type: 'startsWith', filter: '2336'},
            {type: 'startsWith', filter: '2337'},
            {type: 'startsWith', filter: '2338'},
            {type: 'startsWith', filter: '2339'},
            {type: 'startsWith', filter: '2340'},
          ]
        });
      }
    }));
  }

  public updateRowData(): void {
    this.gridApi.redrawRows();
  }

  public filterRows(filter: string): void {
    if (!this.gridApi) {
      return;
    }
    this.gridApi.setQuickFilter(filter);
  }

  public filterColumn(filter: TourFilter): void {
    // apply filter to column
    const filterInstance = this.gridApi.getFilterInstance(filter.column);
    filterInstance.setModel(filter);
    this.gridApi.onFilterChanged();
  }

  public filterFzgart(layerFilter: LayerFilter): void {
    if (!this.gridApi) {
      return;
    }
    const filterInstance = this.gridApi.getFilterInstance(layerFilter.column);
    filterInstance.setModel(layerFilter);
    this.gridApi.onFilterChanged();
  }

  private sum(rasters: Raster[], field: string): string {
    let sum = 0;

    if (rasters) {
      rasters.forEach((r: Raster) => {
        let zwischenSum = 0;
        let length = 0;
        Object.values(r.details).forEach((details: RasterDetails) => {
          zwischenSum += details[field];
          length++;
        });
        sum += zwischenSum / length;
      });
    }

    return Math.ceil(sum).toString();
  }

  private convertTourNr(tourNr: string): string {
    let convertedTourNr = tourNr;

    if (convertedTourNr) {
      convertedTourNr =
        convertedTourNr.slice(0, 1) + '-' + convertedTourNr.slice(1);
    }

    return convertedTourNr;
  }

  private convertFzArt(fahrzeugArt: number): string {
    let convertedTourNr = '';

    this.stammdatenService
      .getFahrzeugtypen()
      .subscribe((fzTypen: Fahrzeugtypen[]) => {
        const fahrzeugTyp = fzTypen.find(
          (typ: Fahrzeugtypen) => typ.fahrzeugart_id === fahrzeugArt
        );
        convertedTourNr = fahrzeugTyp.fa_bezeichnung;
      });

    return convertedTourNr;
  }

  collapse(): void {
    this.store.dispatch(toggleTourTable());
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
}
