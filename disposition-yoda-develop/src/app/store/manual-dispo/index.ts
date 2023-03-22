import {combineReducers} from '@ngrx/store';

import {reducer as activateDispoReducer} from './activate-dispo/reducers/activate-manual-dispo.reducer';
import {reducer as dailyClosingReducer} from './daily-closing/reducers/daily-closing.reducer';
import {reducer as selectedStoppReducer} from './stopps/reducers/selected-stopp.reducer';
import {reducer as locationsReducer} from './locations/reducers/location.reducer';
import {reducer as mapFilterReducer} from './map/reducers/map-filter.reducer';
import {reducer as selectedTourReducer} from './tour/reducers/selected-tour.reducer';
import {reducer as tourListReducer} from './tour/reducers/tour-list.reducer';
import {reducer as umdispoReducer} from './reschedule/reducers/reschedule.reducer';
import {reducer as consignmentReducer} from './consignments/reducers/consignment.reducer';
import {reducer as stoppsReducer} from './stopps/reducers/stopps.reducer';

import {DAILY_CLOSING_FEATURE_KEY} from '@store/manual-dispo/daily-closing/reducers/daily-closing.reducer';
import {MAPFILTER_FEATURE_KEY} from '@store/manual-dispo/map/reducers/map-filter.reducer';
import {CONSIGNMENT_FEATURE_KEY} from '@store/manual-dispo/consignments/reducers/consignment.reducer';
import {ACTIVATION_FEATURE_KEY} from '@store/manual-dispo/activate-dispo/reducers/activate-manual-dispo.reducer';
import {SELECTEDSTOPP_FEATURE_KEY} from '@store/manual-dispo/stopps/reducers/selected-stopp.reducer';
import {LOCATIONS_FEATURE_KEY} from '@store/manual-dispo/locations/reducers/location.reducer';
import {SELECTEDTOUR_FEATURE_KEY} from '@store/manual-dispo/tour/reducers/selected-tour.reducer';
import {TOURLIST_FEATURE_KEY} from '@store/manual-dispo/tour/reducers/tour-list.reducer';
import {RESCHEDULE_FEATURE_KEY} from '@store/manual-dispo/reschedule/reducers/reschedule.reducer';
import {STOPPS_FEATURE_KEY} from '@store/manual-dispo/stopps/reducers/stopps.reducer';

const reducers = combineReducers(
  {
    [DAILY_CLOSING_FEATURE_KEY]: dailyClosingReducer,
    [ACTIVATION_FEATURE_KEY]: activateDispoReducer,
    [SELECTEDSTOPP_FEATURE_KEY]: selectedStoppReducer,
    [LOCATIONS_FEATURE_KEY]: locationsReducer,
    [MAPFILTER_FEATURE_KEY]: mapFilterReducer,
    [SELECTEDTOUR_FEATURE_KEY]: selectedTourReducer,
    [TOURLIST_FEATURE_KEY]: tourListReducer,
    [RESCHEDULE_FEATURE_KEY]: umdispoReducer,
    [CONSIGNMENT_FEATURE_KEY]: consignmentReducer,
    [STOPPS_FEATURE_KEY]: stoppsReducer
  }
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function manualDispoReducer(state, action): any {
  return reducers(state, action);
}
