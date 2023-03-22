import {createAction, props} from '@ngrx/store';
import {Zeitfenster} from '@models/recipient/recipient.models';

export const addDeliveryPeriod = createAction('TRY ADD DELIVERY PERIOD', props<{ deliveryPeriodTimeFrames: Zeitfenster[] }>());
export const addDeliveryPeriodSuccess =
  createAction('ADD DELIVERY PERIOD SUCCESS', props<{
    deliveryPeriodTimeFrames: Zeitfenster[];
    invalidTimeFrames: Zeitfenster[];
  }>());
export const addDeliveryPeriodFailed = createAction('ADD DELIVERY PERIOD FAILED');

export const removeDeliveryPeriod = createAction('REMOVE DELIVERY PERIOD', props<{ deliveryPeriodTimeFrame: any }>());
export const setTimeFrames = createAction('SET TIMEFRAMES', props<{ timeFrames: any }>());
