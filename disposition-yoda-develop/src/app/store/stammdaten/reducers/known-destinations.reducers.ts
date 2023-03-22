import {Action, createReducer, on} from '@ngrx/store';
import {GeoAdress} from '@shared/models';
import {
  fetchSuggestions,
  fetchSuggestionsFailure,
  fetchSuggestionsSuccess
} from '@store/stammdaten/synonyms/actions/fetch-synonyms.actions';

export const KNOWN_DESTINATIONS_FEATURE_KEY = 'knownDestinations';

export interface State {
  loading: boolean;
  all: GeoAdress[];
}

export interface SuggestionsPartialState {
  readonly [KNOWN_DESTINATIONS_FEATURE_KEY]: State;
}

export const initialKnownDestinationsState: State = {
  loading: false,
  all: [],
};

const knownDestinationsReducer = createReducer(
  initialKnownDestinationsState,
  on(fetchSuggestions, (state) => ({...state, loading: true})),
  on(fetchSuggestionsSuccess, (state, {suggestions}) => ({
    ...state,
    loading: false,
    all: suggestions
  })),
  on(fetchSuggestionsFailure, (state, {error}) => ({...state, loading: false, error})),
);

export const reducer = (state: State | undefined, action: Action): State => knownDestinationsReducer(state, action);
