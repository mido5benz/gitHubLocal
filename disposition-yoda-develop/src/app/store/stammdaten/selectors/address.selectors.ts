import {createSelector} from '@ngrx/store';

import {ADDRESSES_FEATURE_KEY, State as AddressState} from '../reducers/address.reducer';

import {selectStammdatenState} from '@store/stammdaten/selectors/index';

export const getAddressesState = createSelector(
  selectStammdatenState,
  (state: AddressState) => state[ADDRESSES_FEATURE_KEY]);

export const getUnassignedAddresses = createSelector(
  getAddressesState,
  (state: AddressState) => state.all ? state.all : []);

export const getSynonyms = createSelector(
  getAddressesState,
  (state: AddressState) => state.synonyms);

export const getUnassignedAddressesCount = createSelector(
  getAddressesState,
  (state: AddressState) => state.count ? state.count : 0);

export const getArchivedAddressesCount = createSelector(
  getAddressesState,
  (state: AddressState) => state.count_archived_address ? state.count_archived_address : 0);
