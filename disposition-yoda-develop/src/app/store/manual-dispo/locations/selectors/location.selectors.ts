import {createSelector} from '@ngrx/store';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';
import {LOCATIONS_FEATURE_KEY} from '@store/manual-dispo/locations/reducers/location.reducer';
import {State as LocationsState} from '../reducers/location.reducer';

export const getLocationsState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state[LOCATIONS_FEATURE_KEY]);

export const getLocationsSelector = createSelector(getLocationsState, (state: LocationsState) => state.locations);
export const getLoadingSelector = createSelector(getLocationsState, (state: LocationsState) => state.loading);
