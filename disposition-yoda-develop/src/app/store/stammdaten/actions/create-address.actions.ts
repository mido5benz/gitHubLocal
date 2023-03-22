/* eslint-disable */
import {createAction, props} from '@ngrx/store';

export enum ActionTypes {
  CREATE_ADDRESS_REQUEST = 'CREATE_ADDRESS_REQUEST',
  CREATE_ADDRESS_SUCCESS = 'CREATE_ADDRESS_SUCCESS',
  CREATE_ADDRESS_FAILURE = 'CREATE_ADDRESS_FAILURE'
}

export const createAddressRequest = createAction('CREATE_ADDRESS_REQUEST');
export const createAddressSuccess = createAction('CREATE_ADDRESS_SUCCESS');
export const createAddressFailure = createAction('CREATE_ADDRESS_FAILURE', props<{ error: any }>());

export type Actions = typeof createAddressRequest | typeof createAddressSuccess | typeof createAddressFailure;
