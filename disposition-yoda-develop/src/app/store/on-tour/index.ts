import {combineReducers} from '@ngrx/store';
import { TOURLIST_FEATURE_KEY } from '@store/manual-dispo/tour/reducers/tour-list.reducer';
import { selectedTourReducer, onTourlistReducer } from './reducers';
import { SELECTED_FEATURE_KEY } from './reducers/selected-tour.reducer';

import { State as SelectedTourState } from './reducers/selected-tour.reducer';
import { State as TourListState } from './reducers/on-tour-tourlist.reducer';


export interface OnTourState {
  [SELECTED_FEATURE_KEY]: SelectedTourState;
  [TOURLIST_FEATURE_KEY]: TourListState;

}

const reducers = combineReducers(
  {
    [SELECTED_FEATURE_KEY]: selectedTourReducer,
    [TOURLIST_FEATURE_KEY]: onTourlistReducer,

  }
);

export function onTourReducer(state, action): any {
  return reducers(state, action);
}
