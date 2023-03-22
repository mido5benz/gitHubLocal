import * as fromFilter from '../reducers/map-filter.reducer';
import {initialMapFilterState, State} from '../reducers/map-filter.reducer';
import * as filterActions from '../actions/map-filter.actions';
import {MapTourFilter} from '@models/index';

describe('Filter reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const state = fromFilter.reducer(undefined, {type: ''});

      expect(state).toBe(initialMapFilterState);
    });

    it('dispatch apply map reset action', () => {

      const initialState: State = {
        tours: [],
        services: [],
        vehicleType: '2312',
        semiTrailer: true,
        truck: true,
      };

      const state = fromFilter.reducer(initialState, filterActions.resetMapFilter);

      const expectedState = {
        tours: [],
        services: [],
        vehicleType: '0',
        semiTrailer: false,
        truck: false,
      };

      expect(state).toEqual(expectedState);
    });

    it('dispatch apply map filter action', () => {

      const tourFilter: MapTourFilter = {
        tours: [],
        services: [],
        vehicleType: 'kfz',
        semiTrailer: true,
        truck: true,
      };

      const state = fromFilter.reducer(initialMapFilterState, filterActions.applyMapFilter({
        tourFilter
      }));

      const expectedState = {
        tours: [],
        services: [],
        vehicleType: 'kfz',
        semiTrailer: true,
        truck: true,
      };

      expect(state).toEqual(expectedState);
    });
  });
});
