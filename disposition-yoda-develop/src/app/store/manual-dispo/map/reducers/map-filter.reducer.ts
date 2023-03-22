import {Action, createReducer, on} from '@ngrx/store';
import * as mapFilterActions from '../actions/map-filter.actions';

export const MAPFILTER_FEATURE_KEY = 'mapFilter';

export interface State {
  tours: string[];
  services: string[];
  vehicleType: string;
  semiTrailer: boolean;
  truck: boolean;
  combine: boolean;
}

export const initialMapFilterState: State = {
  tours: [],
  services: [],
  vehicleType: '0',
  semiTrailer: false,
  truck: false,
  combine: false
};

const selectedMapFilterReducer = createReducer(
  initialMapFilterState,
  on(mapFilterActions.applyMapFilter, (state, props) => ({
      ...state,
      tours: props.tourFilter.tours,
      services: props.tourFilter.services,
      vehicleType: props.tourFilter.vehicleType,
      semiTrailer: props.tourFilter.semiTrailer,
      truck: props.tourFilter.truck,
      combine: props.tourFilter.combine
    })),
  on(mapFilterActions.resetMapFilter, (state) => initialMapFilterState)
);

export const reducer = (state: State | undefined, action: Action): State => selectedMapFilterReducer(state, action);

export const selectedTourFilter = (state: State) => state.tours;
export const selectedServiceFilter = (state: State) => state.services;
export const selectedVehicelClassFilter = (state: State) => state.vehicleType;
export const selectedSemiTrailerFilter = (state: State) => state.semiTrailer;
export const selectedTruckFilter = (state: State) => state.truck;
export const selectedCombineFilter = (state: State) => state.combine;
