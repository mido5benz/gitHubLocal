import {Action, createReducer, on} from '@ngrx/store';
import {AvailableTour, Tour} from '@models/index';

import * as fetchAvailableToursActions from '../actions/fetch-available-tours.actions';
import * as filterTourlistActions from '../actions/filter-tourlist.actions';
import * as fetchTourListActions from '../actions/fetch-tour-list.actions';

import {createDictionaryForTourList} from '@shared/utils/tour.utils';

export const TOURLIST_FEATURE_KEY = 'tours';

export interface State {
  loaded: boolean;
  loading: boolean;
  reloadIndexUpdate: boolean;
  filtered: Tour[];
  all: Tour[];
  tourList?: { [key: string]: Tour };
  completeTourList: AvailableTour[];
  error?: any;
}

export interface TourListPartialState {
  readonly [TOURLIST_FEATURE_KEY]: State;
}

export const initialTourListState: State = {
  loaded: false,
  loading: false,
  reloadIndexUpdate: false,
  filtered: [],
  all: [],
  completeTourList: [],
};

const tourListReducer = createReducer(
  initialTourListState,
  on(fetchTourListActions.fetchTourListRequest, (state) => ({...state, loading: true, loaded: false})),
  on(fetchTourListActions.fetchTourListSuccess, (state, {allTours}) => ({
    ...state,
    all: allTours,
    allTours: createDictionaryForTourList(allTours),
    filtered: allTours,
    loading: false,
    loaded: true
  })),
  on(fetchTourListActions.fetchTourListFailure, (state, {error}) => ({...state, loading: false, error, loaded: false})),
  on(filterTourlistActions.setFilteredTourList, (state, {filteredTours}) => ({...state, filtered: filteredTours})),
  on(filterTourlistActions.resetFilter, (state) => ({...state, filtered: state.all})),
  on(fetchAvailableToursActions.fetchAvailableToursSuccess, (state, {completeTourList}) => ({...state, completeTourList})),
  on(fetchAvailableToursActions.fetchAvailableToursFailure, (state, {error}) => ({...state, error}))
  )
;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducer(state: State | undefined, action: Action): State {
  return tourListReducer(state, action);
}
