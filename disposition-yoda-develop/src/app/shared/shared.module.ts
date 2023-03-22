import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {
  FilterControlComponent,
  NavigationItemComponent,
  SelectionCountButtonComponent,
  TourFilterComponent,
  TourInfoComponent,
  TourNumberCellComponent,
  UmdispoInfoComponent
} from '@shared/component';
import {BsDropdownModule, CollapseModule} from 'ngx-bootstrap';

import * as fromComponents from './component';
import * as fromPipes from './pipes';
import * as fromDirectives from './directives';
import {SelectedListEmergencyButtonComponent} from './component/emergency/selected-list-emergency-button/selected-list-emergency-button.component';
import { NavigationDeliveryItemComponent } from './component/navigation/navigation-delivery-item/navigation-delivery-item.component';
import { UpdateToursComponent } from './component/update-tours/update-tours.component';
import { SpontaneousTakeoverModalComponent } from './component/spontaneous-takeover/spontaneous-takeover-modal/spontaneous-takeover-modal.component';
import { TakeoverAddressModalComponent } from './component/spontaneous-takeover/takeover-address-modal/takeover-address-modal.component';
import {AgGridModule} from 'ag-grid-angular';
import { SpontaneousTakeoverLayoutComponent } from './component/spontaneous-takeover/spontaneous-takeover-layout/spontaneous-takeover-layout.component';
import { ShipperAddressButtonCellRendererComponent } from './component/spontaneous-takeover/shipper-address-button-cell-renderer/shipper-address-button-cell-renderer.component';
import { ShipperAddressModalComponent } from './component/spontaneous-takeover/shipper-address-button-cell-renderer/shipper-address-modal/shipper-address-modal.component';
import { SpontaneousTakeoverTableComponent } from './component/spontaneous-takeover/spontaneous-takeover-table/spontaneous-takeover-table.component';
import { CustomerTakeoverTableComponent } from './component/spontaneous-takeover/customer-takeover-table/customer-takeover-table.component';
import { EditSpontaneousTakeoverButtonCellRendererComponent } from './component/spontaneous-takeover/edit-spontaneous-takeover-button-cell-renderer/edit-spontaneous-takeover-button-cell-renderer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DepotSelectionListComponent } from './component/spontaneous-takeover/depot-selection-list/depot-selection-list.component';
import { PtvRestPlanningComponent } from './component/ptv-rest-planning/ptv-rest-planning.component';
import { PtvCompletedInfoModalComponent } from './component/ptv-completed-info-modal/ptv-completed-info-modal.component';
import { RulePickupTableComponent } from './component/spontaneous-takeover/rule-pickup-table/rule-pickup-table.component';
import { RulePickupModalComponent } from './component/spontaneous-takeover/rule-pickup-modal/rule-pickup-modal.component';
import { EditRulePickupButtonCellRendererComponent } from './component/spontaneous-takeover/edit-rule-pickup-button-cell-renderer/edit-rule-pickup-button-cell-renderer.component';
import { DeleteRulePickupModalComponent } from './component/spontaneous-takeover/delete-rule-pickup-modal/delete-rule-pickup-modal.component';

@NgModule({
  entryComponents: [
    TourInfoComponent,
    FilterControlComponent,
    TourFilterComponent,
    TourNumberCellComponent,
    TakeoverAddressModalComponent,
    ShipperAddressModalComponent,
    EditSpontaneousTakeoverButtonCellRendererComponent,
    EditRulePickupButtonCellRendererComponent,
    SpontaneousTakeoverModalComponent,
    RulePickupModalComponent,
    DeleteRulePickupModalComponent,
    PtvCompletedInfoModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([ShipperAddressButtonCellRendererComponent]),
    CollapseModule,
    FontAwesomeModule,
  ],
    exports: [
        ProgressbarModule,
        fromComponents.components,
        fromPipes.pipes,
        fromDirectives.directives,
        NavigationDeliveryItemComponent,
        SpontaneousTakeoverModalComponent,
        PtvRestPlanningComponent
    ],
  declarations: [
    fromComponents.components,
    fromPipes.pipes,
    fromDirectives.directives,
    UmdispoInfoComponent,
    SelectionCountButtonComponent,
    NavigationItemComponent,
    SelectedListEmergencyButtonComponent,
    NavigationDeliveryItemComponent,
    UpdateToursComponent,
    SpontaneousTakeoverModalComponent,
    TakeoverAddressModalComponent,
    SpontaneousTakeoverLayoutComponent,
    ShipperAddressButtonCellRendererComponent,
    ShipperAddressModalComponent,
    SpontaneousTakeoverTableComponent,
    CustomerTakeoverTableComponent,
    EditSpontaneousTakeoverButtonCellRendererComponent,
    DepotSelectionListComponent,
    PtvRestPlanningComponent,
    PtvCompletedInfoModalComponent,
    RulePickupTableComponent,
    RulePickupModalComponent,
    EditRulePickupButtonCellRendererComponent,
    DeleteRulePickupModalComponent
  ],

})
export class SharedModule {
}
