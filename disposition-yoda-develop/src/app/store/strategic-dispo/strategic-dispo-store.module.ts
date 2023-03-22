import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducer, combineReducers, createFeatureSelector, StoreModule} from '@ngrx/store';

import {reducer as activeLayerReducer, State as ActiveLayerState} from './reducers/active-layer.reducer';

export const STRATEGIC_DISPO_KEY = 'StrategicDispo';

export interface StrategicDispoState {
  layer: ActiveLayerState;
}

const allReducers: ActionReducer<any> = combineReducers(
  {
    activeLayer: activeLayerReducer
  }
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function strategicDispoReducer(state, action): ActionReducer<any> {
  return allReducers(state, action);
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(STRATEGIC_DISPO_KEY, strategicDispoReducer),
    EffectsModule.forFeature(
      // [RasterEffects]
    )
  ]
})
export class StrategicDispoStoreModule {
}

export const selectLayerState = createFeatureSelector<StrategicDispoState>(
  'StrategicDispo'
);
