import {createSelector} from '@ngrx/store';
import {UIStates} from '../..';
import {selectUIState} from '../../index';
import {StrategicDispoUIState} from '../../reducers/strategic-dispo/strategic-dispo-ui.reducer';

export const getStrategicDispoUIState = createSelector(selectUIState, (state: UIStates) => state.strategicDispo);

export const getTourTableState = createSelector(getStrategicDispoUIState, (state: StrategicDispoUIState) => state.tourTableCollapsed);

