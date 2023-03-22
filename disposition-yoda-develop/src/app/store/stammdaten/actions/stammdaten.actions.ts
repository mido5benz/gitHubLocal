import {createAction, props} from '@ngrx/store';
import {Stammdaten, Ziel} from '@shared/models';
import {Recipient} from '@models/address/address.model';

export const deleteRecipientRequest = createAction('DELETE RECIPIENT REQUEST', props<{ recipientId: number }>());
export const deleteRecipientSuccess = createAction('DELETE RECIPIENT SUCCESS', props<{ recipientId: number }>());
export const deleteRecipientFailed = createAction('DELETE RECIPIENT FAILED', props<{ error: any }>());

export const fetchStammdatenRequest = createAction('FETCH STAMMDATEN REQUEST');
export const fetchStammdatenSuccess = createAction('FETCH STAMMDATEN SUCCESS', props<{ stammdaten: Stammdaten }>());
export const fetchStammdatenFailure = createAction('FETCH STAMMDATEN FAILED', props<{ error: any }>());

export const fetchZieleRequest = createAction('FETCH ZIELE REQUEST');
export const fetchZieleSuccess = createAction('FETCH ZIELE SUCCESS', props<{ ziele: Ziel[] }>());
export const fetchZieleFailure = createAction('FETCH ZIELE FAILED', props<{ error: any }>());

export const mergeRecipientRequest = createAction('MERGE RECIPIENT REQUEST', props<{ recipients: Recipient[] }>());
export const mergeRecipientSuccess = createAction('MERGE RECIPIENT SUCCESS');
export const mergeRecipientFailed = createAction('MERGE RECIPIENT FAILED', props<{ error: any }>());
