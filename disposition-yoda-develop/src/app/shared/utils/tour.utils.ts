import {DispoStopp, DispoSum, Tour, TourSum} from '@shared/models';
import {getServiceTypeFromServiceName} from '@shared/utils/service.util';
import {getServiceAttributeFromServiceType} from '@shared/utils/dispostopp.utils';
import {ServiceType} from '@shared/utils/serviceType';

export const swapSollStopps = (stopps, previousIndex, currentIndex) => {
  let obj1 = {...previousIndex};
  let obj2 = {...currentIndex};

  let filteredStopp1 = stopps.filter((stop) => stop.dispostopp_id !== obj1.dispostopp_id);
  let filteredStopp2 = filteredStopp1.filter((stop) => stop.dispostopp_id !== obj2.dispostopp_id);

  [obj1.soll_stopp, obj2.soll_stopp] = [obj2.soll_stopp, obj1.soll_stopp];

  filteredStopp2.push(obj1);
  filteredStopp2.push(obj2);

  return filteredStopp2;
};

export const swapStopps = (arr: any, oldIndex: number, newIndex: number): void => {
  [arr[oldIndex], arr[newIndex]] = [arr[newIndex], arr[oldIndex]];
};

// eslint-disable-next-line no-shadow
export const createDictionaryForTourList = <Tour>(array: Array<Tour>): { [p: string]: Tour } => {
  if (!array) {
    return {};
  }

  const normalizedObject: any = {};
  array.forEach((item: any) => {
    const key = item.tour.tour_id;
    normalizedObject[key] = item;
  });

  return normalizedObject as { [key: string]: Tour };
};

export const createTotalSums = (tour: Tour): TourSum => {
  let abendSum, colSum, gewichtSum, kl7Sum, ggPunkteSum, p10Sum, p12Sum, p8Sum, p9Sum, palSum, sendungSum, tmSum, amb_sum, istColSum, sollColSum, istPalSum, sollPalSum, istGewichtSum, sollGewichtSum;

  abendSum = tour?.abendSum;
    colSum = tour?.colSum;
    gewichtSum = tour?.gewichtSum;
    kl7Sum = tour?.kl7Sum;
    ggPunkteSum = tour?.ggPunkteSum;
    p10Sum = tour?.p10Sum;
    p12Sum = tour?.p12Sum;
    p9Sum = tour?.p9Sum;
    p8Sum = tour?.p8Sum;
    palSum = tour?.palSum;
    sendungSum = tour?.sendungSum;
    tmSum = tour?.tmSum;
    amb_sum = tour?.amb_sum;
    istColSum = tour?.istColSum;
    sollColSum = tour?.sollColSum;
    istPalSum = tour?.istPalSum;
    sollPalSum = tour?.sollPalSum;
    istGewichtSum = tour?.istGewichtSum;
    sollGewichtSum = tour?.sollGewichtSum;


  return {
    abendSum,
    colSum,
    gewichtSum,
    kl7Sum,
    ggPunkteSum,
    p10Sum,
    p12Sum,
    p8Sum,
    p9Sum,
    palSum,
    sendungSum,
    tmSum,
    amb_sum,
    istColSum,
    sollColSum,
    istPalSum,
    sollPalSum,
    istGewichtSum,
    sollGewichtSum,
  };
};

export const createReloadStopp = (): DispoStopp => ({
  dispostopp_id: null,
  soll_stopp: 12345,
  nachladebereich: null,
  isReloadStopp: true,
  sum: null
});

export const isAmbientTour = (tour: Tour): string => tour.amb_sum > 0 ? 'Ja' : 'Nein';

export const tourHasService = (tour: Tour, service: string): boolean => {
  const serviceType: ServiceType = getServiceTypeFromServiceName(service);
  const serviceTypeKey = getServiceAttributeFromServiceType(serviceType);

  // Check if the tour has the given key
  if (tour.hasOwnProperty(serviceTypeKey)) {
    const serviceSum = tour[serviceTypeKey];
    return serviceSum > 0;
  }
  return false;
};

export const createAssignedStopps = (tourList: Tour[]): any => {
  if (!tourList) {
    return {};
  }

  const remainingTours = tourList.filter((tour: Tour) => tour.tour.tournr !== '9999');
  const stopps = {};

  remainingTours.forEach((tour: Tour) => {
    const dispoStopps = tour.dispostopps;

    for (let i = 0; i < dispoStopps.length; i++) {
      dispoStopps[i] = Object.assign(dispoStopps[i], {
        sum: tour.dispostoppssum.find((sum: DispoSum) => sum.dispostopp_id === dispoStopps[i].dispostopp_id),
        tournr: tour.tour.tournr,
        selected: false
      });
    }

    stopps[tour.tour.tour_id] = dispoStopps;
  });

  return stopps;
};

export const createUnassignedStopps = (tour: Tour): DispoStopp[] => {
  const unassignedStoppsTour: Tour = tour;
  const unassignedStopps: DispoStopp[] = unassignedStoppsTour ? unassignedStoppsTour.dispostopps : [];

  for (let i = 0; i < unassignedStopps.length; i++) {
    unassignedStopps[i] = Object.assign(unassignedStopps[i], {
      tournr: tour.tour.tournr,
      selected: false,
      sum: tour.dispostoppssum.find((sum: DispoSum) => sum.dispostopp_id === unassignedStopps[i].dispostopp_id)
    });
  }

  return unassignedStopps;
};

export const isVirtualTour = (tour: Tour) => tour.tour.tournr === '9999';
