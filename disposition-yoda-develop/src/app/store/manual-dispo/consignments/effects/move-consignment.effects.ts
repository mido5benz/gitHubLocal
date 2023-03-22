import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ConsignmentService} from '@app/core/services/consignments/consignment.service';
import {ToastrService} from 'ngx-toastr';
import {
  ActionTypes,
  moveConsignmentsFailure,
  moveConsignmentsRequest,
  moveConsignmentsSuccess
} from '@store/manual-dispo/consignments/actions/move-consignment.actions';
import {fetchConsignmentsRequest} from '@store/manual-dispo/consignments/actions/fetch-consignments.actions';

@Injectable()
export class MoveConsignmentEffects {
  moveConsignments$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveConsignmentsRequest>>(ActionTypes.MOVE_CONSIGNMENTS_REQUEST),
      switchMap((action) =>
        this.sendungService.moveConsignment(action.sourceStoppId, action.consignments, action.targetTourId).pipe(
          switchMap(() => [
            moveConsignmentsSuccess(),
            fetchConsignmentsRequest({stoppId: action.sourceStoppId, tourId: action.sourceTourId})
          ]),
          catchError((error) => of(moveConsignmentsFailure(error)))
        ))
    ));

  moveConsignmentsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof moveConsignmentsSuccess>>(moveConsignmentsSuccess),
        tap(() => {
          this.alertService.success(`Sendungen wurden umdisponiert`);
        })
      ),
    {dispatch: false}
  );

  moveConsignmentsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof moveConsignmentsFailure>>(moveConsignmentsFailure),
        tap(() => {
          this.alertService.error('Sendungen konnten nicht umdisponiert werden');
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private alertService: ToastrService,
    private sendungService: ConsignmentService
  ) {
  }
}
