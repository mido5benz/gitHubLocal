import {initialLocationState, LOCATIONS_FEATURE_KEY, State as SitesState} from './locations/reducers/location.reducer';
import {initialSelectedStoppState, SELECTEDSTOPP_FEATURE_KEY, State as SelectedStoppState} from './stopps/reducers/selected-stopp.reducer';
import {initialMapFilterState, MAPFILTER_FEATURE_KEY, State as MapFilterState} from './map/reducers/map-filter.reducer';
import {initialReloadLineState, RELOADLINE_FEATURE_KEY, State as ReloadLineState} from './tour/reducers/reloadline.reducer';
import {initialRescheduleState, State as UmdispoState, RESCHEDULE_FEATURE_KEY} from './reschedule/reducers/reschedule.reducer';
import {initialSelectedTourState, SELECTEDTOUR_FEATURE_KEY, State as SelectedTourState} from './tour/reducers/selected-tour.reducer';
import {initialTourListState, State as TourListState, TOURLIST_FEATURE_KEY} from './tour/reducers/tour-list.reducer';
import {ACTIVATION_FEATURE_KEY, initialActivationState, State as Activation} from './activate-dispo/reducers/activate-manual-dispo.reducer';
import {DAILY_CLOSING_FEATURE_KEY, initialTagesabschlussState, State as DailyClosingState}
from './daily-closing/reducers/daily-closing.reducer';
import {
  CONSIGNMENT_FEATURE_KEY,
  initialSendungsDispoState,
  State as SendungsUmdispoState
} from '@store/manual-dispo/consignments/reducers/consignment.reducer';
import {initialStoppsState, State as StoppsState, STOPPS_FEATURE_KEY} from '@store/manual-dispo/stopps/reducers/stopps.reducer';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ManualDispoStoreKey = 'manualdispo';

export interface ManualDispoState {
  [SELECTEDTOUR_FEATURE_KEY]: SelectedTourState;
  [DAILY_CLOSING_FEATURE_KEY]: DailyClosingState;
  [MAPFILTER_FEATURE_KEY]: MapFilterState;
  [ACTIVATION_FEATURE_KEY]: Activation;
  [SELECTEDSTOPP_FEATURE_KEY]: SelectedStoppState;
  [RELOADLINE_FEATURE_KEY]: ReloadLineState;
  [LOCATIONS_FEATURE_KEY]: SitesState;
  [TOURLIST_FEATURE_KEY]: TourListState;
  [RESCHEDULE_FEATURE_KEY]: UmdispoState;
  [CONSIGNMENT_FEATURE_KEY]: SendungsUmdispoState;
  [STOPPS_FEATURE_KEY]: StoppsState;
}

export const initialState: ManualDispoState = {
  [SELECTEDTOUR_FEATURE_KEY]: initialSelectedTourState,
  [DAILY_CLOSING_FEATURE_KEY]: initialTagesabschlussState,
  [MAPFILTER_FEATURE_KEY]: initialMapFilterState,
  [ACTIVATION_FEATURE_KEY]: initialActivationState,
  [SELECTEDSTOPP_FEATURE_KEY]: initialSelectedStoppState,
  [RELOADLINE_FEATURE_KEY]: initialReloadLineState,
  [LOCATIONS_FEATURE_KEY]: initialLocationState,
  [TOURLIST_FEATURE_KEY]: initialTourListState,
  [RESCHEDULE_FEATURE_KEY]: initialRescheduleState,
  [CONSIGNMENT_FEATURE_KEY]: initialSendungsDispoState,
  [STOPPS_FEATURE_KEY]: initialStoppsState,
};
