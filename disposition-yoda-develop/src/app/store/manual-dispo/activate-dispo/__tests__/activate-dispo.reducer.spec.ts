import {initialActivationState} from '@store/manual-dispo/activate-dispo/reducers/activate-manual-dispo.reducer';

import * as fromActivateDispo from '../reducers/activate-manual-dispo.reducer';
import {
  activateManualDispoFailed,
  activateManualDispoRequest,
  activateManualDispoSuccess
} from '@store/manual-dispo/activate-dispo/actions/activate-dispo.actions';

describe('ActivateDispo reducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const state = fromActivateDispo.reducer(undefined, {type: ''});
      expect(state).toBe(initialActivationState);
    });
  });

  describe('activate manual dispo request action', () => {
    it('action should set the loading property to true', () => {
      const state = fromActivateDispo.reducer(initialActivationState, activateManualDispoRequest);
      expect(state.loading).toBeTruthy();
    });
  });

  describe('activate manual dispo success action', () => {
    it('action should set the loading property to false', () => {
      const state = fromActivateDispo.reducer(initialActivationState, activateManualDispoSuccess);
      expect(state.loading).toBeFalsy();
    });

    it('action should set the isActive property to true', () => {
      const state = fromActivateDispo.reducer(initialActivationState, activateManualDispoSuccess);
      expect(state.isActive).toBeTruthy();
    });
  });

  describe('activate manual dispo failed action', () => {
    it('action should set the loading property to false', () => {
      const state = fromActivateDispo.reducer(initialActivationState, activateManualDispoFailed);
      expect(state.loading).toBeFalsy();
    });

    it('action should set the isActive property to false', () => {
      const state = fromActivateDispo.reducer(initialActivationState, activateManualDispoFailed);
      expect(state.isActive).toBeFalsy();
    });
  });
});
