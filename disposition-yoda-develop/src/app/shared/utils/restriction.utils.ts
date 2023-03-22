import {Zeitfenster} from '@models/recipient/recipient.models';
import {isBetween, resetDate} from './time.utils';
import * as moment from 'moment';

let currentTimeFailed: boolean = false;


export const timeFramesValidForGivenWeekday = (timeFrames: Zeitfenster[],
                                               currentTimeFrame: Zeitfenster, timeOnly = false): boolean => {
  if (timeFrames.length === 0 &&
    timeFrames.findIndex((tFrame: Zeitfenster) => tFrame.wochentag === currentTimeFrame.wochentag) === -1) {
    return true;
  }

  const timeFramesForGivenDay = timeFrames.filter(tFrame => tFrame.wochentag === currentTimeFrame.wochentag);
  const timeBox = getTimeBox(timeFramesForGivenDay, currentTimeFrame);

  if (!currentTimeFailed) {
    return false;
  }

  for (const existingTimeFrame of timeFramesForGivenDay) {
    if (violatesTimeBox(existingTimeFrame, timeBox, timeOnly)) {
      return false;
    }

    const isValid = timeFrameValid(currentTimeFrame, existingTimeFrame, timeOnly);

    if (!isValid) {
      return false;
    }
  }

  return true;
};

export const timeFrameValid = (timeFrameToCheck: Zeitfenster, existingTimeFrames: Zeitfenster, timeOnly: boolean) => {
  const start = existingTimeFrames.von;
  const end = existingTimeFrames.bis;

  if (isBetween(start, end, timeFrameToCheck.von, timeOnly)) {
    return false;
  }

  return !isBetween(start, end, timeFrameToCheck.bis, timeOnly);
};

export const getTimeBox = (timeFramesForGivenDay: Zeitfenster[], currentTimeFrame: Zeitfenster) => {
  const startDateListVon = timeFramesForGivenDay.map((tf: Zeitfenster) => resetDate(tf.von));
  const startDateListBis = timeFramesForGivenDay.map((tf: Zeitfenster) => resetDate(tf.bis));

  const minDateVon = moment.min(startDateListVon);
  const maxDateBis = moment.max(startDateListBis);

  let currentTimeFrameVon = currentTimeFrame.von;
  let currentTimeFrameBis = currentTimeFrame.bis;

  if (timeFramesForGivenDay.length > 0) {
      for (let timeFrame of timeFramesForGivenDay) {

      let timeFrameVon = timeFrame.von;
      let timeFrameBis = timeFrame.bis;

      if (currentTimeFrameVon < timeFrameVon && currentTimeFrameBis > timeFrameBis) {
        currentTimeFailed = false;
        break;

      } else {
        currentTimeFailed = true;
      }
    }
  } else {
    /*
     Es ist kein currentTimeFailed! Wenn der Array leer ist, wird currentTimeFailed auf true gesetzt,
     da es standardmäßig auf false gesetzt ist.
     */
     currentTimeFailed = true;
  }

  return {min: minDateVon, max: maxDateBis};
};

export const violatesTimeBox =
  (timeFrame: Zeitfenster, timeBox: { min: moment.Moment; max: moment.Moment }, timeOnly: boolean): boolean => {
    const timeBoxTimeFrame = createTimeFrameFromTimeBox(timeBox);

    const startBetween = isBetween(timeBoxTimeFrame.von, timeBoxTimeFrame.bis, timeFrame.von, timeOnly);
    const endBetween = isBetween(timeBoxTimeFrame.von, timeBoxTimeFrame.bis, timeFrame.bis, timeOnly);

    return !startBetween || !endBetween;
  };

export const createTimeFrameFromTimeBox = (timeBox: { min: moment.Moment; max: moment.Moment }): Zeitfenster => ({
  von: timeBox.min.toDate(),
  bis: timeBox.max.toDate(),
});
