/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {Address} from '@shared/models';

export enum ActionTypes {
  FETCH_UNASSIGNED_ADDRESSES_REQUEST = 'FETCH_UNASSIGNED_ADDRESSES_REQUEST',
  FETCH_UNASSIGNED_ADDRESSES_SUCCESS = 'FETCH_UNASSIGNED_ADDRESSES_SUCCESS',
  FETCH_UNASSIGNED_ADDRESSES_FAILURE = 'FETCH_UNASSIGNED_ADDRESSES_FAILURE',

FETCH_UNASSIGNED_ADDRESSES_COUNT_REQUEST = 'FETCH_UNASSIGNED_ADDRESSES_COUNT_REQUEST',
  FETCH_UNASSIGNED_ADDRESSES_COUNT_SUCCESS = 'FETCH_UNASSIGNED_ADDRESSES_COUNT_SUCCESS',
  FETCH_UNASSIGNED_ADDRESSES_COUNT_FAILURE = 'FETCH_UNASSIGNED_ADDRESSES_COUNT_FAILURE',

  FETCH_ARCHIVED_ADDRESSES_COUNT_REQUEST = 'FETCH_ARCHIVED_ADDRESSES_COUNT_REQUEST',
  FETCH_ARCHIVED_ADDRESSES_COUNT_SUCCESS = 'FETCH_ARCHIVED_ADDRESSES_COUNT_SUCCESS',
  FETCH_ARCHIVED_ADDRESSES_COUNT_FAILURE = 'FETCH_ARCHIVED_ADDRESSES_COUNT_FAILURE'
}

export const fetchUnassignedAddressesRequest =
  createAction(ActionTypes.FETCH_UNASSIGNED_ADDRESSES_REQUEST, props<{ days: number; records: number }>());
export const fetchUnassignedAddressesSuccess = createAction(ActionTypes.FETCH_UNASSIGNED_ADDRESSES_SUCCESS, props<{ addresses: Address[] }>());
export const fetchUnassignedAddressesFailure = createAction(ActionTypes.FETCH_UNASSIGNED_ADDRESSES_FAILURE, props<{ error: any }>());

export const fetchUnassignedAddressesCountRequest = createAction(ActionTypes.FETCH_UNASSIGNED_ADDRESSES_COUNT_REQUEST);
export const fetchUnassignedAddressesCountSuccess = createAction(ActionTypes.FETCH_UNASSIGNED_ADDRESSES_COUNT_SUCCESS, props<{ count: number }>());
export const fetchUnassignedAddressesCountFailure = createAction(ActionTypes.FETCH_UNASSIGNED_ADDRESSES_COUNT_FAILURE, props<{ error: any }>());

export const fetchArchivedAddressesCountRequest = createAction(ActionTypes.FETCH_ARCHIVED_ADDRESSES_COUNT_REQUEST);
export const fetchArchivedAddressesCountSuccess = createAction(ActionTypes.FETCH_ARCHIVED_ADDRESSES_COUNT_SUCCESS, props<{ count: number }>());
export const fetchArchivedAddressesCountFailure = createAction(ActionTypes.FETCH_ARCHIVED_ADDRESSES_COUNT_FAILURE, props<{ error: any }>());

export type Actions =
  typeof fetchUnassignedAddressesRequest
  | typeof fetchUnassignedAddressesSuccess
  | typeof fetchUnassignedAddressesFailure
  | typeof fetchUnassignedAddressesCountRequest
  | typeof fetchUnassignedAddressesCountSuccess
  | typeof fetchUnassignedAddressesCountFailure
  | typeof fetchArchivedAddressesCountRequest
  | typeof fetchArchivedAddressesCountSuccess
  | typeof fetchArchivedAddressesCountFailure;
