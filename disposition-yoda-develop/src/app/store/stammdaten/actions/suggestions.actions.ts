/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  SAVE_SYNONYM_REQUEST = 'SAVE_SYNONYM_REQUEST',
  SAVE_SYNONYM_SUCCESS = 'SAVE_SYNONYM_SUCCESS',
  SAVE_SYNONYM_FAILURE = 'SAVE_SYNONYM_FAILURE',
}

export const saveSynonymRequest = createAction('SAVE_SYNONYM_REQUEST', props<{ address: any }>());
export const saveSynonymSuccess = createAction('SAVE_SYNONYM_SUCCESS', props<{ address: any }>());
export const saveSynonymFailure = createAction('SAVE_SYNONYM_FAILURE', props<{ address: any }>());

export type Actions = typeof saveSynonymRequest | typeof saveSynonymSuccess | typeof saveSynonymFailure;

