import {createSelector} from '@ngrx/store';
import {ManualDispoUIState} from '../../reducers/manual-dispo/manual-dispo-ui.reducer';
import {selectUIState, UIStates} from './../../index';

export const getManualDispoUIState = createSelector(selectUIState, (state: UIStates) => state.manualDispo);
export const getTourTableState = createSelector(getManualDispoUIState, (state: ManualDispoUIState) => state.tourTableCollapsed);
export const getTourDetailsState = createSelector(getManualDispoUIState, (state: ManualDispoUIState) => state.tourDetailsCollapsed);
export const getMapFilterState = createSelector(getManualDispoUIState, (state: ManualDispoUIState) => state.mapFilterCollapsed);
