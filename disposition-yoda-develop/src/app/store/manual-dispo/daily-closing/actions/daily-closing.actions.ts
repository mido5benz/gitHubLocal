import {createAction, props} from '@ngrx/store';

export const APPLY_MAP_FILTER = '[Map filter] Apply filter';




export const fetchOffeneTourenRequest = createAction('[Tagesabschluss] Fetch offene touren request');
export const fetchOffeneTourenSuccess = createAction('[Tagesabschluss] Fetch offene touren success', props<{ offeneTouren: any }>());
export const fetchOffeneTourenFailure = createAction('[Tagesabschluss] Fetch offene touren failure', props<{ error }>());
