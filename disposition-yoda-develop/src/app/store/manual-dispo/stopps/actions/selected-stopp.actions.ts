/* eslint-disable */
import {DispoStopp} from '@models/index';
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  SELECT_STOPP = 'SELECT_STOPP',
  DESELECT_STOPP = 'DESELECT_STOPP'
}

export const selectStopp = createAction(ActionTypes.SELECT_STOPP, props<{ stopp: DispoStopp }>());
export const deselectStopp = createAction(ActionTypes.DESELECT_STOPP);

export type Actions = typeof selectStopp | typeof deselectStopp;
