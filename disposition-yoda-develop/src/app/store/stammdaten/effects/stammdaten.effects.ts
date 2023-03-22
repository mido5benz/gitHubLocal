import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StammdatenService} from '@app/core/services';

import * as StammdatenActions from '../actions/stammdaten.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Stammdaten} from '@shared/models';
import {RecipientService} from '@app/core/services/recipient/recipient.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class StammdatenEffects {
  mergeRecipients = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.mergeRecipientRequest),
      switchMap((action: any) => this.recipientService.mergeRecipients(action.recipients)),
      switchMap(() => [
        StammdatenActions.mergeRecipientSuccess(),
       // StammdatenActions.fetchZieleRequest(),
      ]),
      catchError((error: any) => of(StammdatenActions.mergeRecipientFailed(error)))
    )
  );

  fetchStammdaten$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.fetchStammdatenRequest),
      switchMap((action) =>
        this.stammdatenService.fetchStammdaten().pipe(
          map((stammdaten: Stammdaten) => StammdatenActions.fetchStammdatenSuccess({stammdaten})),
          catchError((error: any) => of(StammdatenActions.fetchStammdatenFailure(error)))
        )
      )
    ));

  deleteRecipient = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.deleteRecipientRequest),
      switchMap((action) =>
        this.recipientService.deleteRecipient(action.recipientId).pipe(
          map(() => StammdatenActions.deleteRecipientSuccess({recipientId: action.recipientId})),
          catchError((error: any) => of(StammdatenActions.deleteRecipientFailed(error)))
        )
      )
    ));

  deleteRecipientSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.deleteRecipientSuccess),
      tap(_ => this.alertService.success('Ziel wurde gelöscht'))
    ), {dispatch: false});

  deleteRecipientFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.deleteRecipientFailed),
      tap(_ => this.alertService.error('Ziel konnte nicht gelöscht werden'))
    ), {dispatch: false});

  mergeReceipientSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.mergeRecipientSuccess),
      tap(_ => this.alertService.success('Ziele wurden zusammengefasst'))
    ), {dispatch: false});

  mergeReceipientFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StammdatenActions.mergeRecipientFailed),
      tap(_ => this.alertService.error('Ziele konnte nicht zusammengefasst werden'))
    ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private stammdatenService: StammdatenService,
    private recipientService: RecipientService,
    private alertService: ToastrService
  ) {
  }
}
