import {createSelector} from '@ngrx/store';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {State} from '@store/manual-dispo/activate-dispo/reducers/activate-manual-dispo.reducer';

export const selectManualDispoActivState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state.activation);

export const getLoading = createSelector(
  selectManualDispoActivState,
  (state: State) => state.loading
);

export const getIsActivated = createSelector(
  selectManualDispoActivState,
  (state: State) => state.isActive
);


