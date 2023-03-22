import {createSelector} from '@ngrx/store';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';
import {CONSIGNMENT_FEATURE_KEY, State} from '@store/manual-dispo/consignments/reducers/consignment.reducer';

export const getReschedulingState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state[CONSIGNMENT_FEATURE_KEY]);

export const getLoading = createSelector(
  getReschedulingState,
  (state: State) => state.loading
);

export const getConsignmentsSelector = createSelector(
  getReschedulingState,
  (state: State) => state.consignments
);
