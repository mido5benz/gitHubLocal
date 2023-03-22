import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {moveReloadLineFailure, moveReloadLineRequest, moveReloadLineSuccess} from '../actions/move-reloadline.actions';
import {ReloadlineService} from '@app/core/services/reloadline/reloadline.service';
import * as fromSetSelectedTour from '@store/manual-dispo/tour/actions/selected-tour.actions';
import {TourService} from '@app/core/services';
import {ToastrService} from 'ngx-toastr';
import {
  deleteReloadLineFailure,
  deleteReloadLineRequest,
  deleteReloadLineSuccess
} from '@store/manual-dispo/tour/actions/delete-reloadline.actions';
import {DeleteReloadlineResponse} from '@models/tour/delete-reloadline.model';

@Injectable()
export class ReloadLineEffects {
  moveReloadLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveReloadLineRequest>>(moveReloadLineRequest),
      switchMap((action) =>
        this.reloadLineService.moveReloadLine(action.tourId, action.sollStopp).pipe(
          switchMap(() => [
            fromSetSelectedTour.setSelectedTourId({id: action.tourId}),
            moveReloadLineSuccess()
          ]),
          catchError((error) => of(moveReloadLineFailure(error)))
        ))
    ));

  deleteReloadLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof deleteReloadLineRequest>>(deleteReloadLineRequest),
      switchMap((action) =>
        this.reloadLineService.deleteReloadLine(action.tourId).pipe(
          switchMap((_tour: DeleteReloadlineResponse) => [
            fromSetSelectedTour.setSelectedTourId({id: action.tourId}),
            deleteReloadLineSuccess()
          ]),
          catchError((error: any) => of(deleteReloadLineFailure(error)))
        )
      )
    ));

  moveReloadLineSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveReloadLineSuccess>>(moveReloadLineSuccess),
      tap(() =>
        this.alertService.success(
          'Nachladegrenzen wurde erfolgreich verschoben!'
        ))
    ), {dispatch: false}
  );

  deleteReloadLineSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof deleteReloadLineSuccess>>(deleteReloadLineSuccess),
      tap(() =>
        this.alertService.success(
          'Nachladegrenzen wurde gelöscht!'
        ))
    ), {dispatch: false}
  );

  moveReloadLineError$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveReloadLineFailure>>(moveReloadLineFailure),
      tap(() =>
        this.alertService.error(
          'Nachladegrenzen konnte nicht verschoben werden!'
        ))
    ), {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private reloadLineService: ReloadlineService,
    private tourService: TourService,
    private alertService: ToastrService
  ) {
  }
}
