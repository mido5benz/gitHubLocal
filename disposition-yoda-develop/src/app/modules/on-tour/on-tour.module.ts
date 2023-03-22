import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnTourRoutingModule } from './on-tour-routing.module';
import { OnTourDashboardViewComponent } from './views/on-tour-dashboard-view/on-tour-dashboard-view.component';
import { SharedModule } from '@app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { TourInfoContainerComponent } from './components/tour-info-container/tour-info-container.component';
import { TourInfoContainerDetailComponent } from './components/tour-info-container-detail/tour-info-container-detail.component';
import { TourInfoContainerDetailTableComponent } from './components/tour-info-container-detail-table/tour-info-container-detail-table.component';
import { ButtonCellAcceptComponent } from './components/on-tour-info/button-cell-accept/button-cell-accept.component';
import { ButtonCellDeclineComponent } from './components/on-tour-info/button-cell-decline/button-cell-decline.component';
import { OnTourInfoComponent } from './components/on-tour-info/on-tour-info.component';
import { CollapseModule } from 'ngx-bootstrap';


@NgModule({
    entryComponents: [
        ButtonCellAcceptComponent,
        ButtonCellDeclineComponent
    ],
    declarations: [
        OnTourDashboardViewComponent,
        OnTourInfoComponent,
        ButtonCellAcceptComponent,
        ButtonCellDeclineComponent,
        TourInfoContainerComponent,
        TourInfoContainerDetailComponent,
        TourInfoContainerDetailTableComponent,
    ],
    exports: [
        OnTourInfoComponent
    ],
    imports: [
        CommonModule,
        OnTourRoutingModule,
        SharedModule,
        AgGridModule,
        CollapseModule.forRoot(),
    ]
})
export class OnTourModule { }
