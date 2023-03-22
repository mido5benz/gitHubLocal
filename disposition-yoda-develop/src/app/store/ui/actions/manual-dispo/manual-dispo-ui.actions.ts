import {createAction} from '@ngrx/store';

export const TOGGLE_TOUR_DETAILS = '[Manual Dispo] Collapse details';
export const toggleTourDetail = createAction(TOGGLE_TOUR_DETAILS);

export const TOGGLE_TOUR_TABLE = '[Manual Dispo] Collapse table';
export const toggleTourTable = createAction(TOGGLE_TOUR_TABLE);

export const TOGGLE_MAPFILTER = '[Manual Dispo] Toggle map filter';
export const toggleMapFilter = createAction(TOGGLE_MAPFILTER);

export const openTourDetails = createAction('[Manual Dispo] Open tour details');

export const closeTourDetails = createAction('[Manual Dispo] Close tour details')
