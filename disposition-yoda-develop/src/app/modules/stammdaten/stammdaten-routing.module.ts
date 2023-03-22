import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '@modules/stammdaten/views';
import {RecipientListViewComponent} from '@modules/stammdaten/views/recipient-list-view/recipient-list-view.component';
import {CreateNewAddressDialogComponent} from '@modules/stammdaten/components';
import {RecipientDetailViewComponent} from '@modules/stammdaten/views';
import {IncorrectStoppsViewComponent} from '@modules/stammdaten/views';
import {AddressListArchivedComponent} from "@modules/stammdaten/views";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: RecipientListViewComponent,
        canActivate: [],
      },
      {
        path: 'ziel/details/:id',
        component: RecipientDetailViewComponent,
        canActivate: [],
      },
      {
        path: 'fehlerhaft',
        component: IncorrectStoppsViewComponent,
        canActivate: [],
      },
      {
        path: 'fehlerhaft/archiviert',
        component: AddressListArchivedComponent,
        canActivate: [],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [CreateNewAddressDialogComponent]
})
export class StammdatenRoutingModule {
}
