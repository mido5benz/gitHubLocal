import {Injectable} from '@angular/core';
import {TourService} from '@app/core/services';
import {Tour} from '@models/index';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';

import * as fetchAvailableToursActions from '../actions/fetch-available-tours.actions';
import * as fetchTourListActions from '../actions/fetch-tour-list.actions';
import * as fromStopps from '../../stopps/actions/stopps.actions';

import {forkJoin} from 'rxjs';
import {createAssignedStopps, createUnassignedStopps} from '@shared/utils/tour.utils';
import {getLoaded} from '@store/manual-dispo/tour/selectors/tourlist.selectors';

@Injectable()
export class TourlistEffects {

  fetchAllToursStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof fetchTourListActions.fetchTourlistStart>>(fetchTourListActions.fetchTourlistStart),
      withLatestFrom(this.store.select(getLoaded)),
      filter(([_, loaded]) => !loaded),
      switchMap(() => [fetchTourListActions.fetchTourListRequest()])
    )
  );

  fetchAllTours$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof fetchTourListActions.fetchTourListRequest>>(fetchTourListActions.fetchTourListRequest),
      withLatestFrom(this.store.select(getLoaded)),
      filter(([_, loaded]) => !loaded),
      switchMap(() => forkJoin([
        this.tourService.fetchTour9999(),
        this.tourService.fetchAllTours()
      ])),
      switchMap(([tour9999, allTours]: [Tour, Tour[]]) => {
        const unassignedStopps = createUnassignedStopps(tour9999);
        const stopps = createAssignedStopps(allTours);

        return [
          fetchTourListActions.fetchTourListSuccess({allTours, tour9999}),
          fromStopps.setUnassignedStopps({unassignedStopps}),
          fromStopps.setAssignedStopps({stopps})
        ];
      }),
    )
  );

  fetchAvaiblableTours$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAvailableToursActions.fetchAvailableToursRequest),
      switchMap(() => this.tourService.fetchAvailableTours().pipe(
        map((completeTourList) => fetchAvailableToursActions.fetchAvailableToursSuccess({completeTourList})),
        catchError((error) => [
          fetchAvailableToursActions.fetchAvailableToursFailure(error)
        ])
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private tourService: TourService,
  ) {
  }
}
