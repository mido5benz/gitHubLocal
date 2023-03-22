import {createAction, props} from '@ngrx/store';
import {Ziel} from '@shared/models';

export const mergeZieleRequest = createAction('[Stammdaten] fetch ziele request');
export const mergeZieleSuccess = createAction('[Stammdaten] fetch ziele success', props<{ ziele1: Ziel; ziel2: Ziel }>());
export const mergeZieleFailure = createAction('[Stammdaten] fetch ziele failure', props<{ error: any }>());
