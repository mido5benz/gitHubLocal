import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as ActiveLayerSelectors from '../selectors/active-layer.selectors';
import * as fromActiveLayer from '../reducers/active-layer.reducer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveLayerFacade {
  activeLayer$ = this.store.pipe(select(ActiveLayerSelectors.getActiveLayer));

  constructor(private store: Store<fromActiveLayer.ActiveLayerPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
