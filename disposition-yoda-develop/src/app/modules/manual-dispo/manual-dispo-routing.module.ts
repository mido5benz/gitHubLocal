import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterDataContainerComponent} from './container/index';
import {ManualDispoComponent} from './manual-dispo.component';
import {DispostoppDetailViewComponent, ManualDispoMapComponent, TourDetailViewComponent, UnassignedStoppsViewComponent} from './views';
import {ManualDispoActivateGuard, PendingChangesGuard} from '@app/core/guards';
import {TourSendungsDetailViewComponent} from '@manual-dispo-views/tour-sendungs-detail-view/tour-sendungs-detail-view.component';
import {UnverplanteStoppSendungsDetailComponent} from '@manual-dispo-components/unverplante-stopp-sendungs-detail/unverplante-stopp-sendungs-detail.component';
import {SpontaneousTakeoverLayoutComponent} from '@shared/component/spontaneous-takeover/spontaneous-takeover-layout/spontaneous-takeover-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ManualDispoComponent,
    data: {
      title: 'Manuelle Disposition',
      roles: ['DISPOYODA_MANDP'],
    },
    canActivate: [],
    children: [
      {
        path: '',
        component: ManualDispoMapComponent,
        canActivate: [ManualDispoActivateGuard],
      },
      {
        path: 'spontane-uebernahme',
        component: SpontaneousTakeoverLayoutComponent,
        canActivate: []
      },
      {
        path: 'tour/:tourId',
        component: MasterDataContainerComponent,
        canActivate: [],
        children: [
          {
            path: '',
            component: TourDetailViewComponent,
            //canDeactivate: [PendingChangesGuard]
          },
          {
            path: 'stopps/:stoppid',
            component: DispostoppDetailViewComponent
          },
          {
            path: 'stopps/:stoppid/sendungsdetail',
            component: TourSendungsDetailViewComponent,
          }
        ]
      },
      {
        path: 'feindisposition',
        component: UnassignedStoppsViewComponent,
        canActivate: [],
      },
      {
        path: 'feindisposition/sendungsebene/tourId/:tour_id/dispostoppId/:dispostopp_id',
        component: UnverplanteStoppSendungsDetailComponent,
        canActivate: [],
      },
      {
        path: 'feindisposition/sendungsebene/tourId/:tour_id/dispostoppId/:dispostopp_id/sendungsdetail',
        component: TourSendungsDetailViewComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualDispoRoutingModule {
}
