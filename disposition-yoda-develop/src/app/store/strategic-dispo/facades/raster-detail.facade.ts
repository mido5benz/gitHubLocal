import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as RasterDetailSelectors from '../selectors/raster-detail.selectors';
import * as fromRasterDetail from '../reducers/raster.reducer';

@Injectable({
  providedIn: 'root'
})
export class RasterDetailFacade {
  loading$ = this.store.pipe(select(RasterDetailSelectors.getLoading));
  error$ = this.store.pipe(select(RasterDetailSelectors.getError));

  sattel$ = this.store.pipe(select(RasterDetailSelectors.getSattelRasterDetails));
  lkw$ = this.store.pipe(select(RasterDetailSelectors.getLKWRasterDetails));
  express$ = this.store.pipe(select(RasterDetailSelectors.getExpressRasterDetails));
  normal$ = this.store.pipe(select(RasterDetailSelectors.getNormalRasterDetails));

  constructor(private store: Store<fromRasterDetail.RasterPartialState>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
