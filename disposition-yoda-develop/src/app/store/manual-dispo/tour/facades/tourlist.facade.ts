import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as TourListSelectors from '../selectors/tourlist.selectors';
import * as fromTourList from '../reducers/tour-list.reducer';
import {Observable} from 'rxjs';
import {Tour} from '@models/index';
import {fetchTourlistStart} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {getTourByTourNr} from '../selectors/tourlist.selectors';

@Injectable({
  providedIn: 'root'
})
export class TourlistFacade {
  loading$ = this.store.pipe(select(TourListSelectors.getLoading));
  filteredTours$ = this.store.pipe(select(TourListSelectors.getFilteredTours));
  getCompleteTourList$ = this.store.pipe(select(TourListSelectors.getCompleteTourList));

  constructor(private store: Store<fromTourList.TourListPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  fetchTourList(): void {
    this.store.dispatch(fetchTourlistStart());
  }

  getTourByTourNr(tourNr: string): Observable<Tour> {
    return this.store.select(TourListSelectors.getTourByNr, {tourNr});
  }

  searchTour(searchQuery: string): Observable<Tour> {
    return this.store.select(TourListSelectors.getTourByTourNr, {tourNr: searchQuery});
  }
}
