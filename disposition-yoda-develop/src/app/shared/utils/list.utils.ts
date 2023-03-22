import {DispoStopp} from '@shared/models';

export const createDictionaryFromArray = <T>(array: Array<T>, indexKey: keyof T): { [p: string]: T } => {
  if (array) {
    const normalizedObject: any = {};

    array.forEach(item => {
      const key = item[indexKey];
      normalizedObject[key] = item;
    });
    return normalizedObject as { [key: string]: T };
  }
};

export const groupBy = (xs, key): any => xs.reduce((rv, x) => {
  (rv[x[key]] = rv[x[key]] || []).push(x);
  return rv;
}, {});

export const removeReloadLine = (stopps: DispoStopp[]): DispoStopp[] => {
  const reloadLineIndex = stopps.findIndex((stopp) => stopp.isReloadStopp);
  if (reloadLineIndex === -1) {
    return stopps;
  }
  return stopps.splice(reloadLineIndex, 1);
};

export const getReloadLineIndex = (stopps: DispoStopp[]): number => stopps.findIndex((stopp) => stopp.isReloadStopp);

export const addReloadLine = (stopps: DispoStopp[], reloadLineIndex: number): DispoStopp[] => {

  if (getReloadLineIndex(stopps) !== -1) {
    return [...stopps];
  }

  const reloadStopp: DispoStopp = {
    dispostopp_id: null,
    soll_stopp: null,
    nachladebereich: null,
    isReloadStopp: true
  };

  const stoppListWithReloadItem = [...stopps];

  if (!reloadLineIndex || reloadLineIndex >= stoppListWithReloadItem.length) {
    stoppListWithReloadItem.push(reloadStopp);
  } else {
    stoppListWithReloadItem.splice(reloadLineIndex, 0, reloadStopp);
  }

  return stoppListWithReloadItem;
};

// export const swapSollStoppNumbers = (stopps: DispoStopp[], sourceIndex: number, targetIndex: number): DispoStopp[] => {
//   const stoppList = [...stopps].filter((stopp: DispoStopp) => !stopp.isReloadStopp);
//   const sourceStopp: DispoStopp = stoppList[sourceIndex];
//   const targetStopp: DispoStopp = stoppList[targetIndex];
//
//   stoppList[sourceIndex] = setSollStoppNumber(sourceStopp, targetStopp?.soll_stopp);
//   stoppList[targetIndex] = setSollStoppNumber(targetStopp, sourceStopp?.soll_stopp);
//
//   return stoppList;
// };

// eslint-disable-next-line @typescript-eslint/naming-convention

// export const setSollStoppNumber = (stopp: DispoStopp, sollStoppNumber: number) => ({...stopp, soll_stopp: sollStoppNumber});
export const sortStopplist = (stoppList: DispoStopp[]): DispoStopp[] => {
  const stoppsWithNoSollStoppNr = stoppList.filter((stopp: DispoStopp) => stopp.soll_stopp === null);
  let sortedList = stoppList.filter((stopp: DispoStopp) => stopp.soll_stopp !== null);
  sortedList = sortedList.sort((x1, x2) => x1.soll_stopp - x2.soll_stopp);
  sortedList = sortedList.concat(stoppsWithNoSollStoppNr);
  return sortedList;
};
export const isIndexBehindReloadLine = (stoppList: DispoStopp[], droppedItemIndex: number): boolean => {
  const reloadLineIndex = getReloadLineIndex(stoppList);

  if (reloadLineIndex === -1) {
    return false;
  }
  return droppedItemIndex >= reloadLineIndex;
};
