import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {RecipientPartialState} from '@store/stammdaten/reducers/recipient.reducer';
import * as RecipientSelectors from '@store/stammdaten/selectors/recipient.selectors';

@Injectable({
  providedIn: 'root'
})
export class RecipientFacade {
  deliveryPeriods$ = this.store.pipe(select(RecipientSelectors.getDeliveryPeriods));
  deliveryPeriodsCount$ = this.store.pipe(select(RecipientSelectors.getDeliveryPeriodsCount));
  deliverPeriodHasError$ = this.store.pipe(select(RecipientSelectors.hasError));
  deliverPeriodLoading$ = this.store.pipe(select(RecipientSelectors.getLoading));

  constructor(private store: Store<RecipientPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
