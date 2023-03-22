/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  ADDRESS_EDITING_FINISHED = 'ADDRESS_EDITING_FINISHED'
}

export const addressEditFinished = createAction(ActionTypes.ADDRESS_EDITING_FINISHED, props<{ geoadresseFehlerId: number }>());

export type Actions = typeof addressEditFinished;


