import {CreateNewAddressDialogComponent} from './create-new-address-dialog/create-new-address-dialog.component';
import {MergeRecipientsDialogComponent} from './merge-recipients-dialog/merge-recipients-dialog.component';
import {RecipientFormComponent} from './recipient-form/recipient-form.component';
import {SynonymSuggestionsListComponent} from '@modules/stammdaten/components/synonym-suggestions-list/synonym-suggestions-list.component';
import {SynonymSuggestionListItemComponent} from '@modules/stammdaten/components/synonym-suggestions-list/components/synonym-suggestion-list-item/synonym-suggestion-list-item.component';
import {UnassignedAddressListComponent} from '@modules/stammdaten/components/address-list/unassigned-address-list.component';
import {ChosenAddressComponent} from '@modules/stammdaten/components/chosen-address/chosen-address.component';
import {HeadingComponent} from '@modules/stammdaten/components/heading/heading.component';
import {AddressesAtGeolocationComponent} from '@modules/stammdaten/components/create-new-address-dialog/addresses-at-geolocation/addresses-at-geolocation.component';
import {GeopositionFormComponent} from '@modules/stammdaten/components/create-new-address-dialog/geoposition-form/geoposition-form.component';
import {StammdatenNavbarComponent} from '@modules/stammdaten/components/stammdaten-navbar/stammdaten-navbar.component';

export const components = [
  CreateNewAddressDialogComponent,
  MergeRecipientsDialogComponent,
  RecipientFormComponent,
  SynonymSuggestionsListComponent,
  SynonymSuggestionListItemComponent,
  UnassignedAddressListComponent,
  ChosenAddressComponent,
  HeadingComponent,
  AddressesAtGeolocationComponent,
  GeopositionFormComponent,
  StammdatenNavbarComponent
];

export * from './create-new-address-dialog/create-new-address-dialog.component';
export * from './merge-recipients-dialog/merge-recipients-dialog.component';
export * from './recipient-form/recipient-form.component';
export * from './synonym-suggestions-list/synonym-suggestions-list.component';
export * from './synonym-suggestions-list/components/synonym-suggestion-list-item/synonym-suggestion-list-item.component';
export * from './address-list/unassigned-address-list.component';
export * from './chosen-address/chosen-address.component';
export * from './heading/heading.component';
export * from './create-new-address-dialog/addresses-at-geolocation/addresses-at-geolocation.component';
export * from './create-new-address-dialog/geoposition-form/geoposition-form.component';
export * from './stammdaten-navbar/stammdaten-navbar.component';



