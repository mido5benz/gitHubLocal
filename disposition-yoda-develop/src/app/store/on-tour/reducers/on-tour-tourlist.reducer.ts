import {Anfrage} from '@models/on-tour/aenderungswunsch.model';
import {Action, createReducer, on} from '@ngrx/store';

import * as OnTourActions from '../actions/on-tour.actions';

export const ALL_TOUR_FEATURE_KEY = 'allTours';

export interface State {
  loading: boolean;
  anfragen: any;
  count: number;
}

export interface OnTourPartialStates {
  readonly [ALL_TOUR_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  anfragen: [],
  count: 0
};

const tourListReducer = createReducer(
  initialState,
  on(OnTourActions.fetchOnTourlistRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(OnTourActions.fetchOnTourlistRequestSuccess, (state, {completeOnTourList}) => ({
    ...state,
    loading: false,
    anfragen: completeOnTourList.anfragen,
    count: completeOnTourList.anzahl
  })),
  on(OnTourActions.fetchOnTourlistRequestFailure, (state) => ({
    ...state,
    loading: false
  })),

  on(OnTourActions.acceptOnTourChange, (state, {change}) => ({
    ...state,
    anfragen: state.anfragen.filter((tour: Anfrage) => tour.anfrage_stoppplanung_id !== change.anfrage_stoppplanung_id),
    count: state.count - 1
  })),
  on(OnTourActions.acceptOnTourChangeSuccess, (state, {status}) => ({
    ...state,
  })),
  on(OnTourActions.acceptOnTourChangeFailure, (state) => ({
    ...state,
  })),

  on(OnTourActions.declineOnTourChange, (state, {change}) => ({
    ...state,
    anfragen: state.anfragen.filter((tour: Anfrage) => tour.anfrage_stoppplanung_id !== change.anfrage_stoppplanung_id),
    count: state.count - 1
  })),
  on(OnTourActions.declineOnTourChangeSuccess, (state, {status}) => ({
    ...state,
  })),
  on(OnTourActions.declineOnTourChangeFailure, (state) => ({
    ...state,
  })),
  on(OnTourActions.fetchCounterSuccess, (state, {aenderungswunsch}) => ({
    ...state,
    loading: false,
    count: aenderungswunsch.anzahl
  })),
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducer(state: State | undefined, action: Action): any {
  return tourListReducer(state, action);
}
