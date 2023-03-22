/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {GeoaddressDto} from '@shared/models';

export enum ActionTypes {
  FETCH_GEOADDRESS_SUGGESTIONS_REQUEST = 'FETCH_GEOADDRESS_SUGGESTIONS_REQUEST',
  FETCH_GEOADDRESS_SUGGESTIONS_SUCCESS = 'FETCH_GEOADDRESS_SUGGESTIONS_SUCCESS',
  FETCH_GEOADDRESS_SUGGESTIONS_FAILURE = 'FETCH_GEOADDRESS_SUGGESTIONS_FAILURE',
}

export const fetchSuggestions = createAction(ActionTypes.FETCH_GEOADDRESS_SUGGESTIONS_REQUEST, props<{ address: any }>());
export const fetchSuggestionsSuccess =
  createAction(ActionTypes.FETCH_GEOADDRESS_SUGGESTIONS_SUCCESS, props<{ suggestions: GeoaddressDto[] }>());
export const fetchSuggestionsFailure = createAction(ActionTypes.FETCH_GEOADDRESS_SUGGESTIONS_FAILURE, props<{ error: any }>());

export type Actions = typeof fetchSuggestions | typeof fetchSuggestionsSuccess | typeof fetchSuggestionsFailure;
