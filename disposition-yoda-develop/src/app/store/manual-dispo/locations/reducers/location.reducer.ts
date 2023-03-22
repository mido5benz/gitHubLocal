import {Action, createReducer, on} from '@ngrx/store';
import * as fromSites from '../actions/fetch-locations.actions';
import {Location} from '@models/index';

export interface State {
  loading: boolean;
  locations: Location[];
}

export const LOCATIONS_FEATURE_KEY = 'locations';

export interface LocationsPartialState {
  readonly [LOCATIONS_FEATURE_KEY]: State;
}

export const initialLocationState: State = {
  loading: false,
  locations: [],
};

const locationsReducer = createReducer(initialLocationState,
  on(fromSites.fetchLocationsStart, (state) => ({...state, loading: true})),
  on(fromSites.fetchLocationsSuccess, (state, {locations}) => ({...state, locations, loading: false})),
  on(fromSites.fetchLocationsFailure, (state) => ({...state, loading: false})),
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducer(state: State | undefined, action: Action): State {
  return locationsReducer(state, action);
}
