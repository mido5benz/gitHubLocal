import {RASTER_FEATURE_KEY, RasterPartialState, State} from '@store/strategic-dispo/reducers/raster.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const getRasterDetailState = createFeatureSelector<RasterPartialState, State>(
  RASTER_FEATURE_KEY
);

export const getError = createSelector(getRasterDetailState, (state: State) => state.error);
export const getLoading = createSelector(getRasterDetailState, (state: State) => state.loading);

// Raster detail for each layer
export const getSattelRasterDetails = createSelector(getRasterDetailState, (state: State) => state.sattel);
export const getLKWRasterDetails = createSelector(getRasterDetailState, (state: State) => state.lkw);
export const getExpressRasterDetails = createSelector(getRasterDetailState, (state: State) => state.express);
export const getNormalRasterDetails = createSelector(getRasterDetailState, (state: State) => state.normal);
