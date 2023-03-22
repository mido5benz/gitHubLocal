/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  DELETE_RELOADLINE_REQUEST = 'DELETE_RELOADLINE_REQUEST',
  DELETE_RELOADLINE_SUCCESS = 'DELETE_RELOADLINE_SUCCESS',
  DELETE_RELOADLINE_FAILURE = 'DELETE_RELOADLINE_FAILURE'
}

export const deleteReloadLineRequest = createAction(ActionTypes.DELETE_RELOADLINE_REQUEST, props<{ tourId: number }>());
export const deleteReloadLineSuccess = createAction(ActionTypes.DELETE_RELOADLINE_SUCCESS);
export const deleteReloadLineFailure = createAction(ActionTypes.DELETE_RELOADLINE_FAILURE, props<{ error: any }>());

export type Actions = typeof deleteReloadLineRequest | typeof deleteReloadLineSuccess | typeof deleteReloadLineFailure;
