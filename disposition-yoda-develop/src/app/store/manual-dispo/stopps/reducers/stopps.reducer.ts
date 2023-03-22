import {Action, createReducer, on} from '@ngrx/store';
import {DispoStopp, DispoSum, Tour} from '@models/index';

import * as fromStopps from '../actions/stopps.actions';
import * as fromReschedule from '../../reschedule/actions/reschedule.actions';
import * as fromTour from '@store/manual-dispo/tour/actions/tour-list.actions';

import {isUnassignedStopp} from '@shared/utils/stopp.utils';
import {moveStoppsSuccess, moveStoppSuccess} from '@store/manual-dispo/stopps/actions/move-stopp.actions';
import {isVirtualTour} from '@shared/utils/tour.utils';

export const STOPPS_FEATURE_KEY = 'stopps';

export interface State {
  assigned: { [id: string]: DispoStopp[] };
  unassigned: DispoStopp[];
  stoppsWithoutGeoData: DispoStopp[];
}

export interface StoppsPartialState {
  readonly [STOPPS_FEATURE_KEY]: State;
}

export const initialStoppsState: State = {
  assigned: {},
  unassigned: [],
  stoppsWithoutGeoData: []
};

const stoppsReducer = createReducer(
  initialStoppsState,
  on(fromStopps.setUnassignedStopps, (state, {unassignedStopps}) => ({...state, unassigned: unassignedStopps})),
  on(fromStopps.setAssignedStopps, (state, {stopps}) => ({...state, assigned: stopps})),
  on(fromTour.fetchStoppsWithoutGeoDataRequest, (state) => ({...state, loading: true})),
  on(fromTour.fetchStoppsWithoutGeoDataSuccess, (state, {stopps}) => ({
    ...state,
    stoppsWithoutGeoData: stopps,
    loading: false,
  })),
  on(fromTour.fetchStoppsWithoutGeoDataFailure, (state, {error}) => ({...state, loading: false, error})),
  on(fromReschedule.resetSelectedStopps, (state) => {
    const unassigned: DispoStopp[] = [...state.unassigned];
    for (let i = 0; i < unassigned.length; i++) {
      unassigned[i] = {...unassigned[i], selected: false};
    }

    const assigned = {...state.assigned};
    const newAssigned = {};
    Object.keys(assigned).forEach((tourId: string) => {
      let assignedStopps: DispoStopp[] = [...assigned[tourId]];
      assignedStopps = assignedStopps.map((stopp: DispoStopp) => ({...stopp, selected: false}));
      newAssigned[tourId] = assignedStopps;
    });

    return {
      ...state,
      unassigned,
      assigned: newAssigned
    };
  }),
  on(fromReschedule.stoppClicked, (state, {stopps}) => {

    let unassigned: DispoStopp[] = [...state.unassigned];
    let assigned = {...state.assigned};

    stopps.forEach((stopp: DispoStopp) => {
      const isUnassigned = isUnassignedStopp(stopp);

      if (isUnassigned) {
        unassigned = updateUnassignedStopps(unassigned, stopp);
      } else {
        const assignedStopps: DispoStopp[] = updateAssignedStopps(assigned, stopp);
        const newAssigned = {...state.assigned};
        newAssigned[stopp.tour_id] = assignedStopps;
        assigned = newAssigned;
      }
    });

    return {
      ...state,
      assigned,
      unassigned
    };
  }),

  on(moveStoppSuccess, (state) => ({...state})),
  on(moveStoppsSuccess, (state, {affectedTours}) => {

    const assigned = {...state.assigned};
    let unassigned = [...state.unassigned];

    affectedTours.forEach((tour: Tour) => {
      const virtualTour = isVirtualTour(tour);

      // If it is a virtual tour, we have to update the unassigned tour array
      if (virtualTour) {
        unassigned = tour.dispostopps;
      } else {
        // else we just have to update the object with the key of the tour id
        const tourId = tour.tour.tour_id;

        assigned[tourId] = tour.dispostopps.map((cStopp: DispoStopp) => ({
          ...cStopp,
          tournr: tour.tour.tournr,
          sum: tour.dispostoppssum.find((sum: DispoSum) => sum.dispostopp_id === cStopp.dispostopp_id),
          selected: false
        }));
      }
    });

    return {
      ...state,
      assigned,
      unassigned
    };
  }),
);

const updateUnassignedStopps = (stopps: DispoStopp[], stopp: DispoStopp) => {
  const unassignedStopps: DispoStopp[] = [...stopps];
  return toggleStoppSelection(unassignedStopps, stopp);
};

const updateAssignedStopps = (stopps: any, stopp: DispoStopp) => {
  const assignedStopps: DispoStopp[] = [...stopps[stopp.tour_id]];
  return toggleStoppSelection(assignedStopps, stopp);
};

const toggleStoppSelection = (stopps: DispoStopp[], stopp: DispoStopp) => {
  const stoppIndex = stopps.findIndex((cStopp: DispoStopp) => cStopp.dispostopp_id === stopp.dispostopp_id);
  stopps[stoppIndex] = {...stopps[stoppIndex], selected: !stopps[stoppIndex].selected};
  return stopps;
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducer(state: State | undefined, action: Action): State {
  return stoppsReducer(state, action);
}
