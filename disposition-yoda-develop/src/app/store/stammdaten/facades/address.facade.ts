import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as SuggestionSelectors from '../selectors/known-destinations.selectors';

import {SuggestionsPartialState} from '@store/stammdaten/reducers/known-destinations.reducers';
import {
  getArchivedAddressesCount,
  getSynonyms,
  getUnassignedAddresses,
  getUnassignedAddressesCount
} from '@store/stammdaten/selectors/address.selectors';

@Injectable({
  providedIn: 'root'
})
export class AddressFacade {
  unassignedAddresses$ = this.store.pipe(select(getUnassignedAddresses));
  unassignedAddressesCount$ = this.store.pipe(select(getUnassignedAddressesCount));
  archivedAddressCount$ = this.store.pipe(select(getArchivedAddressesCount));
  synonyms$ = this.store.pipe(select(getSynonyms));

  suggestions$ = this.store.pipe(select(SuggestionSelectors.getSuggestions));
  loading$ = this.store.pipe(select(SuggestionSelectors.getLoading));

  constructor(private store: Store<SuggestionsPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
