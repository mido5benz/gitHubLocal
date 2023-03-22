import {isBetween, resetDate, sameOrAfter, sameOrBefore} from '../time.utils';
import moment from 'moment';

describe('time utils', () => {

  describe('sameOrBefore', () => {
    it('should return true because the passed date is the same as the given date', () => {
      const dateToCheck = new Date('1995-12-17T12:00:00');
      const givenDate = new Date('1995-12-17T12:00:00');

      const isSame = sameOrBefore(dateToCheck, givenDate);
      expect(isSame).toBe(true);
    });

    it('should return true because the passed date is before as the given date', () => {
      const dateToCheck = new Date('1995-12-17T11:00:00');
      const givenDate = new Date('1995-12-17T12:00:00');

      const isSame = sameOrBefore(dateToCheck, givenDate);
      expect(isSame).toBe(true);
    });

    it('should return false because the passed date is after as the given date', () => {
      const dateToCheck = new Date('1995-12-17T12:01:00');
      const givenDate = new Date('1995-12-17T12:00:00');

      const isSame = sameOrBefore(dateToCheck, givenDate);
      expect(isSame).toBe(false);
    });

    it('should return false because the passed date is after as the given date and days are different', () => {
      const dateToCheck = new Date('1995-12-17T12:01:00');
      const givenDate = new Date('1995-12-10T12:00:00');

      const isSame = sameOrBefore(dateToCheck, givenDate, true);
      expect(isSame).toBe(false);
    });

    it('should return true because the passed date is before the given date and days are different', () => {
      const dateToCheck = new Date('1995-12-17T11:01:00');
      const endTime = new Date('1995-12-10T12:00:00');

      const isSame = sameOrBefore(dateToCheck, endTime, true);
      expect(isSame).toBe(true);
    });
  });

  describe('sameOrAfter', () => {
    it('should return true because the passed date is the same as the given date', () => {
      const dateToCheck = new Date('1995-12-17T12:00:00');
      const givenDate = new Date('1995-12-17T12:00:00');

      const isSame = sameOrAfter(dateToCheck, givenDate);
      expect(isSame).toBe(true);
    });

    it('should return true because the passed date is the after as the given date', () => {
      const dateToCheck = new Date('1995-12-17T12:15:00');
      const givenDate = new Date('1995-12-17T12:00:00');

      const isSame = sameOrAfter(dateToCheck, givenDate);
      expect(isSame).toBe(true);
    });

    it('should return false because the passed date is the before as the given date', () => {
      const dateToCheck = new Date('1995-12-17T11:00:00');
      const givenDate = new Date('1995-12-17T12:00:00');

      const isSame = sameOrAfter(dateToCheck, givenDate);
      expect(isSame).toBe(false);
    });
  });

  describe('isBetween', () => {
    it('Should return true because the given time is between start and end', () => {

      const startDate = new Date('1995-12-17T12:00:00');
      const endDate = new Date('1995-12-17T18:00:00');
      const givenDate = new Date('1995-12-17T14:00:00');

      const isDateBetween = isBetween(startDate, endDate, givenDate);
      expect(isDateBetween).toBe(true);
    });

    it('Should return false because the given time is before the start date', () => {

      const startDate = new Date('1995-12-17T12:00:00');
      const endDate = new Date('1995-12-17T18:00:00');
      const givenDate = new Date('1995-12-17T10:00:00');

      const isDateBetween = isBetween(startDate, endDate, givenDate);
      expect(isDateBetween).toBe(false);
    });

    it('Should return false because the given time is after the end date', () => {

      const startDate = new Date('1995-12-17T12:00:00');
      const endDate = new Date('1995-12-17T18:00:00');
      const givenDate = new Date('1995-12-17T20:00:00');

      const isDateBetween = isBetween(startDate, endDate, givenDate);
      expect(isDateBetween).toBe(false);
    });

    it('Should return false because the given time is equal the start date', () => {

      const startDate = new Date('1995-12-17T12:00:00');
      const endDate = new Date('1995-12-17T18:00:00');
      const givenDate = new Date('1995-12-17T12:00:00');

      const isDateBetween = isBetween(startDate, endDate, givenDate);
      expect(isDateBetween).toBe(true);
    });

    it('Should return true because the given time is equal the end date', () => {

      const startDate = new Date('1995-12-17T12:00:00');
      const endDate = new Date('1995-12-17T18:00:00');
      const givenDate = new Date('1995-12-17T18:00:00');

      const isDateBetween = isBetween(startDate, endDate, givenDate);
      expect(isDateBetween).toBe(true);
    });

    it('Should return true because the given time is between the requested times', () => {

      const startDate = new Date('1995-12-17T08:02:00');
      const endDate = new Date('1995-12-17T18:50:00');
      const givenDate = new Date('1995-12-17T08:30:00');

      const isDateBetween = isBetween(startDate, endDate, givenDate);
      expect(isDateBetween).toBe(true);
    });
  });

  describe('resetDate', () => {
    it('should set the day and month to 0 and the year to 1970', () => {
      const dateToReset = new Date('1995-12-17T08:02:00');
      const resettedDate = resetDate(dateToReset);

      expect(resettedDate).toEqual(moment(new Date('1970-01-01T08:02:00')));
    });
  });
});
