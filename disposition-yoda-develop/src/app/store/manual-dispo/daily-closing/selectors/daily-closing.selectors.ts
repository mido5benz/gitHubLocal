import {createSelector} from '@ngrx/store';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';
import {DAILY_CLOSING_FEATURE_KEY} from '@store/manual-dispo/daily-closing/reducers/daily-closing.reducer';

export const getTagesabschlussState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state[DAILY_CLOSING_FEATURE_KEY]);

export const getLoading = createSelector(
  getTagesabschlussState,
  (state) => state.loading
);

export const getDone = createSelector(
  getTagesabschlussState,
  (state) => state.done
);

export const getError = createSelector(
  getTagesabschlussState,
  (state) => state.error
);

export const getOffeneTouren = createSelector(
  getTagesabschlussState,
  (state) => state.offeneTouren
);

