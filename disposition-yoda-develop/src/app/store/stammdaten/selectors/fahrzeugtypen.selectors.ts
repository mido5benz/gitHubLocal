import {createSelector} from '@ngrx/store';

import {FAHRZEUGTYPEN_FEATURE_KEY, State as FahrzeugtypenState} from '@store/stammdaten/reducers/fahrzeugtypen.reducer';
import {selectStammdatenState} from '@store/stammdaten/selectors/index';


export const getFahrzeugTypenState = createSelector(
  selectStammdatenState,
  (state: FahrzeugtypenState) => state[FAHRZEUGTYPEN_FEATURE_KEY]);

export const getFahrzeugtypen = createSelector(
  getFahrzeugTypenState,
  (state: FahrzeugtypenState) => state.all);
