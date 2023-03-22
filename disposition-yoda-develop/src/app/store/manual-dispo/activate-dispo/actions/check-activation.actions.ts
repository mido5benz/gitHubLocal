/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  CHECK_ACTIVATION_REQUEST = 'CHECK_ACTIVATION_REQUEST',
  CHECK_ACTIVATION_SUCCESS = 'CHECK_ACTIVATION_SUCCES',
  CHECK_ACTIVATION_FAILURE = 'CHECK_ACTIVATION_FAILURE',
}

export const checkActivationRequest = createAction(ActionTypes.CHECK_ACTIVATION_REQUEST);
export const checkActivationSuccess = createAction(ActionTypes.CHECK_ACTIVATION_SUCCESS, props<{ isActive: boolean }>());
export const checkActivationFailure = createAction(ActionTypes.CHECK_ACTIVATION_FAILURE, props<{ error: any }>());

export type Actions =
  typeof checkActivationRequest
  | typeof checkActivationSuccess
  | typeof checkActivationFailure;
