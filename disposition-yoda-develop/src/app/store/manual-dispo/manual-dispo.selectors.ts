import {ManualDispoState, ManualDispoStoreKey} from '@store/manual-dispo/manual-dispo.state';
import {DispoStopp} from '@models/index';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {SELECTEDSTOPP_FEATURE_KEY, State as SelectedStoppState} from '@store/manual-dispo/stopps/reducers/selected-stopp.reducer';
import {MAPFILTER_FEATURE_KEY, State as MapFilterState} from '@store/manual-dispo/map/reducers/map-filter.reducer';
import {DAILY_CLOSING_FEATURE_KEY} from '@store/manual-dispo/daily-closing/reducers/daily-closing.reducer';
import {ACTIVATION_FEATURE_KEY, State as ActivationState} from '@store/manual-dispo/activate-dispo/reducers/activate-manual-dispo.reducer';
import {RELOADLINE_FEATURE_KEY, State as ReloadLineState} from '@store/manual-dispo/tour/reducers/reloadline.reducer';
import {LOCATIONS_FEATURE_KEY, State as LocationsState} from '@store/manual-dispo/locations/reducers/location.reducer';
import {RESCHEDULE_FEATURE_KEY} from '@store/manual-dispo/reschedule/reducers/reschedule.reducer';
import {State as TourlistState, TOURLIST_FEATURE_KEY} from '@store/manual-dispo/tour/reducers/tour-list.reducer';
import {CONSIGNMENT_FEATURE_KEY, State as ConsignmentState} from '@store/manual-dispo/consignments/reducers/consignment.reducer';
import {State as StoppsState, STOPPS_FEATURE_KEY} from '@store/manual-dispo/stopps/reducers/stopps.reducer';

export const selectManualDispoState = createFeatureSelector<ManualDispoState>(ManualDispoStoreKey);

/*
 * Slice selectors
 */
export const getMapFilterState = (state: ManualDispoState): MapFilterState => state[MAPFILTER_FEATURE_KEY];
export const getActivationState = (state: ManualDispoState): ActivationState => state[ACTIVATION_FEATURE_KEY];
export const getSelectedStoppState = (state: ManualDispoState): SelectedStoppState => state[SELECTEDSTOPP_FEATURE_KEY];
export const getReloadLineState = (state: ManualDispoState): ReloadLineState => state[RELOADLINE_FEATURE_KEY];
export const getLocationsState = (state: ManualDispoState): LocationsState => state[LOCATIONS_FEATURE_KEY];
export const getTourlistState = (state: ManualDispoState): TourlistState => state[TOURLIST_FEATURE_KEY];
export const getConsignmentState = (state: ManualDispoState): ConsignmentState => state[CONSIGNMENT_FEATURE_KEY];
export const getStoppsState = (state: ManualDispoState): StoppsState => state[STOPPS_FEATURE_KEY];

export const getActivationStateSelector = createSelector(selectManualDispoState,
  (state: ManualDispoState) => state[ACTIVATION_FEATURE_KEY]);

export const getSelectedStoppStateSelector = createSelector(selectManualDispoState,
  (state: ManualDispoState) => state[SELECTEDSTOPP_FEATURE_KEY]);

export const getRescheduleStateSelector = createSelector(selectManualDispoState,
  (state: ManualDispoState) => state[RESCHEDULE_FEATURE_KEY]);

export const getDailyClosingStateSelector = createSelector(selectManualDispoState,
  (state: ManualDispoState) => state[DAILY_CLOSING_FEATURE_KEY]);

export const getMapFilterStateSelector = createSelector(selectManualDispoState,
  (state: ManualDispoState) => state[MAPFILTER_FEATURE_KEY]);


export const selectSelectedStopp = (state: ManualDispoState): DispoStopp => state.selectedStopp.stopp;

export const selectTourFilter = (state: ManualDispoState): string[] => state.mapFilter.tours;
export const selectServiceFilter = (state: ManualDispoState): string[] => state.mapFilter.services;
export const selectVehicleType = (state: ManualDispoState): string => state.mapFilter.vehicleType;
export const selectSemiTrailer = (state: ManualDispoState): boolean => state.mapFilter.semiTrailer;
export const selectTruckTrailer = (state: ManualDispoState): boolean => state.mapFilter.truck;
export const selectCombineFilter = (state: ManualDispoState): boolean => state.mapFilter.combine;

export const selectedTourState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state.selectedTour
);

export const getSelectedStopp: MemoizedSelector<ManualDispoState,
  DispoStopp> = createSelector(selectManualDispoState, selectSelectedStopp);

