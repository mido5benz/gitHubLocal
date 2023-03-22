/* eslint-disable */
import {createAction, props} from '@ngrx/store';
import {DispoStopp} from '@models/index';

export enum ActionTypes {
  SET_UNASSIGNED_STOPPS = 'SET_UNASSIGNED_STOPPS',
  SET_ASSIGNED_STOPPS = 'SET_ASSIGNED_STOPPS'
}

export const setUnassignedStopps = createAction(ActionTypes.SET_UNASSIGNED_STOPPS, props<{ unassignedStopps: DispoStopp[] }>());
export const setAssignedStopps = createAction(ActionTypes.SET_ASSIGNED_STOPPS, props<{ stopps: { [id: string]: DispoStopp[] } }>());

export type Actions = typeof setUnassignedStopps | typeof setAssignedStopps;
