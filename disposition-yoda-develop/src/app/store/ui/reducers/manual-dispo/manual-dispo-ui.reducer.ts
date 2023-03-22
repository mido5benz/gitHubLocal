import {Action, createReducer, on} from '@ngrx/store';
import * as tourTableActions from '../../actions/manual-dispo/manual-dispo-ui.actions';

export interface ManualDispoUIState {
  tourTableCollapsed: boolean;
  mapFilterCollapsed: boolean;
  tourDetailsCollapsed: boolean;
}

export const initialState: ManualDispoUIState = {
  tourTableCollapsed: false,
  mapFilterCollapsed: true,
  tourDetailsCollapsed: true,
};

const tourTableReducer = createReducer(
  initialState,
  on(tourTableActions.toggleTourTable, (state) => ({
    ...state,
    tourTableCollapsed: !state.tourTableCollapsed,
  })),
  on(tourTableActions.toggleMapFilter, (state) => ({
    ...state,
    mapFilterCollapsed: !state.mapFilterCollapsed,
  })),
  on(tourTableActions.toggleTourDetail, (state) => ({
    ...state,
    tourDetailsCollapsed: !state.tourDetailsCollapsed,
  })),
  on(tourTableActions.openTourDetails, (state) => ({
    ...state,
    tourDetailsCollapsed: false,
  })),
  on(tourTableActions.closeTourDetails, (state) => ({
    ...state,
    tourDetailsCollapsed: true,
  })),
);

export const reducer = (state: ManualDispoUIState | undefined, action: Action): ManualDispoUIState => tourTableReducer(state, action);
