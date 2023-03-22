import {Action, createReducer, on} from '@ngrx/store';
import {Fahrzeugtypen} from '@shared/models';
import * as StammdatenActions from '@store/stammdaten/actions/stammdaten.actions';

export const FAHRZEUGTYPEN_FEATURE_KEY = 'fahrzeugtypen';

export interface State {
  loading: boolean;
  all: Fahrzeugtypen[];
}

export interface FahrzeugtypenPartialState {
  readonly [FAHRZEUGTYPEN_FEATURE_KEY]: State;
}

export const initialToursState: State = {
  loading: false,
  all: [],
};

const fahrzeugtypenReducer = createReducer(
  initialToursState,
  on(StammdatenActions.fetchStammdatenSuccess,
    (state, {stammdaten}) => ({...state, all: stammdaten.fahrzeugtypen})))
;

export const reducer = (state: State | undefined, action: Action): State => fahrzeugtypenReducer(state, action);
