import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as UmdispoSelectors from '../selectors/reschedule.selectors';
import {ReschedulePartialState} from '../reducers/reschedule.reducer';
import {getTotalSelectedStopps, getTotalSelectedStoppsCount} from '@store/manual-dispo/stopps/selectors/stopps.selectors';

@Injectable({
  providedIn: 'root'
})
export class RescheduleFacade {
  targetTourString$ = this.store.pipe(select(UmdispoSelectors.setTargetTourString));
  loading$ = this.store.pipe(select(UmdispoSelectors.getLoading));
  targetTour$ = this.store.pipe(select(UmdispoSelectors.getTargetTour));
  allSelectedStopps$ = this.store.pipe(select(getTotalSelectedStopps));
  allSelectedStoppsCount$ = this.store.pipe(select(getTotalSelectedStoppsCount));

  constructor(private store: Store<ReschedulePartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
