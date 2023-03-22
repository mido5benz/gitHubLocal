import { StrategicDispoComponent } from './strategic-dispo.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppBreadcrumbModule } from '@coreui/angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AgGridModule } from 'ag-grid-angular';

import { StrategicDispoRoutingModule } from './strategic-dispo-routing.module';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../../shared/shared.module';
import { TourFilterComponent } from '@app/shared/component/tour-filter/tour-filter.component';
import { TourControlComponent } from './map/tour-control/tour-control.component';
import { LayerComponent } from './layer/layer.component';

// Planungen
import { ActivateComponent } from './planungen/activate/activate.component';
import { DeleteComponent } from './planungen/delete/delete.component';
import { SaveComponent } from './planungen/save/save.component';
import { LoadComponent } from './planungen/load/load.component';
import { ExcelComponent } from './planungen/excel/excel.component';
import { NeuComponent } from './planungen/neu/neu.component';
import { ActiveComponent } from './planungen/active/active.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActivateDispoModalComponent } from './planungen/activate/components/activate-dispo-modal/activate-dispo-modal.component';
import { PalletControlComponent } from './map/pallet-control/pallet-control.component';
import { ButtonCellComponent } from './table/button-cell/button-cell.component';
import { RecipientModalComponent } from './table/button-cell/recipient-modal/recipient-modal.component';
import { OverviewControlComponent } from './map/overview-control/overview-control.component';
import { TooltipComponent } from './map/tooltip/tooltip.component';

@NgModule({
  entryComponents: [
    OverviewControlComponent,
    TourControlComponent,
    PalletControlComponent,
    ActivateDispoModalComponent,
    RecipientModalComponent,
    TooltipComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StrategicDispoRoutingModule,
    ButtonsModule,
    BsDropdownModule,
    AppBreadcrumbModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    AgGridModule.withComponents([TourFilterComponent, LayerComponent, ButtonCellComponent]),
    NgxSpinnerModule
  ],
  declarations: [
    StrategicDispoComponent,
    OverviewControlComponent,
    TourControlComponent,
    PalletControlComponent,
    LayerComponent,
    MapComponent,
    TableComponent,
    ActivateComponent,
    LoadComponent,
    SaveComponent,
    DeleteComponent,
    ExcelComponent,
    NeuComponent,
    ActiveComponent,
    ActivateDispoModalComponent,
    ButtonCellComponent,
    RecipientModalComponent,
    TooltipComponent
  ],
  providers: [ActiveComponent],
})
export class StrategicDispoModule { }
