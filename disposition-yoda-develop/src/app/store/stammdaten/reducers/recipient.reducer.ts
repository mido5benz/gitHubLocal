import {Action, createReducer, on} from '@ngrx/store';

import {Zeitfenster} from '@models/recipient/recipient.models';
import * as RecipientActions from '@store/stammdaten/actions/recipient.actions';

export const RECIPIENT_FEATURE_KEY = 'ziel';

export interface State {
  loading: boolean;
  error: boolean;
  deliveryPeriods: Zeitfenster[];
}

export interface RecipientPartialState {
  readonly [RECIPIENT_FEATURE_KEY]: State;
}

export const initialRecipientState: State = {
  loading: false,
  error: false,
  deliveryPeriods: []
};

const recipientReducer = createReducer(
  initialRecipientState,
  on(RecipientActions.addDeliveryPeriod, (state) => ({
    ...state,
    loading: true,
    error: false
  })),
  on(RecipientActions.addDeliveryPeriodSuccess, (state, {deliveryPeriodTimeFrames}) => ({
    ...state,
    deliveryPeriods: state.deliveryPeriods.concat(deliveryPeriodTimeFrames),
    loading: false,
    error: false
  })),
  on(RecipientActions.addDeliveryPeriodFailed, (state) => ({
    ...state,
    loading: false,
    error: true
  })),
  on(RecipientActions.removeDeliveryPeriod, (state, {deliveryPeriodTimeFrame}) => {
    return ({
      ...state,
      deliveryPeriods: state.deliveryPeriods.filter((timeFrame) => timeFrame !== deliveryPeriodTimeFrame)
    });
  }),
  on(RecipientActions.setTimeFrames, (state, {timeFrames}) => ({
    ...state,
    deliveryPeriods: timeFrames
  })),
);

export const reducer = (state: State | undefined, action: Action): State => recipientReducer(state, action);
