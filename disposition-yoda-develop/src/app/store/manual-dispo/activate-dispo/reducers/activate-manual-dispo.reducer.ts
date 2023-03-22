import {Action, createReducer, on} from '@ngrx/store';

import {activateManualDispoFailed, activateManualDispoRequest, activateManualDispoSuccess} from '../actions/activate-dispo.actions';
import {
  checkActivationFailure,
  checkActivationRequest,
  checkActivationSuccess
} from '@store/manual-dispo/activate-dispo/actions/check-activation.actions';

export const ACTIVATION_FEATURE_KEY = 'activation';

export interface State {
  loading: boolean;
  isActive: boolean;
  lastChecked?: string;
}

export interface ActivationPartialState {
  readonly [ACTIVATION_FEATURE_KEY]: State;
}

export const initialActivationState: State = {
  loading: false,
  isActive: false
};

const activationReducer = createReducer(
  initialActivationState,
  on(activateManualDispoRequest, (state) => ({...state, loading: true})),
  on(activateManualDispoSuccess, (state) => ({...state, loading: false, isActive: true})),
  on(activateManualDispoFailed, (state) => ({...state, loading: false})),
  on(checkActivationRequest, (state) => ({...state, loading: true})),
  on(checkActivationSuccess, (state, {isActive}) => ({...state, loading: false, isActive, lastChecked: new Date().toUTCString()})),
  on(checkActivationFailure, (state) => ({...state, isActive: false, loading: false})),
  )
;

export const reducer = (state: State | undefined, action: Action): State => activationReducer(state, action);
