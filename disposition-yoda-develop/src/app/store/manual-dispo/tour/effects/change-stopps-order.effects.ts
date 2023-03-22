import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {TourService} from '@app/core/services';

import {of} from 'rxjs';

import {
  changeTourStoppsOrderFailure,
  changeTourStoppsOrderRequest,
  changeTourStoppsOrderSuccess
} from '../actions/change-stopps-order.actions';

import * as SelectedTourAction from '../actions/selected-tour.actions';

import {ToastrService} from 'ngx-toastr';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';

@Injectable()
export class ChangeStoppsOrderEffects {
  changeStoppsOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof changeTourStoppsOrderRequest>>(changeTourStoppsOrderRequest),
      withLatestFrom(this.selectedTourFacade.tourId$),
      switchMap(([action, tourId]) =>
        this.tourService.setTourStoppOrder(tourId, action.stopps).pipe(
          switchMap((_result) => [
            changeTourStoppsOrderSuccess({tourId, stopps: action.stopps}),
            SelectedTourAction.setSelectedTourId({id: tourId})
          ]),
          catchError((error: any) => of(changeTourStoppsOrderFailure()))
        )
      )
    ));

  changeStoppsOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof changeTourStoppsOrderSuccess>>(changeTourStoppsOrderSuccess),
        tap(() => {
          this.alertService.success('Reihenfolge wurde geändert');
        }),
        map((action: any) => SelectedTourAction.setSelectedTourId({id: action.tourId}))
      )
  );

  changeStoppsOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof changeTourStoppsOrderFailure>>(changeTourStoppsOrderFailure),
        tap(() => {
          this.alertService.error('Reihenfolge konnte nicht geändert werden');
        }),
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private selectedTourFacade: SelectedTourFacade,
    private tourService: TourService,
    private alertService: ToastrService,
  ) {
  }
}
