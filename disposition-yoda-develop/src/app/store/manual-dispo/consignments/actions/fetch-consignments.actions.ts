/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {Consignment} from '@models/index';

export enum ActionTypes {
  FETCH_CONSIGNMENT_REQUEST = 'FETCH_CONSIGNMENT_REQUEST',
  FETCH_CONSIGNMENT_SUCCESS = 'FETCH_CONSIGNMENT_SUCCESS',
  FETCH_CONSIGNMENT_FAILURE = 'FETCH_CONSIGNMENT_FAILURE',
}

export const fetchConsignmentsRequest = createAction(ActionTypes.FETCH_CONSIGNMENT_REQUEST, props<{ tourId: number; stoppId: number }>());
export const fetchConsignmentsSuccess = createAction(ActionTypes.FETCH_CONSIGNMENT_SUCCESS, props<{ consignments: Consignment[] }>());
export const fetchConsignmentsFailure = createAction(ActionTypes.FETCH_CONSIGNMENT_FAILURE, props<{ error: any }>());

export type Actions =
  | typeof fetchConsignmentsRequest
  | typeof fetchConsignmentsSuccess
  | typeof fetchConsignmentsFailure;
