import {createSelector, MemoizedSelector} from '@ngrx/store';
import {
  selectCombineFilter,
  selectManualDispoState,
  selectSemiTrailer,
  selectServiceFilter,
  selectTourFilter,
  selectTruckTrailer,
  selectVehicleType
} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';

export const getTourFilter: MemoizedSelector<ManualDispoState,
  string[]> = createSelector(selectManualDispoState, selectTourFilter);

export const getServiceFilter: MemoizedSelector<ManualDispoState,
  string[]> = createSelector(selectManualDispoState, selectServiceFilter);

export const getVehicleTypeFilter: MemoizedSelector<ManualDispoState,
  string> = createSelector(selectManualDispoState, selectVehicleType);

export const getSemiTrailerFilter: MemoizedSelector<ManualDispoState,
  boolean> = createSelector(selectManualDispoState, selectSemiTrailer);

export const getTruckFilter: MemoizedSelector<ManualDispoState,
  boolean> = createSelector(selectManualDispoState, selectTruckTrailer);

export const getCombineFilter: MemoizedSelector<ManualDispoState,
  boolean> = createSelector(selectManualDispoState, selectCombineFilter);

export const getCombinedFilters = createSelector(
  getTourFilter,
  getServiceFilter,
  getVehicleTypeFilter,
  getSemiTrailerFilter,
  getTruckFilter,
  getCombineFilter,
  (
    tourFilter: any,
    serviceFilter: any,
    vehicleClassFilter: any,
    semiTrailerFilter: any,
    truckFilter: any,
    combine: any
  ) => ({
    tourFilter,
    serviceFilter,
    vehicleClassFilter,
    semiTrailerFilter,
    truckFilter,
    combine
  })
);
