import {Action, createReducer, on} from '@ngrx/store';

import * as UmdispoActions from '../actions/reschedule.actions';
import {
  moveStoppFailure,
  moveStoppRequest,
  moveStoppsFailure,
  moveStoppsRequest,
  moveStoppsSuccess,
  moveStoppSuccess
} from '../../stopps/actions/move-stopp.actions';

import {DispoStopp, Tour} from '@models/index';
import {
  moveStoppsToTourFailure,
  moveStoppsToTourRequest,
  moveStoppsToTourSuccess
} from '@store/manual-dispo/reschedule/actions/move-assigned-stopp.actions';

export const RESCHEDULE_FEATURE_KEY = 'reschedule';

export interface State {
  loading: boolean;
  stoppList: DispoStopp[];
  targetTour: Tour;
  error?: any;
  targetTourString: string
}

export interface ReschedulePartialState {
  readonly [RESCHEDULE_FEATURE_KEY]: State;
}

export const initialRescheduleState: State = {
  loading: false,
  stoppList: [],
  targetTour: null,
  targetTourString: null
};

const rescheduleReducer = createReducer(
  initialRescheduleState,
  on(moveStoppsRequest, (state) => ({...state, loading: true})),
  on(moveStoppsSuccess, (state) => ({...state, loading: false})),
  on(moveStoppsFailure, (state) => ({...state, loading: false})),
  on(moveStoppRequest, (state) => ({...state, loading: true})),
  on(moveStoppSuccess, (state) => ({...state, loading: false})),
  on(moveStoppFailure, (state) => ({...state, loading: false})),
  on(moveStoppsToTourRequest, (state) => ({...state, loading: true})),
  on(moveStoppsToTourSuccess, (state) => ({...state, loading: false})),
  on(moveStoppsToTourFailure, (state, {error}) => ({...state, loading: false, error})),
  on(UmdispoActions.setTargetTour, (state, {tour}) => ({...state, targetTour: tour})),
  on(UmdispoActions.setTargetTourString, (state, {tournr}) => ({...state, targetTourString: tournr})),
  on(UmdispoActions.resetTargetTour, (state) => ({...state, loading: false, targetTour: null})),
  )
;

export const reducer = (state: State | undefined, action: Action): State => rescheduleReducer(state, action);
