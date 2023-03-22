/* eslint-disable */
import {DispoStopp, DispoSum, TourSum} from '@models/tour/tour.model';
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  SET_SELECTED_TOUR_ID = 'SET_SELECTED_TOUR_ID',
  LOAD_SELECTED_TOUR_DATA_SUCCESS = 'LOAD_SELECTED_TOUR_DATA_SUCCESS',
  LOAD_SELECTED_TOUR_DATA_FAILURE = 'LOAD_SELECTED_TOUR_DATA_FAILURE',
}

export const setSelectedTourId = createAction('SET_SELECTED_TOUR_ID', props<{ id: number }>());
export const loadedTourDataSuccess = createAction('LOAD_SELECTED_TOUR_DATA_SUCCESS', props<{
  nr: string;
  duration: number;
  reloadLineIndex: number;
  reloadEditable: boolean;
  tourSums: TourSum;
  stoppSums: { [p: string]: DispoSum };
  stopps: DispoStopp[];
  stoppsWithReloadItem: DispoStopp[];
  ausliefertag: string;
  frozen: boolean;
  kennzeichenpflichtig: boolean;
  abgefertigt: boolean;
  potentiell_gleiche_ziele: boolean;
}>());
export const loadedTourDataFailure = createAction('LOAD_SELECTED_TOUR_DATA_FAILURE', props<{ error: any }>());

export type Actions = typeof setSelectedTourId | typeof loadedTourDataSuccess | typeof loadedTourDataFailure;
