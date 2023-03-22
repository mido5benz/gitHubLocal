/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {DispoStopp} from '@models/index';

export enum ActionTypes {
  ADD_STOPP = 'ADD_STOPP',
  REMOVE_STOPP = 'REMOVE_STOPP',
  SET_TARGET_TOUR = 'SET_TARGET_TOUR',
  RESET_UMDISPO_STATE = 'RESET_UMDISPO_STATE',
  RESET_TARGET_TOUR = 'RESET_TARGET_TOUR',

  STOPP_SELECTED = 'STOPP_SELECTED',
  RESET_SELECTED_STOPPS = 'RESET_SELECTED_STOPPS',
}

export const addStopps = createAction(ActionTypes.ADD_STOPP, props<{ stopps: DispoStopp[] }>());
export const removeStopps = createAction(ActionTypes.REMOVE_STOPP, props<{ stopps: DispoStopp, stoppList: DispoStopp[]}>());
export const setTargetTour = createAction(ActionTypes.SET_TARGET_TOUR, props<{ tour: any }>());
export const setTargetTourString = createAction(ActionTypes.SET_TARGET_TOUR, props<{tournr: any}>());
export const resetTargetTour = createAction(ActionTypes.RESET_TARGET_TOUR);

export const stoppClicked = createAction(ActionTypes.STOPP_SELECTED, props<{ stopps: DispoStopp[] }>());
export const resetSelectedStopps = createAction(ActionTypes.RESET_SELECTED_STOPPS);

export type Actions =
  typeof addStopps
  | typeof removeStopps
  | typeof setTargetTour
  | typeof resetTargetTour
  | typeof stoppClicked
  | typeof resetSelectedStopps
  ;
