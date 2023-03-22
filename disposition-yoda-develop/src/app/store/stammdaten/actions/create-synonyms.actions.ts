/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {Address} from '@shared/models';

export enum ActionTypes {
  CREATE_SYNONYM_REQUEST = 'CREATE_SYNONYM_REQUEST',
  CREATE_SYNONYM_REQUEST_SUCCESS = 'CREATE_SYNONYM_REQUEST_SUCCESS',
  CREATE_SYNONYM_REQUEST_FAILURE = 'CREATE_SYNONYM_REQUEST_FAILURE'
}

export const createSynonymRequest = createAction('CREATE_SYNONYM_REQUEST', props<{ synonym: Address }>());
export const createSynonymSuccess = createAction('CREATE_SYNONYM_REQUEST_SUCCESS', props<{ geoadresseFehlerId: number }>());
export const createSynonymFailure = createAction('CREATE_SYNONYM_REQUEST_FAILURE', props<{ error: any }>());

export type Actions = typeof createSynonymRequest | typeof createSynonymSuccess | typeof createSynonymFailure;
