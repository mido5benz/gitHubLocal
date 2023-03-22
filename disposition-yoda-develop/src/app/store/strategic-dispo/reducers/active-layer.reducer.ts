import {Action, createReducer, on} from '@ngrx/store';

import * as ActiveLayerActions from '../actions/active-layer.actions';

export const ACTIVELAYER_FEATURE_KEY = 'layer';

export interface State {
  activeLayer: string;
}

export interface ActiveLayerPartialState {
  readonly [ACTIVELAYER_FEATURE_KEY]: State;
}

export const initialState: State = {
  activeLayer: 'sattel'
};

const activeLayerReducer = createReducer(
  initialState,
  on(ActiveLayerActions.setActiveLayer, (state, {activeLayer}) => ({
    ...state, activeLayer
  }))
);

export const reducer = (state: State | undefined, action: Action): any => activeLayerReducer(state, action);
