import {createSelector} from '@ngrx/store';

import {State} from '@store/strategic-dispo/reducers/active-layer.reducer';
import {selectLayerState} from '../strategic-dispo-store.module';


export const getActiveLayerState = createSelector(selectLayerState, (state: any) => state.activeLayer );

export const getActiveLayer = createSelector(getActiveLayerState, (state: State) => state.activeLayer);
