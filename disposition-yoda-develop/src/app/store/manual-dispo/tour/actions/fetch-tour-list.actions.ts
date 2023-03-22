/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {Tour} from '@shared/models';

export enum ActionTypes {
  FETCH_TOURLIST_START = 'FETCH_TOURLIST_START',
  FETCH_TOURLIST_REQUEST = 'FETCH_TOURLIST_REQUEST',
  FETCH_TOURLIST_SUCCESS = 'FETCH_TOURLIST_SUCCESS',
  FETCH_TOURLIST_FAILURE = 'FETCH_TOURLIST_FAILURE'
}

export const fetchTourlistStart = createAction(ActionTypes.FETCH_TOURLIST_START);
export const fetchTourListRequest = createAction(ActionTypes.FETCH_TOURLIST_REQUEST);
export const fetchTourListSuccess = createAction(ActionTypes.FETCH_TOURLIST_SUCCESS, props<{ allTours: Tour[]; tour9999?: Tour }>());
export const fetchTourListFailure = createAction(ActionTypes.FETCH_TOURLIST_FAILURE, props<{ error: any }>());

export type Actions = typeof fetchTourlistStart | typeof fetchTourListRequest | typeof fetchTourListSuccess | typeof fetchTourListFailure;
