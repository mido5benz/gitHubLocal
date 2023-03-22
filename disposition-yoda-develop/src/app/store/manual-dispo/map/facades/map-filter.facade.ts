import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as FilterSelectors from '@store/manual-dispo/map/selectors/map-filter.selectors';
import {resetMapFilter} from '@store/manual-dispo/map/actions/map-filter.actions';

@Injectable({
  providedIn: 'root'
})
export class MapFilterFacade {
  tourFilter$ = this.store.pipe(select(FilterSelectors.getTourFilter));
  serviceFilter$ = this.store.pipe(select(FilterSelectors.getServiceFilter));
  vehicleTypeFilter$ = this.store.pipe(select(FilterSelectors.getVehicleTypeFilter));
  semiTrailerFilter$ = this.store.pipe(select(FilterSelectors.getSemiTrailerFilter));
  truckFilter$ = this.store.pipe(select(FilterSelectors.getTruckFilter));
  combineFilter$ = this.store.pipe(select(FilterSelectors.getCombineFilter));

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  resetFilter(): void {
    this.dispatch(resetMapFilter());
  }
}
