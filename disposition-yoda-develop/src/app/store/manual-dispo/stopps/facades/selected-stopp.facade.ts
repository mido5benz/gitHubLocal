import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as SelectedStoppSelectors from '../selectors/selected-stopp.selectors';
import * as fromSelectedStopp from '../reducers/selected-stopp.reducer';

@Injectable({
  providedIn: 'root'
})
export class SelectedStoppFacade {
  selectedStopp$ = this.store.pipe(select(SelectedStoppSelectors.getSelectedStopp));

  constructor(private store: Store<fromSelectedStopp.State>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
