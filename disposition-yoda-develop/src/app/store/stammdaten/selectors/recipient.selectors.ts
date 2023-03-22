import {createSelector} from '@ngrx/store';

import {State as RecipientState} from '../reducers/recipient.reducer';

import {selectStammdatenState} from '@store/stammdaten/selectors/index';
import {RECIPIENT_FEATURE_KEY} from '@store/stammdaten/reducers/recipient.reducer';

export const getRecipientState = createSelector(
  selectStammdatenState,
  (state: RecipientState) => state[RECIPIENT_FEATURE_KEY]);

export const getDeliveryPeriods = createSelector(
  getRecipientState,
  (state: RecipientState) => state.deliveryPeriods
);

export const getDeliveryPeriodsCount = createSelector(
  getRecipientState,
  (state: RecipientState) => state.deliveryPeriods ? state.deliveryPeriods.length : 0
);

export const hasError = createSelector(
  getRecipientState,
  (state: RecipientState) => state.error
);

export const getLoading = createSelector(
  getRecipientState,
  (state: RecipientState) => state.loading
);
