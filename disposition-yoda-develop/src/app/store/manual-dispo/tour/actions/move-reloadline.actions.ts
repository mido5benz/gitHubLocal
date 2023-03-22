/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  SHIFT_RELOADLINE_REQUEST = 'SHIFT_RELOADLINE_REQUEST',
  SHIFT_RELOADLINE_SUCCESS = 'SHIFT_RELOADLINE_SUCCESS',
  SHIFT_RELOADLINE_FAILURE = 'SHIFT_RELOADLINE_FAILURE'
}

export const moveReloadLineRequest = createAction('SHIFT_RELOADLINE_REQUEST', props<{ tourId: number; sollStopp: number }>());
export const moveReloadLineSuccess = createAction('SHIFT_RELOADLINE_SUCCESS');
export const moveReloadLineFailure = createAction('SHIFT_RELOADLINE_FAILURE', props<{ error: any }>());

export type Actions = typeof moveReloadLineRequest | typeof moveReloadLineSuccess | typeof moveReloadLineFailure;
