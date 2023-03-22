import {Action, createReducer, on} from '@ngrx/store';
import {RasterDetails} from '@models/strategic-dispo/raster.model';

import * as FetchRasterActions from '../actions/raster.actions';

export const RASTER_FEATURE_KEY = 'raster';

export interface State {
  loading: boolean;
  loaded: boolean;
  sattel: RasterDetails[];
  lkw: RasterDetails[];
  express: RasterDetails[];
  normal: RasterDetails[];
  error?: string | null;
}

export interface RasterPartialState {
  readonly [RASTER_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  sattel: [],
  lkw: [],
  express: [],
  normal: [],
};

const rasterReducer = createReducer(
  initialState,
  // Sattel-Touren
  on(FetchRasterActions.fetchSattelRasterRequest, (state) => ({...state, loading: true})),
  on(FetchRasterActions.fetchSattelRasterSuccess, (state, {sattelRaster}) => ({
    ...state,
    loading: false,
    loaded: true,
    sattel: sattelRaster
  })),
  on(FetchRasterActions.fetchSattelRasterFailure, (state, {error}) => ({...state, loading: false, error})),
  // LKW-Touren
  on(FetchRasterActions.fetchLKWRasterRequest, (state) => ({...state, loading: true})),
  on(FetchRasterActions.fetchLKWRasterSuccess, (state, {lkwRaster}) => ({...state, loading: false, loaded: true, lkw: lkwRaster})),
  on(FetchRasterActions.fetchLKWRasterFailure, (state, {error}) => ({...state, loading: false, error})),
  // Express-Touren
  on(FetchRasterActions.fetchExpressRasterRequest, (state) => ({...state, loading: true})),
  on(FetchRasterActions.fetchExpressRasterSuccess, (state, {expressRaster}) => ({
    ...state,
    loading: false,
    loaded: true,
    express: expressRaster
  })),
  on(FetchRasterActions.fetchExpressRasterFailure, (state, {error}) => ({...state, loading: false, error})),
  // Rahmen-Touren
  on(FetchRasterActions.fetchRahmenRasterRequest, (state) => ({...state, loading: true})),
  on(FetchRasterActions.fetchRahmenRasterSuccess, (state, {rahmenRaster}) => ({
    ...state,
    loading: false,
    loaded: true,
    normal: rahmenRaster
  })),
  on(FetchRasterActions.fetchRahmenRasterFailure, (state, {error}) => ({...state, loading: false, error})),
);

export const reducer = (state: State | undefined, action: Action): any => rasterReducer(state, action);
