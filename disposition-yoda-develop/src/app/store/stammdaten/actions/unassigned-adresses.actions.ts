import {createAction, props} from '@ngrx/store';
import {Address} from '@shared/models';

export const saveUnassignedAddressRequest = createAction('[Save-Unassigned-Adress] Unassigned Ziele request', props<{ address: Address }>());
export const saveUnassignedAddressSuccess = createAction('[Save-Unassigned-Adress] Unassigned Ziele success', props<{ unassignedAdresses: Address }>());
export const saveUnassignedAddressFailure = createAction('[Save-Unassigned-Adress] Unassigned Ziele failure', props<{ error: any }>());
