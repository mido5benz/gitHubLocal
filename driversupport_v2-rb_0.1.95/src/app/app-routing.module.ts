import {SendungsDetailsLibComponent} from './views/lib/sendungs-details-lib/sendungs-details-lib.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {DashboardComponent} from './views/dashboard/dashboard.component';
import {TourDetailComponent} from './views/tour-detail/tour-detail.component';
import {TourSelectionComponent} from './views/tour-selection/tour-selection.component';
import {LoginComponent} from './views/login/login.component';
import {PdfViewerComponent} from './views/tour-detail/pdf-viewer/pdf-viewer.component';
import {CollectionOfGoodsComponent} from './views/collection-of-goods/collection-of-goods.component';
import {AuthGuard} from './core/guards/auth/auth.guard';
import {TourShipmentModel} from './_services/api';
import {InfoViewComponent} from './views/Info-view/info-view/info-view.component';
import {BlankLayoutComponent} from './views/blank-layout/blank-layout.component';
import {DefaultLayoutComponent} from './views/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: 'zugriffverweigert',
    component: BlankLayoutComponent
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          rights: ['DS_ACCESS'],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'tourauswahl',
        component: TourSelectionComponent,
        data: {
          title: 'Tourauswahl',
          rights: ['DS_ACCESS'],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'sendungslib',
        component: SendungsDetailsLibComponent,
        data: {
          title: 'SendungsDetails',
          rights: ['DS_ACCESS'],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard/tourdetail',
        component: TourDetailComponent,
        data: {
          title: ' Dashboard / TourDetail',
          rights: ['DS_ACCESS'],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'vereinnahmung',
        component: CollectionOfGoodsComponent,
        data: {
          title: 'Vereinnahmung',
          rights: ['DS_ACCESS'],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard/tourdetail/pdf',
        component: PdfViewerComponent,
        data: {
          title: 'Dashboard / TourDetail / PDF',
          rights: ['DS_ACCESS'],
        },
        canActivate: [AuthGuard],
      },

      {
        path: 'info-view',
        component: InfoViewComponent,
        data: {
          title: 'Informationen',
          rights: ['DS_ACCESS'],
        },
        canActivate: [AuthGuard],
      }
    ]
  },

  {

    path: '',
    redirectTo: '/tourauswahl',
    pathMatch: 'full'
  }
  ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AppRoutingModule {
}
