/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {AvailableTour} from '@shared/models';

export enum ActionTypes {
  FETCH_AVAILABLE_TOURS_REQUEST = 'FETCH_AVAILABLE_TOURS_REQUEST',
  FETCH_AVAILABLE_TOURS_SUCCESS = 'FETCH_AVAILABLE_TOURS_SUCCESS',
  FETCH_AVAILABLE_TOURS_FAILURE = 'FETCH_AVAILABLE_TOURS_FAILURE'
}

export const fetchAvailableToursRequest = createAction('FETCH_AVAILABLE_TOURS_REQUEST');
export const fetchAvailableToursSuccess = createAction('FETCH_AVAILABLE_TOURS_SUCCESS', props<{ completeTourList: AvailableTour[] }>());
export const fetchAvailableToursFailure = createAction('FETCH_AVAILABLE_TOURS_FAILURE', props<{ error: any }>());

export type Actions = typeof fetchAvailableToursRequest | typeof fetchAvailableToursSuccess | typeof fetchAvailableToursFailure;
