import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {StoppsPartialState} from '@store/manual-dispo/stopps/reducers/stopps.reducer';

import * as fromStopps from '../selectors/stopps.selectors';

@Injectable({
  providedIn: 'root'
})
export class StoppsFacade {
  unassignedStopps$ = this.store.pipe(select(fromStopps.getUnassignedStopps));
  unassignedStoppsCount$ = this.store.pipe(select(fromStopps.getUnassignedStoppsCount));
  assignedStopps$ = this.store.pipe(select(fromStopps.getAssignedStopps));

  constructor(private store: Store<StoppsPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
