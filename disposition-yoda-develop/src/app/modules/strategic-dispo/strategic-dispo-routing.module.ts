import { StrategicDispoComponent } from './strategic-dispo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StrategicDispoComponent,
    data: {
      title: 'Strategische Disposition',
      roles: ['DISPOYODA_STRDP'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrategicDispoRoutingModule {}
