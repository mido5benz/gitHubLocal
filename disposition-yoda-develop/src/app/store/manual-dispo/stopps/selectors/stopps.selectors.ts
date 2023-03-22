import {createSelector} from '@ngrx/store';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';
import {STOPPS_FEATURE_KEY} from '@store/manual-dispo/stopps/reducers/stopps.reducer';
import {DispoStopp} from '@shared/models';

export const getStoppsState = createSelector(selectManualDispoState, (state: ManualDispoState) => state[STOPPS_FEATURE_KEY]);
export const getUnassignedStopps = createSelector(getStoppsState, (state) => state.unassigned);
export const getUnassignedStoppsCount = createSelector(getStoppsState, (state) => state.unassigned.length);
export const getAssignedStopps = createSelector(getStoppsState, (state) => state.assigned);

export const getSelectedUnassignedStopps = createSelector(getAssignedStopps, (tours) => {
  const currentStopps = Object.values(tours).flat();
  return currentStopps.filter((stopp: DispoStopp) => stopp.selected);
});
export const getSelectedAssignedStopps = createSelector(getUnassignedStopps, (stopps) =>
  stopps.filter((stopp: DispoStopp) => stopp.selected));

export const getTotalSelectedStopps =
  createSelector(getSelectedUnassignedStopps, getSelectedAssignedStopps,
    (unassignedSelectedStopps, assignedSelectedStopps) => unassignedSelectedStopps.concat(assignedSelectedStopps));

export const getSelectedUnassignedStoppsCount = createSelector(getAssignedStopps, (tours) => {
  const currentStopps = Object.values(tours).flat();
  return currentStopps.filter((stopp: DispoStopp) => stopp.selected).length;
});
export const getSelectedAssignedStoppsCount = createSelector(getUnassignedStopps, (stopps) =>
  stopps.filter((stopp: DispoStopp) => stopp.selected).length);

export const getTotalSelectedStoppsCount =
  createSelector(getSelectedUnassignedStoppsCount, getSelectedAssignedStoppsCount,
    (unassignedSelectedStoppCount, assignedSelectedStoppCount) => unassignedSelectedStoppCount + assignedSelectedStoppCount);
