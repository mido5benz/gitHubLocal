import {Action, createReducer, on} from '@ngrx/store';

import * as TagesabschlussActions from '../actions/daily-closing.actions';

export const DAILY_CLOSING_FEATURE_KEY = 'dailyclosing';

export interface State {
  offeneTouren: any;
  done: boolean;
  loading: boolean;
  error?: string | null;
}

export interface TagesabschlussPartialState {
  readonly [DAILY_CLOSING_FEATURE_KEY]: State;
}

export const initialTagesabschlussState: State = {
  offeneTouren: [],
  done: false,
  loading: false,
  error: null,
};

const tagesAbschlussDispoReducer = createReducer(
  initialTagesabschlussState,
  on(TagesabschlussActions.fetchOffeneTourenRequest, (state) => ({...state, loading: true})),
  on(TagesabschlussActions.fetchOffeneTourenSuccess, (state, {offeneTouren}) => ({...state, loading: false, offeneTouren})),
  on(TagesabschlussActions.fetchOffeneTourenFailure, (state) => ({...state, loading: false})),
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducer(state: State | undefined, action: Action): State {
  return tagesAbschlussDispoReducer(state, action);
}
