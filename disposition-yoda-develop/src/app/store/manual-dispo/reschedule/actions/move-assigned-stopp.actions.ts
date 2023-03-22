/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {DispoStopp, MoveStoppServerResponse} from '@models/index';

export enum ActionTypes {
  MOVE_DISPOSTOPPS_TO_TOUR_REQUEST = 'MOVE_DISPOSTOPPS_TO_TOUR_REQUEST',
  MOVE_DISPOSTOPPS_TO_TOUR_SUCCESS = 'MOVE_DISPOSTOPPS_TO_TOUR_SUCCESS',
  MOVE_DISPOSTOPPS_TO_TOUR_FAILED = 'MOVE_DISPOSTOPPS_TO_TOUR_FAILED'
}

export const moveStoppsToTourRequest = createAction(
  ActionTypes.MOVE_DISPOSTOPPS_TO_TOUR_REQUEST, props<{ sourceTourId: number; tourId: number; stopps: DispoStopp[] }>());
export const moveStoppsToTourSuccess = createAction(ActionTypes.MOVE_DISPOSTOPPS_TO_TOUR_SUCCESS);
export const moveStoppsToTourFailure = createAction(ActionTypes.MOVE_DISPOSTOPPS_TO_TOUR_FAILED,
  props<{ error: any }>());

export type Actions = typeof moveStoppsToTourRequest | typeof moveStoppsToTourSuccess | typeof moveStoppsToTourFailure;
