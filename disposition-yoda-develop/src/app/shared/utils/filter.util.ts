import {Tour} from '@shared/models';
import {tourHasService} from '@shared/utils/tour.utils';

export const filterToursByServices = (filters, tours: Tour[]): Tour[] => {
  if (filters.serviceFilter.length === 0) {
    return tours;
  } else {
    const filteredList = [];
    if (filters.serviceFilter) {
      filters.serviceFilter.forEach((service: string) => {
        tours.forEach((tour: Tour) => {
          if (tourHasService(tour, service)) {
            filteredList.push(tour);
          }
        });
      });
    }
    return filteredList;
  }
};

export const filterSemiTrailer = (filters, tours: Tour[]): Tour[] => {
  if (filters.semiTrailerFilter) {
    const filtered = tours.filter((tour: Tour) => tour.tour.tournr !== '9999');
    return filtered.filter((tour: Tour) => tour.tour.tournr.startsWith('9'));
  } else {
    return tours;
  }
};

export const filterTruck = (filters, tours: Tour[]): Tour[] => {
  if (filters.truckFilter) {
    return tours.filter((tour: Tour) =>
      tour.tour.tournr.startsWith('5') ||
      tour.tour.tournr.startsWith('6') ||
      tour.tour.tournr.startsWith('7') ||
      tour.tour.tournr.startsWith('8'));
  } else {
    return tours;
  }
};

export const combineFilter = (filters, tours: Tour[]): Tour[] => {
  if (filters.combine) {
    const filtered = tours.filter((tour: Tour) => tour.tour.tournr !== '9999');
    return filtered.filter((tour: Tour) =>
      tour.tour.tournr.startsWith('5') ||
      tour.tour.tournr.startsWith('6') ||
      tour.tour.tournr.startsWith('7') ||
      tour.tour.tournr.startsWith('8') ||
      tour.tour.tournr.startsWith('9'));
  }else {
    return tours
  }
};


export const filterTourNumbers = (filters, unfilteredTours): Tour[] => {
  if (filters.tourFilter.length > 0) {
    let filteredList = [];
    filters.tourFilter.forEach((tourNr: string) => {
      const list = unfilteredTours.filter((tour: Tour) => tour.tour.tournr === tourNr);
      filteredList = filteredList.concat(list);
    });
    return filteredList;
  } else {
    return unfilteredTours;
  }
};
