import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './containers';
import {AuthGuard} from './core/guards/auth/auth.guard';
import {InfoViewComponent} from './views/info-view/info-view.component';
import {BlankLayoutComponent} from '@app/views/blank-layout/blank-layout.component';
import {ManualDispoErrorViewComponent} from '@app/views/manual-dispo-error-view/manual-dispo-error-view.component';
import {WelcomeLayoutComponent} from "@app/containers/welcome-layout/welcome-layout.component";

export const routes: Routes = [
  {
    path: 'zugriffverweigert',
    component: BlankLayoutComponent,
    data: {
      rights: []
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'welcome-layout',
        component: WelcomeLayoutComponent
      },
      // {
      //   path: '',
      //   redirectTo: 'strategic-dispo',
      //   pathMatch: 'full'
      // },
      {
        path: 'strategic-dispo',
        loadChildren: () =>
          import('./modules/strategic-dispo/strategic-dispo.module').then(
            (m) => m.StrategicDispoModule
          ),
        data: {
            rights: ['DISPOYODA_STRDP']
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'manual-dispo',
        loadChildren: () =>
          import('./modules/manual-dispo/manual-dispo.module').then(
            (m) => m.ManualDispoModule
          ),
        data: {
          rights: ['DISPOYODA_MANDP']
        },
        // canActivate: [AuthGuard, ManualDispoActivateGuard]
        canActivate: [AuthGuard]
      },
      {
        path: 'stammdaten',
        loadChildren: () =>
          import(
            '@modules/stammdaten/stammdate.module'
            ).then((m) => m.StammdatenModule),
        data: {
          rights: []
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'on-tour',
        loadChildren: () =>
          import(
            '@modules/on-tour/on-tour.module'
            ).then((m) => m.OnTourModule),
        data: {
          rights: []
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'info',
        component: InfoViewComponent,
        data: {
          rights: []
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'error',
        component: ManualDispoErrorViewComponent,
        data: {
          rights: []
        },
        canActivate: [AuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
