import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as SelectedTourSelectors from '../selectors/selected-tour.selectors';
import * as fromSelectedTour from '../reducers/selected-tour.reducer';
import {DispoSum} from '@models/index';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedTourFacade {
  tourNr$ = this.store.pipe(select(SelectedTourSelectors.getTourNr));
  ausliefertag$ = this.store.pipe(select(SelectedTourSelectors.getAusliefertag));
  tourSums$ = this.store.pipe(select(SelectedTourSelectors.getTourSums));
  reloadEditable$ = this.store.pipe(select(SelectedTourSelectors.getReloadEditable));
  duration$ = this.store.pipe(select(SelectedTourSelectors.getTourDuration));
  reloadLineIndex$ = this.store.pipe(select(SelectedTourSelectors.getReloadLineIndex));
  loading$ = this.store.pipe(select(SelectedTourSelectors.getLoading));
  stopps$ = this.store.pipe(select(SelectedTourSelectors.getStopps));
  stoppsWithReload$ = this.store.pipe(select(SelectedTourSelectors.getStoppsWithReload));
  frozen$ = this.store.pipe(select(SelectedTourSelectors.isFrozen));
  tourId$ = this.store.pipe(select(SelectedTourSelectors.getTourId));
  kennzeichenPflicht$ = this.store.pipe(select(SelectedTourSelectors.getKennzeichnungsPflicht));
  abgefertigt$ = this.store.pipe(select(SelectedTourSelectors.getAbgefertigt));
  potenziellGleicheZiele$ = this.store.pipe(select(SelectedTourSelectors.getPotenziellGleicheZieleVorhanden));

  constructor(private store: Store<fromSelectedTour.State>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  getSumsForDispoStopp(stoppId: number): Observable<DispoSum> {
    return this.store.pipe(select(SelectedTourSelectors.getSums, {stoppId}));
  }
}
