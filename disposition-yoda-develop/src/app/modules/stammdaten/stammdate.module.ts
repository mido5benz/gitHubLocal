import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import {AlertModule, BsDropdownModule, CollapseModule, ModalModule, TypeaheadModule} from 'ngx-bootstrap';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DialogModule} from '@modules/dialog/dialog.module';
import {SharedModule} from '@shared/shared.module';
import {StammdatenRoutingModule} from './stammdaten-routing.module';
import {MergeRecipientsDialogComponent} from './components';
import {RecipientDeliveryPeriodComponent} from '@modules/stammdaten/views';
import {AddSynonymFormComponent} from '@modules/stammdaten/views';
import {NgxBootstrapMultiselectModule} from 'ngx-bootstrap-multiselect';

import * as fromViews from './views';
import * as fromComponents from './components';
import { RunPtvSearchComponent } from './components/create-new-address-dialog/run-ptv-search/run-ptv-search.component';
import { LoadMoreButtonComponent } from './components/address-list/components/load-more-button/load-more-button.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        StammdatenRoutingModule,
        TypeaheadModule.forRoot(),
        AgGridModule.withComponents([]),
        DialogModule,
        NgxSpinnerModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule,
        NgxBootstrapMultiselectModule,
        AlertModule,
        DragDropModule
    ],
  declarations: [
    ...fromViews.views,
    ...fromComponents.components,
    RunPtvSearchComponent,
    LoadMoreButtonComponent,
  ],
  entryComponents: [MergeRecipientsDialogComponent, RecipientDeliveryPeriodComponent, AddSynonymFormComponent]
})
export class StammdatenModule {
}
