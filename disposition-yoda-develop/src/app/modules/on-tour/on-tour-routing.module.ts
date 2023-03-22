import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnTourDashboardViewComponent } from './views/on-tour-dashboard-view/on-tour-dashboard-view.component';

const routes: Routes = [
  {
    path: '',
    component: OnTourDashboardViewComponent,
    data: {
      title: 'onTour Anfragen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class OnTourRoutingModule { }
