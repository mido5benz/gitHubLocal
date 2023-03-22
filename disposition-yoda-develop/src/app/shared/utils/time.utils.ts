import moment from 'moment';

export const sameOrAfter = (timeToCheck: Date, startTime: Date, timeOnly = false): boolean => {
  const time = moment(timeToCheck);
  const beforeTime = moment(startTime);

  if (timeOnly) {
    const [resettedTimeToCheck, resettedEndTime] = resetDates(timeToCheck, startTime);
    return resettedTimeToCheck.isSameOrAfter(resettedEndTime);
  }

  return time.isSameOrAfter(beforeTime);
};

export const sameOrBefore = (timeToCheck: Date, endTime: Date, timeOnly = false): boolean => {
  const beforeTime = moment(timeToCheck);
  const time = moment(endTime);

  if (timeOnly) {
    const [resettedTimeToCheck, resettedEndTime] = resetDates(timeToCheck, endTime);
    return resettedTimeToCheck.isSameOrBefore(resettedEndTime);
  }

  return beforeTime.isSameOrBefore(time);
};

export const resetDates = (dateOne: Date, dateTwo: Date) => [
  moment(dateOne).month(0).date(1).year(1970),
  moment(dateTwo).month(0).date(1).year(1970)
];

export const resetDate = (dateToReset: Date) => moment(dateToReset).date(1).month(0).year(1970);

export const isBetween = (startTime: Date, endTime: Date, timeToCheck: Date, timeOnly = false): boolean => {
  const sameAfter = sameOrAfter(timeToCheck, startTime, timeOnly);
  const sameBefore = sameOrBefore(timeToCheck, endTime, timeOnly);

  return sameAfter && sameBefore;
};
