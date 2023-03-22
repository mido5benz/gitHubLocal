import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, withLatestFrom} from 'rxjs/operators';

import {getAllTours} from '@store/manual-dispo/tour/selectors/tourlist.selectors';
import {getCombinedFilters} from '@store/manual-dispo/map/selectors/map-filter.selectors';
import {applyMapFilter, resetMapFilter} from '@store/manual-dispo/map/actions/map-filter.actions';
import {combineFilter, filterSemiTrailer, filterTourNumbers, filterToursByServices, filterTruck} from '@shared/utils/filter.util';

import * as tourlitFilterActions from '../../tour/actions/filter-tourlist.actions';

@Injectable()
export class FilterEffects {
  resetFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof resetMapFilter>>(resetMapFilter),
      map(_ => tourlitFilterActions.resetFilter())
    ));

  applyMapFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof applyMapFilter>>(applyMapFilter),
      map((action) => action),
      withLatestFrom(this.store.select(getCombinedFilters)),
      withLatestFrom(this.store.select(getAllTours)),
      map(([[_action, filters], allTours]) => {
          let filteredList = filterTourNumbers(filters, allTours);
          filteredList = filterToursByServices(filters, filteredList);
          filteredList = filterSemiTrailer(filters, filteredList);
          filteredList = filterTruck(filters, filteredList);
          filteredList = combineFilter(filters, filteredList);
          return tourlitFilterActions.setFilteredTourList({
            filteredTours: filteredList
          });
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {  }
}
