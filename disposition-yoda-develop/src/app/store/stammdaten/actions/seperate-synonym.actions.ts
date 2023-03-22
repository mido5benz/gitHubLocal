/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {SeperateSynonymRequest} from '@models/server-request/seperate-synonym.request';

export enum ActionTypes {
  SEPERATE_SYNONYM_REQUEST = 'SEPERATE_SYNONYM_REQUEST',
  SEPERATE_SYNONYM_REQUEST_SUCCESS = 'SEPERATE_SYNONYM_REQUEST_SUCCESS',
  SEPERATE_SYNONYM_REQUEST_FAILURE = 'SEPERATE_SYNONYM_REQUEST_FAILURE'
}

export const seperateSynonymRequest = createAction('SEPERATE_SYNONYM_REQUEST', props<{ payload: SeperateSynonymRequest }>());
export const seperateSynonymSuccess = createAction('SEPERATE_SYNONYM_REQUEST_SUCCESS', props<{ zielNameId: number[] }>());
export const seperateSynonymFailure = createAction('SEPERATE_SYNONYM_REQUEST_FAILURE', props<{ error: any }>());

export type Actions = typeof seperateSynonymRequest | typeof seperateSynonymSuccess | typeof seperateSynonymFailure;
