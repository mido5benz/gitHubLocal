import {createAction, createSelector} from '@ngrx/store';
import {getRescheduleStateSelector} from '@store/manual-dispo/manual-dispo.selectors';
import {State} from '@store/manual-dispo/reschedule/reducers/reschedule.reducer';

export const getLoading = createSelector(
  getRescheduleStateSelector,
  (state: State) => state.loading
);

export const getTargetTour = createSelector(
  getRescheduleStateSelector,
  (state: State) => state.targetTour
);

export const setTargetTourString = createSelector(
  getRescheduleStateSelector,
  (state: State) => state.targetTourString
);
