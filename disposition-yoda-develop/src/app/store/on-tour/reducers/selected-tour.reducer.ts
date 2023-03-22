import { Aenderungswunsch } from '@models/on-tour/aenderungswunsch.model';
import { Action, createReducer, on } from '@ngrx/store';

import * as OnTourActions from '../actions/on-tour.actions';

export const SELECTED_FEATURE_KEY = 'selected';

export interface State {
  tour: Aenderungswunsch;
}

export interface OnTourPartialState {
  readonly [SELECTED_FEATURE_KEY]: State;
}

export const initialState: State = {
  tour: {
    anzahl: null,
    anfragen: [
      {
        tournr: '0',
        anfrage_stoppplanung_id: null,
        ausliefertag: new Date(),
        anfrage_zeit: new Date(),
        anfrage_nr: null,
        stoppnr_alt_von: null,
        stoppnr_alt_bis: null,
        stoppnr_neu: null,
        antwort: false,
      },
    ],
  },
};

const selectedTourReducer = createReducer(
  initialState,
  on(OnTourActions.setSelectedTour, (state, { selectedTour }) => ({
    ...state,
    tour: selectedTour,
  }))
);

export function reducer(state: State | undefined, action: Action): any {
  return selectedTourReducer(state, action);
}
