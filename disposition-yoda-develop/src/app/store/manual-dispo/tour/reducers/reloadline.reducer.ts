import {Action, createReducer, on} from '@ngrx/store';
import * as fromReloadLine from '../actions/move-reloadline.actions';
import {
  deleteReloadLineFailure,
  deleteReloadLineRequest,
  deleteReloadLineSuccess
} from '@store/manual-dispo/tour/actions/delete-reloadline.actions';
import {moveReloadLineFailure, moveReloadLineRequest, moveReloadLineSuccess} from '../actions/move-reloadline.actions';

export const RELOADLINE_FEATURE_KEY = 'reloadLine';

export interface State {
  loading: boolean;
  hasChanged: boolean;
  error?: string | null;
}

export interface ReloadLinePartialState {
  readonly [RELOADLINE_FEATURE_KEY]: State;
}

export const initialReloadLineState: State = {
  loading: false,
  hasChanged: false,
  error: null,
};

const reloadLineReducer = createReducer(
  initialReloadLineState,
  on(deleteReloadLineRequest, (state: State) => ({...state, loading: true, error: null})),
  on(deleteReloadLineSuccess, (state: State) => ({...state, hasChanged: true, loading: false, error: null})),
  on(deleteReloadLineFailure, (state: State, props) => ({...state, loading: false, error: props.error})),
  on(moveReloadLineRequest, (state) => ({...state, loading: true})),
  on(moveReloadLineSuccess, (state) => ({...state, loading: false, hasChanged: true})),
  on(moveReloadLineFailure, (state, {error}) => ({...state, error, loading: false})),
);

export const reducer = (state: State | undefined, action: Action): State => reloadLineReducer(state, action);
