import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TourFilterComponent} from '@app/shared/component/tour-filter/tour-filter.component';
import {SollStoppNumberPipe} from '@app/shared/pipes/soll-stopp-number.pipe';
import {AppBreadcrumbModule} from '@coreui/angular';
import {AgGridModule} from 'ag-grid-angular';
import {AlertModule, ModalModule, PopoverModule, TypeaheadModule} from 'ngx-bootstrap';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModule} from '@shared/shared.module';
import {TourNumberCellComponent} from '@shared/component';
import {TourNumberPipe} from '@shared/pipes';
import {DialogRef} from './../dialog/dialog-ref';
import {ManualDispoRoutingModule} from './manual-dispo-routing.module';
import {FullWidthCellRenderer} from '@manual-dispo-components/stopp-list/full-width-cell-renderer.component';
import {StoppInfoButtonComponentCellRendererComponent} from '@manual-dispo-views/tour-detail-view/components/tour-detail-stopp-list/components/stopp-info-button/stopp-info-button-component-cell-renderer.component';
import {VersenderInfoComponent} from './views/tour-detail-view/components/tour-detail-stopp-list/components/show-stopp-info-dialog/components/versender-info/versender-info.component';

import * as fromComponents from './components';
import * as fromViews from './views';
import {TourSendungsDetailViewComponent} from './views/tour-sendungs-detail-view/tour-sendungs-detail-view.component';
import { UnverplanteStoppSendungsDetailComponent } from './components/unverplante-stopp-sendungs-detail/unverplante-stopp-sendungs-detail.component';
import {
  ColliEventsModule,
  DangerousGoodsModule, DispoDetailsModule,
  SendungsereignisseModule,
  SendungsketteModule,
  ShipmentInfoDetailsModule
} from 'sendungs-detail-lib';
import { ActivateMaschinelleDispoButtonComponent } from './components/maschinelle-dispo/activate-maschinelle-dispo-button/activate-maschinelle-dispo-button.component';
import {OnTourModule} from '@modules/on-tour/on-tour.module';
import { ActivateMaschinelleDispoModalComponent } from './components/maschinelle-dispo/activate-maschinelle-dispo-modal/activate-maschinelle-dispo-modal.component';
import { TableInfoButtonCellRendererComponent } from './components/table/table-info-button-cell-renderer/table-info-button-cell-renderer.component';
import { ShowTableInfoDialogComponent } from './components/table/show-table-info-dialog/show-table-info-dialog.component';
import {MergeRecipientsDialogComponent} from '@modules/stammdaten/components';
import {StammdatenModule} from '@modules/stammdaten/stammdate.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AppBreadcrumbModule,
        ManualDispoRoutingModule,
        BsDropdownModule,
        ModalModule,
        AgGridModule.withComponents([TourFilterComponent, TourNumberCellComponent, StoppInfoButtonComponentCellRendererComponent, TableInfoButtonCellRendererComponent]),
        ButtonsModule,
        CollapseModule,
        TypeaheadModule.forRoot(),
        PopoverModule.forRoot(),
        AlertModule.forRoot(),
        DragDropModule,
        NgxSpinnerModule,
        SendungsereignisseModule,
        DangerousGoodsModule,
        ShipmentInfoDetailsModule,
        ColliEventsModule,
        SendungsketteModule,
        DispoDetailsModule,
        OnTourModule,
        StammdatenModule

    ],
  declarations: [
    fromComponents.components,
    fromViews.views,
    TourSendungsDetailViewComponent,
    UnverplanteStoppSendungsDetailComponent,
    ActivateMaschinelleDispoButtonComponent,
    ActivateMaschinelleDispoModalComponent,
    TableInfoButtonCellRendererComponent,
    ShowTableInfoDialogComponent,
  ],
  providers: [TourNumberPipe, SollStoppNumberPipe, BsModalService, DialogRef],
  entryComponents: [
    fromComponents.UtilizationPopupComponent,
    fromComponents.SearchTourPopupComponent,
    fromComponents.AddStoppPopupComponent,
    fromComponents.TageabschlussModalComponent,
    fromComponents.ActivateMaschinelleDispoModalComponent,
    FullWidthCellRenderer,
    ShowTableInfoDialogComponent,
    MergeRecipientsDialogComponent
  ],
  exports: [
    VersenderInfoComponent
  ]
})
export class ManualDispoModule {
}
