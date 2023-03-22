import {createAction, props} from '@ngrx/store';

export const setActiveLayer = createAction('[ACTIVE LAYER] Set active layer', props<{ activeLayer: string }>());
