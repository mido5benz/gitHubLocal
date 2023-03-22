import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StammdatenService} from '@app/core/services';

import * as StammdatenActions from '../actions/stammdaten.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Ziel} from '@shared/models';

@Injectable()
export class ZieleEffects {
  fetchZiele$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.fetchZieleRequest),
      switchMap((action) =>
        this.stammdatenService.fetchZiele().pipe(
          tap(() => this.stammdatenService.isZieleUpdated(false)),
          map((ziele: Ziel[]) => StammdatenActions.fetchZieleSuccess({ziele})),
          catchError((error: any) => of(StammdatenActions.fetchZieleFailure(error)))
        )
      )
    ));

  constructor(
    private actions$: Actions,
    private stammdatenService: StammdatenService,
  ) {
  }
}
