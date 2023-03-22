import {Injectable} from '@angular/core';
import {
  fetchOffeneTourenRequest,
} from '@store/manual-dispo/daily-closing/actions/daily-closing.actions';

import {Action, select, Store} from '@ngrx/store';
import * as TagesAbschlussSelectors from '../selectors/daily-closing.selectors';
import * as fromTagesabschluss from '../reducers/daily-closing.reducer';
import {checkDailyClosingRequest} from '@store/manual-dispo/daily-closing/actions/check-daily-closing.actions';
import {executeDailyClosingRequest} from '@store/manual-dispo/daily-closing/actions/execute-daily-closing.actions';

@Injectable({
  providedIn: 'root'
})
export class DailyClosingFacade {
  loading$ = this.store.pipe(select(TagesAbschlussSelectors.getLoading));
  done$ = this.store.pipe(select(TagesAbschlussSelectors.getDone));
  offeneTouren$ = this.store.pipe(select(TagesAbschlussSelectors.getOffeneTouren));

  constructor(private store: Store<fromTagesabschluss.TagesabschlussPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  checkDailyClosing(): void {
    this.store.dispatch(checkDailyClosingRequest());
  }

  executeDailyClosing(): void {
    this.store.dispatch(executeDailyClosingRequest());
  }

  fetchOffeneTouren(): void {
    this.store.dispatch(fetchOffeneTourenRequest());
  }
}
