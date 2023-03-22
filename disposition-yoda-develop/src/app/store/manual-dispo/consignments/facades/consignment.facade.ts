import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as MoveSendungSelectors from '../selectors/consignment.selectors';
import {ConsignmentPartialState} from '@store/manual-dispo/consignments/reducers/consignment.reducer';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentFacade {
  loading$ = this.store.pipe(select(MoveSendungSelectors.getLoading));
  all$ = this.store.pipe(select(MoveSendungSelectors.getConsignmentsSelector));

  constructor(private store: Store<ConsignmentPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
