import {combineReducers} from '@ngrx/store';
import {FAHRZEUGTYPEN_FEATURE_KEY, reducer as fahrzeugtypenReducer} from '@store/stammdaten/reducers/fahrzeugtypen.reducer';
import {DIENSTE_FEATURE_KEY, reducer as diensteReducer} from '@store/stammdaten/reducers/dienste.reducer';
import {EXPRESSDIENSTE_FEATURE_KEY, reducer as expressDiensteReducer} from '@store/stammdaten/reducers/expressdienste.reducer';
import {DESTINATIONS_FEATURE_KEY, reducer as destinationsReducer} from '@store/stammdaten/reducers/ziele.reducer';
import {KNOWN_DESTINATIONS_FEATURE_KEY, reducer as knownDestinationsReducer} from '@store/stammdaten/reducers/known-destinations.reducers';
import {ADDRESSES_FEATURE_KEY, reducer as addressReducer} from '@store/stammdaten/reducers/address.reducer';
import {RECIPIENT_FEATURE_KEY, reducer as recipientReducer} from '@store/stammdaten/reducers/recipient.reducer';

export const MASTERDATA_FEATURE_KEY = 'masterdata';

const reducers = combineReducers(
  {
    [FAHRZEUGTYPEN_FEATURE_KEY]: fahrzeugtypenReducer,
    [DIENSTE_FEATURE_KEY]: diensteReducer,
    [EXPRESSDIENSTE_FEATURE_KEY]: expressDiensteReducer,
    [DESTINATIONS_FEATURE_KEY]: destinationsReducer,
    [KNOWN_DESTINATIONS_FEATURE_KEY]: knownDestinationsReducer,
    [ADDRESSES_FEATURE_KEY]: addressReducer,
    [RECIPIENT_FEATURE_KEY]: recipientReducer
  }
);

export type MasterDataState = typeof reducers;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function masterdataReducer(state, action): any {
  return reducers(state, action);
}
