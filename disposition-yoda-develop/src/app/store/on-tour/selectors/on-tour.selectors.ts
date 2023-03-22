import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import { OnTourState, } from '..';
import { State as SelectedTourState } from '../reducers/selected-tour.reducer';
import { State as TourListState } from '../reducers/on-tour-tourlist.reducer';

export const selectOnTourState: MemoizedSelector<object,
OnTourState> = createFeatureSelector<OnTourState>('onTour');

export const selectSelectedTourState = createSelector(
  selectOnTourState,
  (state: OnTourState) => state.selected);

export const selectSelectedTour = createSelector(
  selectSelectedTourState,
  (state: SelectedTourState) => state.tour
);

export const selectToursState = createSelector(
  selectOnTourState,
  (state: any) => state.tours );


export const selectAllTours = createSelector(
  selectToursState,
  (state: TourListState) => state.anfragen);


export const selectAllToursCount = createSelector(
  selectToursState,
  (state: TourListState) => state.count);

