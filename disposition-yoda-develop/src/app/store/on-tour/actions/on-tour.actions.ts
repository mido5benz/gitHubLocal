import {Aenderungswunsch, Anfrage} from '@models/on-tour/aenderungswunsch.model';
import {createAction, props} from '@ngrx/store';

export const setSelectedTour = createAction('[ON TOUR] Set selected tour', props<{ selectedTour: any }>());

export const fetchOnTourlistRequest = createAction('[ON TOUR] FETCH ALL TOURS REQUEST');
export const fetchOnTourlistRequestSuccess = createAction('[ON TOUR] FETCH ALL TOURS SUCCESS', props<{ completeOnTourList: any }>());
export const fetchOnTourlistRequestFailure = createAction('[ON TOUR] FETCH ALL TOURS FAILURE', props<{ error: any }>());

export const acceptOnTourChange = createAction('[ON TOUR] ACCEPT ON TOUR CHANGE', props<{ change: Anfrage }>());
export const acceptOnTourChangeSuccess = createAction('[ON TOUR] ACCEPT ON TOUR CHANGE SUCCESS', props<{ status: any }>());
export const acceptOnTourChangeFailure = createAction('[ON TOUR] ACCEPT ON TOUR CHANGE FAILURE', props<{ error: any }>());

export const declineOnTourChange = createAction('[ON TOUR] DECLINE ON TOUR CHANGE', props<{ change: Anfrage }>());
export const declineOnTourChangeSuccess = createAction('[ON TOUR] DECLINE ON TOUR CHANGE SUCCESS', props<{ status: any }>());
export const declineOnTourChangeFailure = createAction('[ON TOUR] DECLINE ON TOUR CHANGE FAILURE', props<{ error: any }>());

export const fetchCounterSuccess = createAction('[ON TOUR] FETCH COUNTER SUCCESS', props<{ aenderungswunsch: Aenderungswunsch }>());

