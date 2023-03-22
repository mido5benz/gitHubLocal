/* eslint-disable */
import {MapTourFilter} from '@models/index';
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  APPLY_MAP_FILTER = 'APPLY_MAP_FILTER',
  RESET_MAP_FILTER = 'RESET_MAP_FILTER'
}

export const applyMapFilter = createAction(ActionTypes.APPLY_MAP_FILTER, props<{ tourFilter: MapTourFilter }>());
export const resetMapFilter = createAction(ActionTypes.RESET_MAP_FILTER);

export type Actions = typeof applyMapFilter | typeof resetMapFilter;

