import {DispoStopp, MoveStoppServerResponse, Tour} from '@models/index';
import {createAction, props} from '@ngrx/store';

export const moveStoppsRequest = createAction('MOVE_DISPOSTOPPS_REQUEST');
export const moveStoppsSuccess = createAction('MOVE_DISPOSTOPPS_SUCCESS', props<{ fromTour?: number; affectedTours: Tour[] }>());
export const moveStoppsFailure = createAction('MOVE_DISPOSTOPPS_FAILED', props<{ error: any }>());

export const moveStoppRequest = createAction('MOVE_DISPOSTOPP_REQUEST', props<{ tourId: number; stopp: DispoStopp[] }>());
export const moveStoppSuccess = createAction('MOVE_DISPOSTOPP_SUCCESS');
export const moveStoppFailure = createAction('MOVE_DISPOSTOPP_FAILED', props<{ error: any }>());

