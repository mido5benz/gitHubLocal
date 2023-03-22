import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as ActivateManualDispoSelectors from '../selectors/activate-manual-dispo.selectors';
import * as fromActivation from '../reducers/activate-manual-dispo.reducer';
import {activateManualDispoRequest} from '@store/manual-dispo/activate-dispo/actions/activate-dispo.actions';

@Injectable({
  providedIn: 'root'
})
export class DispoActivFacade {
  loading$ = this.store.pipe(select(ActivateManualDispoSelectors.getLoading));
  activated$ = this.store.pipe(select(ActivateManualDispoSelectors.getIsActivated));

  constructor(private store: Store<fromActivation.ActivationPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  public activateManualDispo(): void {
    this.dispatch(activateManualDispoRequest());
  }
}
