import {createSelector} from '@ngrx/store';
import {State} from '@store/manual-dispo/tour/reducers/reloadline.reducer';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';

export const getReloadLineState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state.reloadLine);

export const getLoading = createSelector(
  getReloadLineState,
  (state: State) => state.loading
);

export const getError = createSelector(
  getReloadLineState,
  (state: State) => state.error
);

export const getHasError = createSelector(
  getReloadLineState,
  (state: State) => state.error != null
);

export const reloadLineChanged = createSelector(
  getReloadLineState,
  (state: State) => state.hasChanged
);
