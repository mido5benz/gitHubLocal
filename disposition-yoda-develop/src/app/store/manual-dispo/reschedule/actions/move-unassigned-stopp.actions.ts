/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {DispoStopp, MoveStoppServerResponse} from '@models/index';

export enum ActionTypes {
  MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_REQUEST = 'MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_REQUEST',
  MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_SUCCESS = 'MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_SUCCESS',
  MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_FAILED = 'MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_FAILED'
}

export const moveUnassignedStoppsRequest = createAction(
  ActionTypes.MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_REQUEST, props<{ tourId: number; stopps: DispoStopp[] }>());
export const moveUnassignedStoppsSuccess = createAction(ActionTypes.MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_SUCCESS);
export const moveUnassignedStoppsFailure = createAction(ActionTypes.MOVE_UNASSIGNED_DISPOSTOPPS_TO_TOUR_FAILED,
  props<{ error: any }>());

export type Actions = typeof moveUnassignedStoppsRequest | typeof moveUnassignedStoppsSuccess | typeof moveUnassignedStoppsFailure;
