import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {DIENSTE_FEATURE_KEY, State as DiensteState} from '@store/stammdaten/reducers/dienste.reducer';

export const selectDiensteState: MemoizedSelector<Record<string, unknown>,
  DiensteState> = createFeatureSelector<DiensteState>(DIENSTE_FEATURE_KEY);

export const getDienste = createSelector(
  selectDiensteState,
  (state: DiensteState) => state.all
);
