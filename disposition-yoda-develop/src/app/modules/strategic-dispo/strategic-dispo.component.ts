import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { getTourTableState } from '@app/store/ui/selectors/strategic-dispo/strategic-dispo.selectors';
import { Store } from '@ngrx/store';
import { StrategicTour } from '@models/strategic-dispo/strategic-tour.model';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
// Planungen
import { ActivateComponent } from './planungen/activate/activate.component';
import { ActiveComponent } from './planungen/active/active.component';
import { DeleteComponent } from './planungen/delete/delete.component';
import { ExcelComponent } from './planungen/excel/excel.component';
import { LoadComponent } from './planungen/load/load.component';
import { NeuComponent } from './planungen/neu/neu.component';
import { SaveComponent } from './planungen/save/save.component';
import { TableComponent } from './table/table.component';
import { StrategicTourService } from '@app/core/services/strategic-tour/strategic-tour.service';
import { LayerService } from '@app/core/services';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: 'strategic-dispo.component.html',
  styleUrls: ['./strategic-dispo.component.scss'],
})
export class StrategicDispoComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @ViewChild('table', { static: true }) table: TableComponent;
  @ViewChild('map', { static: true }) map: MapComponent;

  // Planungen
  @ViewChild('activate', { static: true }) activate: ActivateComponent;
  @ViewChild('delete', { static: true }) delete: DeleteComponent;
  @ViewChild('save', { static: true }) save: SaveComponent;
  @ViewChild('load', { static: true }) load: LoadComponent;
  @ViewChild('neu', { static: true }) neu: NeuComponent;
  @ViewChild('excel', { static: true }) excel: ExcelComponent;
  @ViewChild('active', { static: true }) active: ActiveComponent;

  // LayerControl
  @ViewChild('layer', { static: true }) layer: LayerComponent;

  tableCollapsed = false;
  public mapHeight = 'h-70';
  public tableHeight = 'h-30';

  constructor(
    private store: Store,
    private tourService: StrategicTourService,
    private layerService: LayerService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store.select(getTourTableState).subscribe((tableCollapsed: boolean) => {
        if (tableCollapsed === false) {
          this.mapHeight = 'h-70';
          this.tableHeight = 'h-30';
        } else {
          this.mapHeight = 'h-100';
          this.tableHeight = 'h-0';
        }
        this.tableCollapsed = tableCollapsed;
      });

    this.subscription.add(this.load.dataLoaded.subscribe(() => {
      this.updateTour();
    }));

    this.subscription.add(this.neu.dataLoaded.subscribe(() => {
      this.updateTour();
    }));
  }

  public onSelect(row: StrategicTour): void {
    this.tourService.setSelectedTour(row);
    this.map.onPopup();
  }

  public updateTour(): void {
    this.table.updateRowData();
    this.map.drawGridRaster();
    this.map.initTourControl();
    this.map.initPalletControl();
    this.layerService.getDeselectStatus().subscribe((result: boolean) => {
      if (result === true) {
        if (this.table.gridApi) {
          this.table.gridApi.deselectAll();
          this.layerService.resetDeselectStatus();
        }
      }
    });
  }

  public onFilter(filter): void {
    this.table.filterColumn(filter);
  }

  setTableHeight(value: string): void {
    this.tableHeight = value;
  }

  setMapHeight(value: string): void {
    this.mapHeight = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cd.detach();
  }
}
