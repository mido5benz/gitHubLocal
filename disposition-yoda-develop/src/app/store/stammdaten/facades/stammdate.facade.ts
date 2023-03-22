import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as FahrzeugtypenSelectors from '../selectors/fahrzeugtypen.selectors';
import * as RecipientSelectors from '../selectors/ziele.selectors';

import {ZielePartialState} from '@store/stammdaten/reducers/ziele.reducer';
import {Observable} from 'rxjs';
import {Recipient} from '@models/address/address.model';

@Injectable({
  providedIn: 'root'
})
export class StammdatenFacade {
  fahrzeugtypen$ = this.store.pipe(select(FahrzeugtypenSelectors.getFahrzeugtypen));
  recipients$ = this.store.pipe(select(RecipientSelectors.getRecipients));
  zieleLoading$ = this.store.pipe(select(RecipientSelectors.getLoading));

  constructor(private store: Store<ZielePartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  getZielById(zielNameId: number): Observable<Recipient> {
    return this.store.select(RecipientSelectors.getZielByZielnameId, {zielNameId});
  }

}
