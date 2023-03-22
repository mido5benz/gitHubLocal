import {Action, createReducer, on} from '@ngrx/store';
import {Ziel} from '@shared/models';

import * as StammdatenActions from '../actions/stammdaten.actions';

export const DESTINATIONS_FEATURE_KEY = 'ziele';

export interface State {
  loading: boolean;
  all: Ziel[];
}

export interface ZielePartialState {
  readonly [DESTINATIONS_FEATURE_KEY]: State;
}

export const initialToursState: State = {
  loading: false,
  all: [],
};

const zieleReducer = createReducer(
  initialToursState,
  on(StammdatenActions.fetchZieleRequest, (state) => ({...state, loading: true})),
  on(StammdatenActions.fetchZieleSuccess, (state, {ziele}) => ({...state, loading: false, all: ziele})),
  on(StammdatenActions.fetchZieleFailure, (state, {error}) => ({...state, loading: true, error})),

  on(StammdatenActions.deleteRecipientRequest, (state) => ({...state, loading: true})),
  on(StammdatenActions.deleteRecipientSuccess, (state, {recipientId}) => ({
    ...state,
    loading: false,
    all: state.all.filter((recipient) => recipient.ziel_name_id !== recipientId)
  })),
  on(StammdatenActions.deleteRecipientFailed, (state) => ({...state, loading: false})),
);

export function reducer(state: State | undefined, action: Action): State {
  return zieleReducer(state, action);
}
