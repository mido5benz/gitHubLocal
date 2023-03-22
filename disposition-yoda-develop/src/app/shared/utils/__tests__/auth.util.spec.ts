import {getDepotNumberFromUrl, hasCurrentDepotRights} from '@shared/utils/auth.utils';
import {Depot} from '@models/user/user.model';

describe('auth utils', () => {
  describe('getDepotNumberFromUrl', () => {
    it('Gets the correct depot id from the current url', () => {
      const url = 'rasterdisposrve66.tof.de';
      const depotNumber = getDepotNumberFromUrl(url);
      expect(depotNumber).toBe('66');
    });
    it('Gets the correct depot id from the current local url', () => {
      const url = 'localhost';
      const depotNumber = getDepotNumberFromUrl(url);
      expect(depotNumber).toBe('');
    });
  });

  describe('getDepotNumberFromUrl', () => {
    it('Should return false because the user has no depots', () => {
      const userDepots: Depot[] = [];
      const currentDepotNumberFromUrl = '66';
      const userHasRights = hasCurrentDepotRights(userDepots, currentDepotNumberFromUrl);
      expect(userHasRights).toBe(false);
    });
    it('Should return true because the user has rights for the given depot', () => {
      const userDepots: Depot[] = [{
        depotnr: '66',
        bezeichnung: '',
        code: '',
        id: 0
      }];
      const currentDepotNumberFromUrl = '66';
      const userHasRights = hasCurrentDepotRights(userDepots, currentDepotNumberFromUrl);
      expect(userHasRights).toBe(true);
    });
    it('Should return true because the user has rights for the given depot and has rights for other depots aswell', () => {
      const userDepots: Depot[] = [{
        depotnr: '66',
        bezeichnung: '',
        code: '',
        id: 0
      }, {
        depotnr: '48',
        bezeichnung: '',
        code: '',
        id: 0
      }];
      const currentDepotNumberFromUrl = '66';
      const userHasRights = hasCurrentDepotRights(userDepots, currentDepotNumberFromUrl);
      expect(userHasRights).toBe(true);
    });
    it('Should return false because the user has no rights for the given depots but rights for other depots', () => {
      const userDepots: Depot[] = [{
        depotnr: '48',
        bezeichnung: '',
        code: '',
        id: 0
      }, {
        depotnr: '12',
        bezeichnung: '',
        code: '',
        id: 0
      }];
      const currentDepotNumberFromUrl = '66';
      const userHasRights = hasCurrentDepotRights(userDepots, currentDepotNumberFromUrl);
      expect(userHasRights).toBe(false);
    });
  });
});
