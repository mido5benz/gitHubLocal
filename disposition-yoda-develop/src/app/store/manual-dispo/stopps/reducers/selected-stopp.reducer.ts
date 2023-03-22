import {Action, createReducer, on} from '@ngrx/store';
import {DispoStopp} from '@models/index';
import {deselectStopp, selectStopp} from '@store/manual-dispo/stopps/actions/selected-stopp.actions';

export const SELECTEDSTOPP_FEATURE_KEY = 'selectedStopp';

export interface State {
  stopp: DispoStopp;
}

export interface SelectedStoppPartialState {
  readonly [SELECTEDSTOPP_FEATURE_KEY]: State;
}

export const initialSelectedStoppState: State = {
  stopp: null
};

const selectedStoppReducer = createReducer(
  initialSelectedStoppState,
  on(selectStopp, (state: State, props) => ({...state, stopp: props.stopp})),
  on(deselectStopp, (state: State) => ({...state, stopp: null})),
);

export const reducer = (state: State | undefined, action: Action): State => selectedStoppReducer(state, action);
