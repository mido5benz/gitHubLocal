/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  ACTIVATE_DISPO_REQUEST = 'ACTIVATE_MANUAL_DISPO_REQUEST',
  ACTIVATE_DISPO_SUCCESS = 'ACTIVATE_MANUAL_DISPO_SUCCESS',
  ACTIVATE_DISPO_FAILURE = 'ACTIVATE_MANUAL_DISPO_FAILURE',
}

export const activateManualDispoRequest = createAction(ActionTypes.ACTIVATE_DISPO_REQUEST);
export const activateManualDispoSuccess = createAction(ActionTypes.ACTIVATE_DISPO_SUCCESS);
export const activateManualDispoFailed = createAction(ActionTypes.ACTIVATE_DISPO_FAILURE, props<{ error: any }>());

export type Actions =
  | typeof activateManualDispoRequest
  | typeof activateManualDispoSuccess
  | typeof activateManualDispoFailed;
