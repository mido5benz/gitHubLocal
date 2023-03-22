/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  CHECK_DAILY_CLOSING_REQUEST = 'CHECK_DAILY_CLOSING_REQUEST',
  CHECK_DAILY_CLOSING_SUCCESS = 'CHECK_DAILY_CLOSING_SUCCESS',
  CHECK_DAILY_CLOSING_FAILURE = 'CHECK_DAILY_CLOSING_FAILURE',
}

export const checkDailyClosingRequest = createAction('CHECK_DAILY_CLOSING_REQUEST');
export const checkDailyClosingSuccess = createAction('CHECK_DAILY_CLOSING_SUCCESS');
export const checkDailyClosingFailure = createAction('CHECK_DAILY_CLOSING_FAILURE', props<{ error }>());

export type Actions =
  typeof checkDailyClosingRequest |
  typeof checkDailyClosingSuccess |
  typeof checkDailyClosingFailure;
