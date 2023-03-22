import {createSelector} from '@ngrx/store';

import {DESTINATIONS_FEATURE_KEY, State as ZieleState} from '../reducers/ziele.reducer';

import {selectStammdatenState} from '@store/stammdaten/selectors/index';
import {Recipient} from '@models/address/address.model';

export const getZieleState = createSelector(
  selectStammdatenState,
  (state: ZieleState) => state[DESTINATIONS_FEATURE_KEY]);

export const getRecipients = createSelector(
  getZieleState,
  (state: ZieleState) => state.all
);

export const getLoading = createSelector(
  getZieleState,
  (state: ZieleState) => state.loading);

export const getZielByZielnameId = createSelector(
  getRecipients,
  (ziele: Recipient[], {zielNameId}) => {
    if (!ziele) {
      return undefined;
    }
    return ziele.find((recipient: Recipient) => recipient.ziel_name_id === zielNameId);
  }
);
