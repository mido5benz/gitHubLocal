import {createSelector} from '@ngrx/store';
import {State} from '@store/manual-dispo/tour/reducers/selected-tour.reducer';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';

export const getSelectedTourState = createSelector(selectManualDispoState, (state: ManualDispoState) => state.selectedTour);
export const getTourNr = createSelector(getSelectedTourState, (state: State) => state.nr);
export const getAusliefertag = createSelector(getSelectedTourState, (state: State) => state.ausliefertag);
export const getTourDuration = createSelector(getSelectedTourState, (state: State) => state.duration);
export const getStopps = createSelector(getSelectedTourState, (state: State) => state.stopps);
export const getStoppsWithReload = createSelector(getSelectedTourState, (state: State) => state.stoppsWithReloadItem);
export const getTourId = createSelector(getSelectedTourState, (state: State) => state.id);
export const getSums = createSelector(getSelectedTourState, (state, {stoppId}) => state.stoppSums[stoppId]);
export const getTourSums = createSelector(getSelectedTourState, (state) => state.tourSums);
export const getReloadEditable = createSelector(getSelectedTourState, (state) => state.reloadEditable);
export const getLoading = createSelector(getSelectedTourState, (state: State) => state.loading);
export const isFrozen = createSelector(getSelectedTourState, (state: State) => state.frozen);
export const getReloadLineIndex = createSelector(getSelectedTourState, (state: State) => state.reloadLineIndex);
export const getKennzeichnungsPflicht = createSelector(getSelectedTourState, (state: State) => state.kennzeichenpflichtig);
export const getAbgefertigt = createSelector(getSelectedTourState, (state: State) => state.abgefertigt);
export const getPotenziellGleicheZieleVorhanden = createSelector(getSelectedTourState, (state: State) => state.potentiell_gleiche_ziele);
