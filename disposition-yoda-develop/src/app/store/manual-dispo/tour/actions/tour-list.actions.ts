import {DispoStopp} from '@models/index';
import {createAction, props} from '@ngrx/store';

export const fetchStoppsWithoutGeoDataRequest =
  createAction('FETCH_STOPPS_WITHOUT_GEODATA_REQUEST');
export const fetchStoppsWithoutGeoDataSuccess =
  createAction('FETCH_STOPPS_WITHOUT_GEODATA_SUCCESS', props<{ stopps: DispoStopp[] }>());
export const fetchStoppsWithoutGeoDataFailure =
  createAction('FETCH_STOPPS_WITHOUT_GEODATA_FAILURE', props<{ error: any }>());
