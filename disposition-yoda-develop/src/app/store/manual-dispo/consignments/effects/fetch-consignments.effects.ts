import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ConsignmentService} from '@app/core/services/consignments/consignment.service';
import {
  fetchConsignmentsFailure,
  fetchConsignmentsRequest,
  fetchConsignmentsSuccess
} from '@store/manual-dispo/consignments/actions/fetch-consignments.actions';
import {Consignment} from '@models/index';

@Injectable()
export class SendungEffects {
  fetchConsignments$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof fetchConsignmentsRequest>>(fetchConsignmentsRequest),
      switchMap((action) => this.consignmentService.fetchConsignments(action.tourId, action.stoppId).pipe(
        map((consignments: Consignment[]) => fetchConsignmentsSuccess({consignments})),
        catchError((error) => of(fetchConsignmentsFailure(error)))
      ))
    ));

  constructor(
    private actions$: Actions,
    private consignmentService: ConsignmentService
  ) {
  }
}
