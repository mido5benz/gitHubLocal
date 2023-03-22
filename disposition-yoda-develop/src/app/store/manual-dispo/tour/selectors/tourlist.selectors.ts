import {ManualDispoState} from '@store/manual-dispo/manual-dispo.state';
import {AvailableTour, Tour} from '@models/index';
import {createSelector} from '@ngrx/store';
import {selectManualDispoState} from '@store/manual-dispo/manual-dispo.selectors';
import {State as TourListState, TOURLIST_FEATURE_KEY} from '@store/manual-dispo/tour/reducers/tour-list.reducer';

export const selectTourListState = createSelector(
  selectManualDispoState,
  (state: ManualDispoState) => state[TOURLIST_FEATURE_KEY]);

export const selectTourListIsLoading = (state: TourListState): boolean => state.loading;
export const selectTourListLoaded = (state: TourListState): boolean => state.loaded;
export const selectReloadIndexUpdate = (state: TourListState): boolean => state.reloadIndexUpdate;
export const selectAllTours = (state: TourListState): Tour[] => state.all;
export const selectFilteredTours = (state: TourListState): Tour[] => state.filtered;

export const getLoading = createSelector(selectTourListState, selectTourListIsLoading);
export const getLoaded = createSelector(selectTourListState, selectTourListLoaded);
export const getReloadIndexUpdate = createSelector(selectTourListState, selectReloadIndexUpdate);
export const getAllTours = createSelector(selectTourListState, selectAllTours);
export const getFilteredTours = createSelector(selectTourListState, selectFilteredTours);

export const getUnassignedStoppsTour = createSelector(
  getAllTours,
  (tourList) => tourList.filter((mTour: Tour) => mTour.tour.tournr === '9999')
);

const getErrorCount = (allTours): number => {
  const emptyTour: Tour = allTours.find((mTour: Tour) => mTour.tour.tournr === '9999');
  return emptyTour?.dispostopps.filter((stopp) => stopp.ziel_name === null).length;
};

const getCount = (allTours): number => {
  const emptyTour: Tour = allTours.find((mTour: Tour) => mTour.tour.tournr === '9999');
  return emptyTour?.dispostopps.filter((stopp) => stopp.ziel_name !== null).length;
};

export const getUnassignedStoppCount = createSelector(
  getAllTours,
  getCount
);

export const getErrorStoppCount = createSelector(
  getAllTours,
  getErrorCount
);

export const getTourById = createSelector(
  getAllTours,
  (tourList, {tourId}) => tourList.find((tour: Tour) => tour.tour.tour_id === tourId)
);

export const getVisibleTourByTourNr = createSelector(
  getAllTours,
  (tourList, props) => tourList.filter((mTour: Tour) => mTour.tour.tournr.startsWith(props.tourNr))
    .filter((t: Tour) => t.tour.tournr !== '9999').sort((a,b) => a.tour.tournr < b.tour.tournr ? -1 : 1)
);

export const getCompleteTourList = createSelector(selectTourListState, (state) => state.completeTourList);

export const getTourByNr = createSelector(
  getCompleteTourList,
  (tourList, {tourNr}) => {
    if (!tourList) {
      return [];
    }
    return tourList.filter((tour: AvailableTour) => tour.tournr.startsWith(tourNr));
  }
);

export const getTourByTourNr = createSelector(
  getCompleteTourList,
  (tourList, props) => tourList.filter((mTour: any) => mTour.tournr.startsWith(props.tourNr))
    .filter((t: any) => t.tournr !== '9999')
);

export const getAllToursWithout9999 = createSelector(
  getAllTours,
  (tourList) => tourList.filter((t: any) => t.tour.tournr !== '9999')
);
