import {ActionReducer, combineReducers, createFeatureSelector} from '@ngrx/store';
import {ManualDispoUIState, reducer as manualDispoReducer} from './reducers/manual-dispo/manual-dispo-ui.reducer';
import {reducer as strategicDispoReducer, StrategicDispoUIState} from './reducers/strategic-dispo/strategic-dispo-ui.reducer';

export interface UIStates {
  manualDispo: ManualDispoUIState;
  strategicDispo: StrategicDispoUIState;
}

const allUIReducers: ActionReducer<any> = combineReducers(
  {
    manualDispo: manualDispoReducer,
    strategicDispo: strategicDispoReducer
  }
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function uiReducers(state, action): ActionReducer<any> {
  return allUIReducers(state, action);
}

export const selectUIState = createFeatureSelector<UIStates>(
  'UI'
);
