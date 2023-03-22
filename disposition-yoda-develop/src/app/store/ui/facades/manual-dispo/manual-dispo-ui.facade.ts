import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {closeTourDetails, openTourDetails, toggleMapFilter, toggleTourDetail} from '@store/ui/actions/manual-dispo/manual-dispo-ui.actions';
import {getMapFilterState, getTourDetailsState, getTourTableState} from '@store/ui/selectors/manual-dispo/manual-dispo.selectors';

@Injectable({
  providedIn: 'root'
})
export class ManualDispoUiFacade {
  tableCollapsed$ = this.store.pipe(select(getTourTableState));
  tourDetailsCollapsed$ = this.store.pipe(select(getTourDetailsState));
  mapFilterCollapsed$ = this.store.select(getMapFilterState);

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  toggleMapFilter(): void {
    this.dispatch(toggleMapFilter());
  }

  toggleSidebar(): void {
    this.dispatch(toggleTourDetail());
  }

  closeSidebar(): void {
    this.dispatch(closeTourDetails());
  }
}
