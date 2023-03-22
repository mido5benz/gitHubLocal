import {Injectable} from '@angular/core';
import {TourService} from '@app/core/services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {catchError, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as fromMoveTour from '../actions/move-stopp.actions';
import {
  moveStoppFailure,
  moveStoppRequest,
  moveStoppsFailure,
  moveStoppsRequest,
  moveStoppsSuccess,
  moveStoppSuccess
} from '../actions/move-stopp.actions';
import * as fromUmdispo from '../../reschedule/actions/reschedule.actions';
import {resetSelectedStopps, resetTargetTour} from '../../reschedule/actions/reschedule.actions';
import * as fromSelectedTour from '../../tour/actions/selected-tour.actions';

import {DispoStopp, MoveStoppServerResponse} from '@models/index';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {
  moveUnassignedStoppsFailure,
  moveUnassignedStoppsRequest,
  moveUnassignedStoppsSuccess
} from '@store/manual-dispo/reschedule/actions/move-unassigned-stopp.actions';
import {
  moveStoppsToTourFailure,
  moveStoppsToTourRequest,
  moveStoppsToTourSuccess
} from '@store/manual-dispo/reschedule/actions/move-assigned-stopp.actions';
import {getRescheduleStateSelector} from '@store/manual-dispo/manual-dispo.selectors';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {getTotalSelectedStopps} from '@store/manual-dispo/stopps/selectors/stopps.selectors';
import {MapService} from '@app/core/services/map/map.service';

@Injectable()
export class MoveStoppEffects {
  moveUnassignedStopps$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveUnassignedStoppsRequest>>(moveUnassignedStoppsRequest),
      switchMap((action) => {
        const targetTourId = action.tourId;
        return this.tourService.moveStoppsToTour(targetTourId, action.stopps).pipe(
          switchMap(_ =>
            [
              moveUnassignedStoppsSuccess(),
              fetchTourListRequest(),
            ]),
          catchError((error) => {
            return of(moveUnassignedStoppsFailure({error: ''}));
          })
        );
      })
    ));

  moveStoppsToTour$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveStoppsToTourRequest>>(moveStoppsToTourRequest),
      switchMap((action) => {
        const targetTourId = action.tourId;
        const sourceTourId = action.sourceTourId;

        return this.tourService.moveStoppsToTour(targetTourId, action.stopps).pipe(
          switchMap((_response: MoveStoppServerResponse) =>
            [
              fromSelectedTour.setSelectedTourId({id: sourceTourId}),
              moveStoppsToTourSuccess(),
            ]),
          catchError((response) => {
            switch (response.status) {
              case 422:
                const errors = response.error.map((entity) => ({
                  errorCode: entity.error.code,
                  message: entity.error.message
                }));
                if (errors.length > 0) {
                  this.alertService.error(errors[0].message);
                }
                return of(moveStoppsToTourFailure({
                  error: ''
                }));
              default:
                return of(moveStoppsToTourFailure(response));
            }
          })
        );
      })
    ));

  moveSingleStopp$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveStoppRequest>>(moveStoppRequest),
      tap(_ => this.mapService.setUmdispoLoading(true)),
      withLatestFrom(this.selectedTourFacade.tourId$),
      switchMap(([action, selectedTourId]) => {
        if (selectedTourId > 0) {
          const targetTourId = action.tourId;
          return this.tourService.moveStoppsToTour(targetTourId, action.stopp).pipe(
            tap(_ => this.mapService.setUmdispoLoading(false)),
            tap(_ => this.alertService.success('Stopps umdisponiert!')),
            switchMap((_response: any) =>
              [
                fromMoveTour.moveStoppSuccess(),
                fetchTourListRequest(),
                fromSelectedTour.setSelectedTourId({id: selectedTourId}),
                fromUmdispo.resetTargetTour(),
              ]),
            catchError((response) => {
              switch (response.status) {
                case 422:
                  const errors = response.error.map((entity) => ({
                    errorCode: response.status,
                    message: entity.error.message
                  }));
                  return of(fromMoveTour.moveStoppsFailure({
                    error: errors
                  }));
                default:
                  return of(moveStoppsFailure(response));
              }
            }));
        } else {
          const targetTourId = action.tourId;
          return this.tourService.moveStoppsToTour(targetTourId, action.stopp).pipe(
            tap(_ => this.mapService.setUmdispoLoading(false)),
            tap(_ => this.alertService.success('Stopps umdisponiert!')),
            switchMap((_response: any) =>
              [
                fromMoveTour.moveStoppSuccess(),
                fetchTourListRequest(),
                resetSelectedStopps(),
                fromUmdispo.resetTargetTour(),
              ]),
            catchError((response) => {
              switch (response.status) {
                case 422:
                  const errors = response.error.map((entity) => ({
                    errorCode: response.status,
                    message: entity.error.message
                  }));
                  return of(fromMoveTour.moveStoppsFailure({
                    error: errors
                  }));
                default:
                  return of(moveStoppsFailure(response));
              }
            })
          );
        }
      })
    ));

  moveMultipleStopps$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof moveStoppsRequest>>(moveStoppsRequest),
      withLatestFrom(this.store.select(getRescheduleStateSelector), this.store.select(getTotalSelectedStopps)),
      switchMap(([action, rescheduleState, selectedStopps]: any) => {
        const targetTour = rescheduleState.targetTour;
        // Filter all stopps which are already on the target tour
        const filteredStopps = selectedStopps.filter((dispoStopp: DispoStopp) => dispoStopp.tour_id !== targetTour.tour_id);

        return this.tourService.moveStoppsToTour(targetTour.tour_id, filteredStopps).pipe(
          tap(_ => this.alertService.success('Stopps umdisponiert!')),
          switchMap((response: any) => [
            moveStoppsSuccess({fromTour: action.fromTour, affectedTours: response}),
            resetTargetTour(),
            resetSelectedStopps()
          ]),
          catchError((error) => {
            return of(fromMoveTour.moveStoppsFailure({error: ''}));
          })
        );
      })
    ));

  moveStoppsToTourSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          moveStoppsSuccess
          || moveStoppSuccess
          || moveStoppsToTourSuccess
          || moveUnassignedStoppsSuccess),
        tap(() => {
          this.alertService.success('Umdisponierung erfolgreich');
        }),
      ),
    {dispatch: false}
  );

  moveStoppsToTourFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          moveStoppsFailure
          || moveStoppFailure
          || moveStoppsToTourFailure
          || moveUnassignedStoppsFailure),
        tap((props) => {

          let errorCode;
          let message;

          props.error.map((error) => {
            errorCode = error.errorCode;
            message = error.message;
          });

          if (errorCode === 422) {
            this.alertService.error(message, 'Umdisponierung fehlgeschlagen');
          } else {
            this.alertService.error('Umdisponierung fehlgeschlagen');
          }
          this.mapService.setUmdispoLoading(false);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private selectedTourFacade: SelectedTourFacade,
    private actions$: Actions,
    private store: Store,
    private tourService: TourService,
    private alertService: ToastrService,
    private mapService: MapService
  ) {
  }
}
