import {Action, createReducer, on} from '@ngrx/store';

import * as AddressActions from '../actions/address.actions';
import {Address} from '@models/address/address.model';
import {fetchSynonymFailure, fetchSynonymSuccess} from '@store/stammdaten/actions/fetch-synonyms.actions';
import {createSynonymSuccess} from '@store/stammdaten/actions/create-synonyms.actions';
import {seperateSynonymSuccess} from '@store/stammdaten/actions/seperate-synonym.actions';
import {
  fetchArchivedAddressesCountFailure,
  fetchArchivedAddressesCountRequest, fetchArchivedAddressesCountSuccess,
  fetchUnassignedAddressesCountFailure,
  fetchUnassignedAddressesCountRequest, fetchUnassignedAddressesCountSuccess,
  fetchUnassignedAddressesFailure,
  fetchUnassignedAddressesRequest,
  fetchUnassignedAddressesSuccess
} from '@store/stammdaten/actions/fetch-unassigned-addresses.actions';
import {
  saveUnassignedAddressFailure,
  saveUnassignedAddressRequest,
  saveUnassignedAddressSuccess
} from '@store/stammdaten/actions/unassigned-adresses.actions';

export const ADDRESSES_FEATURE_KEY = 'addresses';

export interface State {
  loading: boolean;
  all?: Address[];
  synonyms: any[];
  count?: number;
  count_archived_address?: number;
}

export interface AddressesPartialState {
  readonly [ADDRESSES_FEATURE_KEY]: State;
}

export const initialAddressesState: State = {
  loading: false,
  all: [],
  synonyms: [],
  count: 0,
  count_archived_address: 0
};

const addressReducer = createReducer(
  initialAddressesState,

  on(fetchUnassignedAddressesCountRequest, (state) => ({...state, loading: true})),
  on(fetchUnassignedAddressesCountSuccess, (state, {count}) => ({...state, loading: false, count: count})),
  on(fetchUnassignedAddressesCountFailure, (state) => ({...state, loading: false})),

  on(fetchArchivedAddressesCountRequest, (state) => ({...state, loading: true})),
  on(fetchArchivedAddressesCountSuccess, (state, {count}) => ({...state, loading: false, count_archived_address: count})),
  on(fetchArchivedAddressesCountFailure, (state) => ({...state, loading: false})),

  on(fetchUnassignedAddressesRequest, (state) => ({...state, loading: true})),
  on(fetchUnassignedAddressesSuccess, (state, {addresses}) => ({...state, loading: false, all: addresses})),
  on(fetchUnassignedAddressesFailure, (state) => ({...state, loading: false})),
  on(AddressActions.addressEditFinished, (state, {geoadresseFehlerId}) => ({
    ...state,
    all: state.all.filter(address => address.geoadresse_fehler_id !== geoadresseFehlerId)
  })),
  on(fetchSynonymSuccess, (state, {synonyms}) => ({...state, synonyms, loading: false})),
  on(fetchSynonymFailure, (state) => ({...state, loading: false})),
  on(seperateSynonymSuccess, (state, {zielNameId}) => ({
    ...state,
     // synonyms: state.synonyms.filter((synonym) => synonym.ziel_name_id !== zielNameId),
    synonyms: state.synonyms.filter((synonym) => !zielNameId.includes(synonym.ziel_name_id)),
  })),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  on(createSynonymSuccess, (state, {geoadresseFehlerId: geoadresse_fehler_id}) => ({
    ...state,
    all: state.all.filter(address => address.geoadresse_fehler_id !== geoadresse_fehler_id)
  })),

  on(saveUnassignedAddressRequest, (state) => ({...state, loading: true})),
  on(saveUnassignedAddressSuccess, (state, {unassignedAdresses}) => ({
    ...state,
    loading: false,
    all: state.all.filter((unassignedAddress) => unassignedAddress.sendung_id !== unassignedAdresses.sendung_id)
  })),
  on(saveUnassignedAddressFailure, (state, {error}) => ({...state, error, loading: false})),

);

export const reducer = (state: State | undefined, action: Action): State => addressReducer(state, action);
