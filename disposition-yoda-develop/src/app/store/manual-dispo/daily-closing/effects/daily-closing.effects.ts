import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import * as TagesabschlussActions from '../actions/daily-closing.actions';
import {fetchOffeneTourenRequest} from '../actions/daily-closing.actions';

import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {TagesabschlussService} from '@app/core/services/tagesabschluss/tagesabschluss.service';
import {
  executeDailyClosingFailure,
  executeDailyClosingRequest,
  executeDailyClosingSuccess
} from '@store/manual-dispo/daily-closing/actions/execute-daily-closing.actions';

@Injectable()
export class TagesabschlussEffects {

  fetchOffeneToure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOffeneTourenRequest),
      switchMap((_action) =>
        this.tagesabschlussService.fetchOustandingTours().pipe(
          map((offeneTouren: any) => TagesabschlussActions.fetchOffeneTourenSuccess({offeneTouren})),
          catchError((error: any) => of(TagesabschlussActions.fetchOffeneTourenFailure(error)))
        )
      )
    ));

  executeDailyClosing$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof executeDailyClosingRequest>>(executeDailyClosingRequest),
      switchMap((_action) =>
        this.tagesabschlussService.executeDailyClosing().pipe(
          map(() => executeDailyClosingSuccess()),
          catchError((error: any) => of(executeDailyClosingFailure(error)))
        )
      )
    ));

  constructor(
    private actions$: Actions,
    private tagesabschlussService: TagesabschlussService,
  ) {
  }
}
