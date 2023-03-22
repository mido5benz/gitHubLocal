import {Action, ActionReducer} from '@ngrx/store';
import {merge, pick} from 'lodash-es';

const setSavedState = (state: any, key: string): void => {
  localStorage.setItem(key, JSON.stringify(state));
};

const getSavedState = (key: string): any => JSON.parse(localStorage.getItem(key));

// the keys from state which we'd like to save.
const stateKeys = ['UI', 'ManualDispo', 'Stammdaten'];
const APP_STORAGE_KEY = 'app_storage';

export const storageMetaReducer = <S, A extends Action = Action>(reducer: ActionReducer<S, A>): any => {
  let onInit = true; // after load/refresh…
  return (state: S, action: A): S => {
    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(APP_STORAGE_KEY);
      return merge(nextState, savedState);
    }
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, APP_STORAGE_KEY);
    return nextState;
  };
};
