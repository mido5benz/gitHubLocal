import {Action, createReducer, on} from '@ngrx/store';
import {Dienste} from '@shared/models';
import * as StammdatenActions from '@store/stammdaten/actions/stammdaten.actions';

export const DIENSTE_FEATURE_KEY = 'dienste';

export interface State {
  loading: boolean;
  all: Dienste[];
}

export interface DienstePartialState {
  readonly [DIENSTE_FEATURE_KEY]: State;
}

export const initialDiensteState: State = {
  loading: false,
  all: [],
};

const diensteReducer = createReducer(
  initialDiensteState,
  on(StammdatenActions.fetchStammdatenSuccess,
    (state, {stammdaten}) => ({...state, all: stammdaten.dienste})))
;

export const reducer = (state: State | undefined, action: Action): State => diensteReducer(state, action);
