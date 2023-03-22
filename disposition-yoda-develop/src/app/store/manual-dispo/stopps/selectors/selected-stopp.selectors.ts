import {createSelector} from '@ngrx/store';
import {SELECTEDSTOPP_FEATURE_KEY, State} from '@store/manual-dispo/stopps/reducers/selected-stopp.reducer';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';

export const getSelectedStoppState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state[SELECTEDSTOPP_FEATURE_KEY]);

export const getSelectedStopp = createSelector(
  getSelectedStoppState,
  (state: State) => state.stopp
);
