/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  CANCEL_TOUR_FREEZE_REQUEST = 'CANCEL_TOUR_FREEZE_REQUEST',
  CANCEL_TOUR_FREEZE_SUCCESS = 'CANCEL_TOUR_FREEZE_SUCCESS',
  CANCEL_TOUR_FREEZE_FAILURE = 'CANCEL_TOUR_FREEZE_FAILURE'
}

export const stornoFreezeTourRequest = createAction(ActionTypes.CANCEL_TOUR_FREEZE_REQUEST, props<{ tourId: number }>());
export const stornoFreezeTourSuccess = createAction(ActionTypes.CANCEL_TOUR_FREEZE_SUCCESS);
export const stornoFreezeTourFailure = createAction(ActionTypes.CANCEL_TOUR_FREEZE_FAILURE, props<{ error: any }>());

export type Actions = typeof stornoFreezeTourRequest | typeof stornoFreezeTourSuccess | typeof stornoFreezeTourFailure;
