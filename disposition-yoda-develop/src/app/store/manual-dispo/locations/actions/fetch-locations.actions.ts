/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {Location} from '@models/location/location.model';

export enum ActionTypes {
  FETCH_LOCATIONS_START = 'FETCH_LOCATIONS_START',
  FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS',
  FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE'
}

export const fetchLocationsStart = createAction(ActionTypes.FETCH_LOCATIONS_START);
export const fetchLocationsSuccess = createAction(ActionTypes.FETCH_LOCATIONS_SUCCESS, props<{ locations: Location[] }>());
export const fetchLocationsFailure = createAction(ActionTypes.FETCH_LOCATIONS_FAILURE);

export type Actions = typeof fetchLocationsStart | typeof fetchLocationsSuccess | typeof fetchLocationsFailure;
