import {IndexComponent} from '@modules/stammdaten/views/index/index.component';
import {RecipientlistInfoHeaderComponent} from '@modules/stammdaten/views/recipient-list-view/components/recipientlist-info-header/recipientlist-info-header.component';
import {RecipientListViewComponent} from '@modules/stammdaten/views/recipient-list-view/recipient-list-view.component';
import {RecipientDetailViewComponent} from '@modules/stammdaten/views/recipient-detail-view/recipient-detail-view.component';
import {IncorrectStoppsViewComponent} from '@modules/stammdaten/views/incorrect-stopps-view/incorrect-stopps-view.component';
import {RecipientDetailsComponent} from '@modules/stammdaten/views/recipient-detail-view/components/recipient-details/recipient-details.component';
import {RecipientSynonymsComponent} from '@modules/stammdaten/views/recipient-detail-view/components/recipient-synonyms/recipient-synonyms.component';
import {RecipientDeliveryPeriodComponent} from '@modules/stammdaten/components/recipient-delivery-period/recipient-delivery-period.component';
import {DeliveryPeriodTableComponent} from '@modules/stammdaten/components/delivery-period-table/delivery-period-table.component';
import {AddSynonymFormComponent} from '@modules/stammdaten/views/recipient-detail-view/components/add-synonym-form/add-synonym-form.component';
import {AddressListArchivedComponent} from "@modules/stammdaten/views/address-list-archived/address-list-archived.component";

export const views = [
  IndexComponent,
  RecipientlistInfoHeaderComponent,
  RecipientListViewComponent,
  RecipientDetailViewComponent,
  IncorrectStoppsViewComponent,
  RecipientDetailsComponent,
  RecipientSynonymsComponent,
  DeliveryPeriodTableComponent,
  RecipientDeliveryPeriodComponent,
  AddSynonymFormComponent,
  AddressListArchivedComponent,
];

export * from '@modules/stammdaten/views/index/index.component';
export * from '@modules/stammdaten/views/recipient-list-view/components/recipientlist-info-header/recipientlist-info-header.component';
export * from '@modules/stammdaten/views/recipient-list-view/recipient-list-view.component';
export * from '@modules/stammdaten/views/recipient-detail-view/recipient-detail-view.component';
export * from '@modules/stammdaten/views/incorrect-stopps-view/incorrect-stopps-view.component';
export * from '@modules/stammdaten/views/recipient-detail-view/components/recipient-details/recipient-details.component';
export * from '@modules/stammdaten/views/recipient-detail-view/components/recipient-synonyms/recipient-synonyms.component';
export * from '@modules/stammdaten/components/recipient-delivery-period/recipient-delivery-period.component';
export * from '@modules/stammdaten/components/delivery-period-table/delivery-period-table.component';
export * from '@modules/stammdaten/views/recipient-detail-view/components/add-synonym-form/add-synonym-form.component';
export * from '@modules/stammdaten/views/address-list-archived/address-list-archived.component';
