/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {Consignment} from '@models/index';

export enum ActionTypes {
  MOVE_CONSIGNMENTS_REQUEST = 'MOVE_CONSIGNMENTS_REQUEST',
  MOVE_CONSIGNMENTS_SUCCESS = 'MOVE_CONSIGNMENTS_SUCCESS',
  MOVE_CONSIGNMENTS_FAILED = 'MOVE_CONSIGNMENTS_FAILED',
}

export const moveConsignmentsRequest = createAction(ActionTypes.MOVE_CONSIGNMENTS_REQUEST
  , props<{ sourceTourId: number; sourceStoppId: number; consignments: Consignment[]; targetTourId: number }>());
export const moveConsignmentsSuccess = createAction(ActionTypes.MOVE_CONSIGNMENTS_SUCCESS);
export const moveConsignmentsFailure = createAction(ActionTypes.MOVE_CONSIGNMENTS_FAILED, props<{ error: any }>());

export type Actions =
  typeof moveConsignmentsRequest
  | typeof moveConsignmentsSuccess
  | typeof moveConsignmentsFailure;
