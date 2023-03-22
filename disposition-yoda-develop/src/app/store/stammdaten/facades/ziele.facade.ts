import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as ZieleSelectors from '../selectors/ziele.selectors';

import {ZielePartialState} from '@store/stammdaten/reducers/ziele.reducer';

@Injectable({
  providedIn: 'root'
})
export class ZieleFacade {
  ziele$ = this.store.pipe(select(ZieleSelectors.getRecipients));

  constructor(private store: Store<ZielePartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
