import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as fromLocations from '@store/manual-dispo/locations/reducers/location.reducer';
import * as LocationsSelectors from '@store/manual-dispo/locations/selectors/location.selectors';

@Injectable({
  providedIn: 'root'
})
export class LocationsFacade {
  loading$ = this.store.pipe(select(LocationsSelectors.getLoadingSelector));
  locations$ = this.store.pipe(select(LocationsSelectors.getLocationsSelector));

  constructor(private store: Store<fromLocations.LocationsPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
