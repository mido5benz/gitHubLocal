import {createSelector} from '@ngrx/store';

import {KNOWN_DESTINATIONS_FEATURE_KEY, State as KnownDestinationsState} from '../reducers/known-destinations.reducers';

import {selectStammdatenState} from '@store/stammdaten/selectors/index';

export const getKnownDestinationsState = createSelector(
  selectStammdatenState,
  (state: KnownDestinationsState) => state[KNOWN_DESTINATIONS_FEATURE_KEY]);

export const getLoading = createSelector(
  getKnownDestinationsState,
  (state: KnownDestinationsState) => state.loading
);

export const getSuggestions = createSelector(
  getKnownDestinationsState,
  (state: KnownDestinationsState) => state.all
);
