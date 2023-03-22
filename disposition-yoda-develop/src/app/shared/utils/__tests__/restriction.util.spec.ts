import {getTimeBox, timeFramesValidForGivenWeekday, violatesTimeBox} from '../restriction.utils';
import {Zeitfenster} from '@models/recipient/recipient.models';
import moment from 'moment';

describe('restriction utils', () => {
  describe('Timeframe validation', () => {
    it('Timeframe is valid because there is no timeframe present with the given weedkday number', () => {
      const timeFrames: Zeitfenster[] = [];

      const givenTimeFrame: Zeitfenster = {
        von: new Date('1995-12-17T12:00:00'),
        bis: new Date('1995-12-17T20:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      };

      const isValid = timeFramesValidForGivenWeekday(timeFrames, givenTimeFrame);
      expect(isValid).toBe(true);
    });

    it('Timeframe is valid because there is no timeframe given for that weekday', () => {
      const timeFrames: Zeitfenster[] = [{
        von: new Date('1995-12-17T08:00:00'),
        bis: new Date('1995-12-17T10:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      }];

      const givenTimeFrame: Zeitfenster = {
        von: new Date('1995-12-17T12:00:00'),
        bis: new Date('1995-12-17T20:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      };

      const isValid = timeFramesValidForGivenWeekday(timeFrames, givenTimeFrame);
      expect(isValid).toBe(true);
    });

    it('Timeframe is not valid because there is a timeframe present with the given weedkday number and the same start and end date', () => {
      const timeFrames: Zeitfenster[] = [{
        von: new Date('1995-12-17T12:00:00'),
        bis: new Date('1995-12-17T20:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      }];

      const givenTimeFrame: Zeitfenster = {
        von: new Date('1995-12-17T12:00:00'),
        bis: new Date('1995-12-17T20:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      };

      const isValid = timeFramesValidForGivenWeekday(timeFrames, givenTimeFrame);
      expect(isValid).toBe(false);
    });

    it('Timeframe is not valid because there is a timeframe present with the given weedkday number and the same start and end date', () => {
      const timeFrames: Zeitfenster[] = [{
        von: new Date('1995-12-17T12:00:00'),
        bis: new Date('1995-12-17T20:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      }];

      const givenTimeFrame: Zeitfenster = {
        von: new Date('1995-12-17T12:00:00'),
        bis: new Date('1995-12-17T20:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      };

      const isValid = timeFramesValidForGivenWeekday(timeFrames, givenTimeFrame);
      expect(isValid).toBe(false);
    });

    it('Should return false because the given timeframe is between the existing timeframe xx', () => {
      const timeFrames: Zeitfenster[] = [{
        von: new Date('1995-12-17T08:00:00'),
        bis: new Date('1995-12-17T20:00:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      }];

      const givenTimeFrame: Zeitfenster = {
        von: new Date('1995-12-17T08:02:00'),
        bis: new Date('1995-12-17T08:50:00'),
        wochentag: 1,
        status: '',
        bemerkung: '',
      };

      const isValid = timeFramesValidForGivenWeekday(timeFrames, givenTimeFrame);
      expect(isValid).toBe(false);
    });

    it('Should return false because the given timeframe is between the existing timeframe', () => {
      const timeFrames: Zeitfenster[] = [{
        wochentag: 3,
        von: new Date('2021-03-10T08:00:07.000'),
        bis: new Date('2021-03-10T20:00:07.000'),
        bemerkung: null,
        status: null
      }];

      const givenTimeFrame: Zeitfenster = {
        von: new Date('2021-03-22T08:02:04.131'),
        bis: new Date('2021-03-22T08:50:04.132'),
        wochentag: 3,
        status: '',
        bemerkung: ''
      };

      const isValid = timeFramesValidForGivenWeekday(timeFrames, givenTimeFrame, true);
      expect(isValid).toBe(false);
    });
  });

  describe('getTimeBox', () => {
    it('should return the correct min date for a given date list', () => {
      const timeFrames = [
        {
          von: new Date('2021-03-22T08:00:00'),
          bis: new Date('2021-03-22T12:00:00'),
          wochentag: 3,
          status: '',
          bemerkung: ''
        },
        {
          von: new Date('2021-03-10T13:00:00'),
          bis: new Date('2021-03-10T16:00:00'),
          wochentag: 3,
          status: '',
          bemerkung: ''
        },
        {
          von: new Date('2021-03-09T17:00:00'),
          bis: new Date('2021-03-09T18:00:00'),
          wochentag: 3,
          status: '',
          bemerkung: ''
        }
      ];

      const {min, max} = getTimeBox(timeFrames, null);

      expect(min.toLocaleString()).toEqual(moment(new Date('1970-01-01T08:00:00')).toLocaleString());
    });

    it('should return the correct min date for a given date list', () => {
      const timeFrames = [
        {
          von: new Date('2021-03-11T08:00:00'),
          bis: new Date('2021-03-11T12:00:00'),
          wochentag: 3,
          status: '',
          bemerkung: ''
        },
        {
          von: new Date('2021-03-12T13:00:00'),
          bis: new Date('2021-03-12T16:00:00'),
          wochentag: 3,
          status: '',
          bemerkung: ''
        },
        {
          von: new Date('2021-03-22T17:00:00'),
          bis: new Date('2021-03-22T18:00:00'),
          wochentag: 3,
          status: '',
          bemerkung: ''
        }
      ];

      const {min, max} = getTimeBox(timeFrames, null);

      expect(max.toLocaleString()).toEqual(moment(new Date('1970-01-01T18:00:00')).toLocaleString());
    });
  });

  describe('violatesTimeBox', () => {
    it('should return false because it does not violates the timebox, cause the given time is between the timebox', () => {
      const timeFrame = {
        von: new Date('2021-03-11T08:00:00'),
        bis: new Date('2021-03-11T12:00:00'),
        wochentag: 3,
        status: '',
        bemerkung: ''
      };

      const timeBox: { min: moment.Moment; max: moment.Moment } = {
        min: moment(new Date('2021-03-11T05:00:00')),
        max: moment(new Date('2021-03-11T20:00:00'))
      };

      const violates = violatesTimeBox(timeFrame, timeBox, true);
      expect(violates).toBe(false);
    });

    it('should return true because it violates the timebox', () => {
      const timeFrame = {
        von: new Date('2021-03-11T04:00:00'),
        bis: new Date('2021-03-11T12:00:00'),
        wochentag: 3,
        status: '',
        bemerkung: ''
      };

      const timeBox: { min: moment.Moment; max: moment.Moment } = {
        min: moment(new Date('2021-03-11T05:00:00')),
        max: moment(new Date('2021-03-11T20:00:00'))
      };

      const violates = violatesTimeBox(timeFrame, timeBox, true);
      expect(violates).toBe(true);
    });
  });
});
