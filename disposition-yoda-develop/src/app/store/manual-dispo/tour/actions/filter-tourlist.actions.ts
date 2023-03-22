/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {Tour} from '@shared/models';

export enum ActionTypes {
  SET_TOURLIST_FILTER = 'SET_TOURLIST_FILTER',
  RESET_TOURLIST_FILTER = 'RESET_TOURLIST_FILTER'
}

export const setFilteredTourList = createAction(ActionTypes.SET_TOURLIST_FILTER, props<{ filteredTours: Tour[] }>());
export const resetFilter = createAction(ActionTypes.RESET_TOURLIST_FILTER);


export type Actions = typeof setFilteredTourList | typeof resetFilter;
