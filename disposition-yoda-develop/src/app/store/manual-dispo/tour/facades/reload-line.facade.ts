import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as ReloadLineSelectors from '../selectors/reload-line.selectors';
import * as fromReloadLine from '../reducers/reloadline.reducer';

@Injectable({
  providedIn: 'root'
})
export class ReloadLineFacade {
  loading$ = this.store.pipe(select(ReloadLineSelectors.getLoading));

  constructor(private store: Store<fromReloadLine.ReloadLinePartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
