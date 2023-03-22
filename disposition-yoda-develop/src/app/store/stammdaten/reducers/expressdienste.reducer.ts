import {Action, createReducer, on} from '@ngrx/store';
import {DiensteExpress} from '@shared/models';
import * as StammdatenActions from '@store/stammdaten/actions/stammdaten.actions';

export const EXPRESSDIENSTE_FEATURE_KEY = 'expressdienste';

export interface State {
  loading: boolean;
  all: DiensteExpress[];
}

export interface ExpressDienstePartialState {
  readonly [EXPRESSDIENSTE_FEATURE_KEY]: State;
}

export const initialExpressDiensteState: State = {
  loading: false,
  all: [],
};

const expressdiensteReducer = createReducer(
  initialExpressDiensteState,
  on(StammdatenActions.fetchStammdatenSuccess,
    (state, {stammdaten}) => ({...state, all: stammdaten.expressdienste})))
;

export const reducer = (state: State | undefined, action: Action): State => expressdiensteReducer(state, action);
