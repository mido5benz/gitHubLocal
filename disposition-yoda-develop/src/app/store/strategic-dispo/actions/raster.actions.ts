import {createAction, props} from '@ngrx/store';
import {RasterDetails} from '@models/strategic-dispo/raster.model';

export const fetchAllRasterRequest = createAction('[RASTER] Fetch all Raster Request');

export const fetchSattelRasterRequest = createAction('[RASTER] Fetch Sattel Raster Request');
export const fetchSattelRasterSuccess = createAction('[RASTER] Fetch Sattel Raster Success', props<{ sattelRaster: RasterDetails[] }>());
export const fetchSattelRasterFailure = createAction('[RASTER] Fetch Sattel Raster Failure ', props<{ error: any }>());

export const fetchLKWRasterRequest = createAction('[RASTER] Fetch LKW Raster Request');
export const fetchLKWRasterSuccess = createAction('[RASTER] Fetch LKW Raster Success', props<{ lkwRaster: RasterDetails[] }>());
export const fetchLKWRasterFailure = createAction('[RASTER] Fetch LKW Raster Failure ', props<{ error: any }>());

export const fetchExpressRasterRequest = createAction('[RASTER] Fetch Express Raster Request');
export const fetchExpressRasterSuccess = createAction('[RASTER] Fetch Express Raster Success', props<{ expressRaster: RasterDetails[] }>());
export const fetchExpressRasterFailure = createAction('[RASTER] Fetch Express Raster Failure ', props<{ error: any }>());

export const fetchRahmenRasterRequest = createAction('[RASTER] Fetch Rahmen Raster Request');
export const fetchRahmenRasterSuccess = createAction('[RASTER] Fetch Rahmen Raster Success', props<{ rahmenRaster: RasterDetails[] }>());
export const fetchRahmenRasterFailure = createAction('[RASTER] Fetch Rahmen Raster Failure ', props<{ error: any }>());
