import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {RasterService} from '@app/core/services/raster/raster.service';
import {of} from 'rxjs';
import {RasterDetails} from '@models/strategic-dispo/raster.model';

import * as FetchRasterActions from '../actions/raster.actions';

@Injectable()
export class RasterEffects {
  fetchAllRasterRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchRasterActions.fetchAllRasterRequest),
      switchMap((action: any) =>
        [
          FetchRasterActions.fetchSattelRasterRequest(),
          FetchRasterActions.fetchLKWRasterRequest(),
          FetchRasterActions.fetchExpressRasterRequest(),
          FetchRasterActions.fetchRahmenRasterRequest()
        ]
      )));

  fetchSattelRasterRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchRasterActions.fetchSattelRasterRequest),
      switchMap((action: any) =>
        this.rasterService.getSattelRaster().pipe(
          map((sattelRaster: RasterDetails[]) => FetchRasterActions.fetchSattelRasterSuccess({sattelRaster})),
          catchError((error) => of(FetchRasterActions.fetchSattelRasterFailure(error)))
        ))
    ));

  fetchLKWRasterRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchRasterActions.fetchLKWRasterRequest),
      switchMap((action: any) =>
        this.rasterService.getLKWRaster().pipe(
          map((lkwRaster: RasterDetails[]) => FetchRasterActions.fetchLKWRasterSuccess({lkwRaster})),
          catchError((error) => of(FetchRasterActions.fetchLKWRasterFailure(error)))
        ))
    ));

  fetchExpressRasterRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchRasterActions.fetchExpressRasterRequest),
      switchMap((action: any) =>
        this.rasterService.getExpressRaster().pipe(
          map((expressRaster: RasterDetails[]) => FetchRasterActions.fetchExpressRasterSuccess({expressRaster})),
          catchError((error) => of(FetchRasterActions.fetchExpressRasterFailure(error)))
        ))
    ));

  fetchRahmenRasterRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchRasterActions.fetchRahmenRasterRequest),
      switchMap((action: any) =>
        this.rasterService.getNormalRaster().pipe(
          map((rahmenRaster: RasterDetails[]) => FetchRasterActions.fetchRahmenRasterSuccess({rahmenRaster})),
          catchError((error) => of(FetchRasterActions.fetchRahmenRasterFailure(error)))
        ))
    ));

  constructor(
    private actions$: Actions,
    private rasterService: RasterService,
  ) {
  }
}
