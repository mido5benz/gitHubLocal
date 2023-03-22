/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {DispoStopp} from '@models/index';

export enum ActionTypes {
  CHANGE_STOPPORDER_REQUEST = 'CHANGE_STOPPORDER_REQUEST',
  CHANGE_STOPPORDER_SUCCESS = 'CHANGE_STOPPORDER_SUCCESS',
  CHANGE_STOPPORDER_FAILURE = 'CHANGE_STOPPORDER_FAILURE',
}

export const changeTourStoppsOrderRequest = createAction('CHANGE_STOPPORDER_REQUEST', props<{ tourId: number, stopps: DispoStopp[] }>());
export const changeTourStoppsOrderSuccess = createAction('CHANGE_STOPPORDER_SUCCESS', props<{ tourId: number; stopps: DispoStopp[] }>());
export const changeTourStoppsOrderFailure = createAction('CHANGE_STOPPORDER_FAILURE');

export type Actions = typeof changeTourStoppsOrderRequest | typeof changeTourStoppsOrderSuccess | typeof changeTourStoppsOrderFailure;
