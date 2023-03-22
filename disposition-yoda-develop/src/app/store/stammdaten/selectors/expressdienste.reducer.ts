import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {EXPRESSDIENSTE_FEATURE_KEY, State as ExpressdiensteState} from '@store/stammdaten/reducers/expressdienste.reducer';

export const selectExpressdiensteState: MemoizedSelector<Record<string, unknown>,
  ExpressdiensteState> = createFeatureSelector<ExpressdiensteState>(EXPRESSDIENSTE_FEATURE_KEY);

export const getExpressdienste = createSelector(
  selectExpressdiensteState,
  (state: ExpressdiensteState) => state.all
);
