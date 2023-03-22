/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  FETCH_SYNONYM_REQUEST = 'FETCH_SYNONYM_REQUEST',
  FETCH_SYNONYM_REQUEST_SUCCESS = 'FETCH_SYNONYM_REQUEST_SUCCESS',
  FETCH_SYNONYM_REQUEST_FAILURE = 'FETCH_SYNONYM_REQUEST_FAILURE'
}

export const fetchSynonymsRequest = createAction(ActionTypes.FETCH_SYNONYM_REQUEST, props<{ zielNameId: number }>());
export const fetchSynonymSuccess = createAction(ActionTypes.FETCH_SYNONYM_REQUEST_SUCCESS, props<{ synonyms: any }>());
export const fetchSynonymFailure = createAction(ActionTypes.FETCH_SYNONYM_REQUEST_FAILURE, props<{ error: any }>());

export type Actions = typeof fetchSynonymsRequest | typeof fetchSynonymSuccess | typeof fetchSynonymFailure;
