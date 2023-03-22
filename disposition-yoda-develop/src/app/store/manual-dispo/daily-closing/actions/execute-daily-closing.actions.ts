/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  EXECUTE_DAILY_CLOSING_REQUEST = 'EXECUTE_DAILY_CLOSING_REQUEST',
  EXECUTE_DAILY_CLOSING_SUCCESS = 'EXECUTE_DAILY_CLOSING_SUCCESS',
  EXECUTE_DAILY_CLOSING_FAILURE = 'EXECUTE_DAILY_CLOSING_FAILURE',
}

export const executeDailyClosingRequest = createAction(ActionTypes.EXECUTE_DAILY_CLOSING_REQUEST);
export const executeDailyClosingSuccess = createAction(ActionTypes.EXECUTE_DAILY_CLOSING_SUCCESS);
export const executeDailyClosingFailure = createAction(ActionTypes.EXECUTE_DAILY_CLOSING_FAILURE, props<{ error }>());

export type Actions =
  typeof executeDailyClosingRequest |
  typeof executeDailyClosingSuccess |
  typeof executeDailyClosingFailure;
