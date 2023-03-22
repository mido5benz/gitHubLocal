import {Action, createReducer, on} from '@ngrx/store';
import * as fromSetSelectedTour from '../actions/selected-tour.actions';
import {DispoStopp, DispoSum} from '@models/index';

import * as StoppOrderChangeActions from '@store/manual-dispo/tour/actions/change-stopps-order.actions';

export const SELECTEDTOUR_FEATURE_KEY = 'selectedTour';

export interface State {
  id: number;
  nr: string;
  duration: number;
  reloadEditable: boolean;
  stopps: DispoStopp[];
  stoppsWithReloadItem: DispoStopp[];
  tourSums: any;
  stoppSums: { [p: string]: DispoSum };
  frozen: boolean;
  loading: boolean;
  ausliefertag: string;
  reloadLineIndex: number;
  kennzeichenpflichtig: boolean;
  abgefertigt: boolean;
  potentiell_gleiche_ziele: boolean;
}

export interface SelectedPartialState {
  readonly [SELECTEDTOUR_FEATURE_KEY]: State;
}

export const initialSelectedTourState: State = {
  id: 0,
  nr: '',
  duration: 0,
  reloadEditable: false,
  stopps: [],
  stoppsWithReloadItem: [],
  tourSums: {},
  stoppSums: {},
  loading: false,
  frozen: false,
  ausliefertag: '',
  reloadLineIndex: 0,
  kennzeichenpflichtig: false,
  abgefertigt: false,
  potentiell_gleiche_ziele: false
};

const selectedTourReducer = createReducer(initialSelectedTourState,
  on(fromSetSelectedTour.setSelectedTourId, (state, {id}) => ({...state, id, loading: true})),
  on(fromSetSelectedTour.loadedTourDataSuccess, (state,
                                                 {
                                                   stoppsWithReloadItem,
                                                   reloadEditable,
                                                   nr,
                                                   duration,
                                                   reloadLineIndex,
                                                   stopps,
                                                   tourSums,
                                                   stoppSums,
                                                   ausliefertag,
                                                   frozen,
                                                   kennzeichenpflichtig,
                                                   abgefertigt,
                                                   potentiell_gleiche_ziele,
                                                 }) => ({
    ...state,
    stoppsWithReloadItem,
    reloadEditable,
    nr,
    duration,
    reloadLineIndex,
    tourSums,
    stoppSums,
    frozen,
    stopps,
    ausliefertag,
    kennzeichenpflichtig,
    abgefertigt,
    potentiell_gleiche_ziele,
    loading: false
  })),
  on(fromSetSelectedTour.loadedTourDataFailure, (state, {error}) => ({...state, loading: false, error})),
  on(StoppOrderChangeActions.changeTourStoppsOrderRequest, (state) => ({...state, loading: true})),
  on(StoppOrderChangeActions.changeTourStoppsOrderSuccess, (state, {stopps}) => ({
    ...state,
    stopps,
    loading: false,
  })),
  on(StoppOrderChangeActions.changeTourStoppsOrderFailure, (state) => ({...state, loading: false})),
  )
;

export const reducer = (state: State | undefined, action: Action): State => selectedTourReducer(state, action);
