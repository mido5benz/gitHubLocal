import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import * as RestrictionActions from '../actions/recipient.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {timeFramesValidForGivenWeekday} from '@shared/utils/restriction.utils';
import {Store} from '@ngrx/store';
import {getDeliveryPeriods} from '@store/stammdaten/selectors/recipient.selectors';
import {of} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class RestrictionsEffects {
  addDeliveryPeriodTimeFrame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestrictionActions.addDeliveryPeriod),
      withLatestFrom(this.store.select(getDeliveryPeriods)),
      switchMap(([action, timeFramesInState]) => {
        const timeFramesToAdd = action.deliveryPeriodTimeFrames;
        const validTimeFrames = [];
        const invalidTimeFrames = [];

        timeFramesToAdd.forEach((requestedTimeFrame) => {
          const isValid = timeFramesValidForGivenWeekday(timeFramesInState, requestedTimeFrame, true);
          if (isValid) {
            validTimeFrames.push(requestedTimeFrame);
          } else {
            invalidTimeFrames.push(requestedTimeFrame);
          }
        });

        return of([validTimeFrames, invalidTimeFrames]);
      }),
      tap(([_deliveryPeriodTimeFrames, invalidTimeFrames]) => {
        if (invalidTimeFrames.length > 0) {
          this.alertService.info('Es wurden nicht alle Anlieferungszeiten übernommen', 'Hinweis');
        }
      }),
      map(([deliveryPeriodTimeFrames, invalidTimeFrames]) => RestrictionActions.addDeliveryPeriodSuccess({
        deliveryPeriodTimeFrames,
        invalidTimeFrames
      }))));

  constructor(
    private store: Store,
    private alertService: ToastrService,
    private actions$: Actions
  ) {
  }
}
