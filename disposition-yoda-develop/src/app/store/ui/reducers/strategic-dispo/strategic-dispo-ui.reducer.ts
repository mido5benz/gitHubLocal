import {Action, createReducer, on} from '@ngrx/store';
import * as tourTableActions from '../../actions/strategic-dispo/strategic-dispo.ui.actions';

export interface StrategicDispoUIState {
  tourTableCollapsed: boolean;
}

export const initialState: StrategicDispoUIState = {
  tourTableCollapsed: false,
};

const tourTableReducer = createReducer(
  initialState,
  on(tourTableActions.toggleTourTable, (state) => ({
    ...state,
    tourTableCollapsed: !state.tourTableCollapsed,
  }))
);

export const reducer = (state: StrategicDispoUIState | undefined, action: Action): StrategicDispoUIState => tourTableReducer(state, action);

export const selectTourTableCollapsed = (state: StrategicDispoUIState) =>
  state.tourTableCollapsed;
