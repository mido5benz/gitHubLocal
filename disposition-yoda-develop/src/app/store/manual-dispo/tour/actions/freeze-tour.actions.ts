/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  FREEZE_TOUR_REQUEST = 'FREEZE_TOUR_REQUEST',
  FREEZE_TOUR_SUCCESS = 'FREEZE_TOUR_SUCCESS',
  FREEZE_TOUR_FAILURE = 'FREEZE_TOUR_FAILURE'
}

export const freezeTourRequest = createAction('FREEZE_TOUR_REQUEST', props<{ tourId: number }>());
export const freezeTourSuccess = createAction('FREEZE_TOUR_SUCCESS');
export const freezeTourFailure = createAction('FREEZE_TOUR_FAILURE', props<{ error: any }>());

export type Actions = typeof freezeTourRequest | typeof freezeTourSuccess | typeof freezeTourFailure;



