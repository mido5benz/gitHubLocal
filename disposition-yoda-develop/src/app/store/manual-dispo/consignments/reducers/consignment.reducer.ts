import {Action, createReducer, on} from '@ngrx/store';
import {Consignment} from '@models/index';
import {
  moveConsignmentsFailure,
  moveConsignmentsRequest,
  moveConsignmentsSuccess
} from '@store/manual-dispo/consignments/actions/move-consignment.actions';
import {fetchConsignmentsFailure, fetchConsignmentsRequest, fetchConsignmentsSuccess} from '../actions/fetch-consignments.actions';

export const CONSIGNMENT_FEATURE_KEY = 'consignments';

export interface State {
  loading: boolean;
  consignments: Consignment[];
  error?: any;
}

export interface ConsignmentPartialState {
  readonly [CONSIGNMENT_FEATURE_KEY]: State;
}

export const initialSendungsDispoState: State = {
  loading: false,
  consignments: []
};

const sendungenReducer = createReducer(
  initialSendungsDispoState,
  on(moveConsignmentsRequest, (state: State) => ({...state, loading: true})),
  on(moveConsignmentsSuccess, (state: State) => ({...state, loading: false})),
  on(moveConsignmentsFailure, (state: State, {error}) => ({...state, loading: false, error})),
  on(fetchConsignmentsRequest, (state: State) => ({...state, loading: true})),
  on(fetchConsignmentsSuccess, (state: State, {consignments}) => ({...state, loading: false, consignments})),
  on(fetchConsignmentsFailure, (state: State, {error}) => ({...state, loading: false, error})),
);

export const reducer = (state: State | undefined, action: Action): State => sendungenReducer(state, action);
