import {addReloadLine, getReloadLineIndex, isIndexBehindReloadLine, swapSollStoppNumbers} from '@shared/utils/list.utils';

describe('list utils spec', () => {

  describe('addReloadLineItem', () => {
    it('Adds the reload item to an empty array and the array should have the length of 1 after that', () => {
      const dispoStoppList = [];
      expect(dispoStoppList.length).toBe(0);
      const stoppListWithReloadItem = addReloadLine(dispoStoppList, 0);
      expect(stoppListWithReloadItem.length).toBe(1);
    });

    it('Adds the reload item to an dispostopp array and it should be added at the end of the array', () => {
      const dispoStoppList = [...mockData];
      expect(dispoStoppList.length).toBe(2);
      const stoppListWithReloadItem = addReloadLine(dispoStoppList, 0);
      expect(stoppListWithReloadItem.length).toBe(dispoStoppList.length + 1);
    });

    it('Adds the reloadline at index 1, reload line index should be 1', () => {
      const dispoStoppList = [...mockData];
      const stoppListWithReloadItem = addReloadLine(dispoStoppList, 1);
      const reloadLineIndex = getReloadLineIndex(stoppListWithReloadItem);
      expect(reloadLineIndex).toBe(1);
      expect(stoppListWithReloadItem.length).toBe(3);
    });

    it('Adds the reloadline at index 5, original list has only 2 elements, reload line should be added at the end, index shouls be 3', () => {
      const dispoStoppList = [...mockData];
      const stoppListWithReloadItem = addReloadLine(dispoStoppList, 5);
      const reloadLineIndex = getReloadLineIndex(stoppListWithReloadItem);
      expect(reloadLineIndex).toBe(2);
      expect(stoppListWithReloadItem.length).toBe(3);
    });
  });

  describe('getReloadLineIndex', () => {
    it('Should return -1 because the given list is emtpy', () => {
      const dispoStoppList = [];
      const reloadLineIndex = getReloadLineIndex(dispoStoppList);
      expect(reloadLineIndex).toBe(-1);
    });

    it('Should return -1 because the given list as no reload line item', () => {
      const reloadLineIndex = getReloadLineIndex(mockData);
      expect(reloadLineIndex).toBe(-1);
    });

    it('Should return 1 because the given list has the reload line item at index 1', () => {
      const dispoStoppList = [...mockData];
      const stoppListWithReloadItem = addReloadLine(dispoStoppList, 1);
      const reloadLineIndex = getReloadLineIndex(stoppListWithReloadItem);
      expect(reloadLineIndex).toBe(1);
      expect(stoppListWithReloadItem.length).toBe(3);
    });
  });

  describe('swapSollStoppNumbers', () => {
    it('should swap the soll stop numbers of the first two items', () => {
      const stoppList = [...mockData];

      const firstStopp = stoppList[0];
      const secondStopp = stoppList[1];

      expect(firstStopp.soll_stopp).toBe(1);
      expect(secondStopp.soll_stopp).toBe(2);

      const listWithSwappedStopps = swapSollStoppNumbers(stoppList, 0, 1);

      const firstStoppOfSwappedList = listWithSwappedStopps[0];
      const secondStoppOfSwappedList = listWithSwappedStopps[1];

      expect(firstStoppOfSwappedList.soll_stopp).toBe(2);
      expect(secondStoppOfSwappedList.soll_stopp).toBe(1);
    });
  });

  describe('isIndexBehindReloadLine', () => {
    it('Should return true because the index is behind the current reloadline', () => {
      const dispoStoppList = [...mockData];
      const stoppListWithReloadItem = addReloadLine(dispoStoppList, 2);

      const reloadLineIndex = getReloadLineIndex(stoppListWithReloadItem);
      expect(reloadLineIndex).toBe(2);

      const droppedItemIndex = 3;
      const isBehindReloadLine = isIndexBehindReloadLine(stoppListWithReloadItem, droppedItemIndex);
      expect(isBehindReloadLine).toBe(true);
    });

    it('Should return false because the index is smaller then the reloadline index', () => {
      const dispoStoppList = [...mockData];
      const stoppListWithReloadItem = addReloadLine(dispoStoppList, 2);

      const reloadLineIndex = getReloadLineIndex(stoppListWithReloadItem);
      expect(reloadLineIndex).toBe(2);

      const droppedItemIndex = 1;
      const isBehindReloadLine = isIndexBehindReloadLine(stoppListWithReloadItem, droppedItemIndex);
      expect(isBehindReloadLine).toBe(false);
    });
  });
});

const mockData = [
  {
    dispostopp_id: 66000000196694,
    ausliefertag: '29.03.2021',
    tour_id: 66000000000102,
    shuttle_tour_id: null,
    soll_stopp: 1,
    nachladebereich: '0',
    ziel_name: {
      ziel_name_id: 105000000015247,
      geoposition: {
        geoposition_id: 105000000000256,
        geo_x: 51.068099942,
        geo_y: 13.510979694,
        geoadresse: {
          geoadresse_id: 105000000000255,
          land: 'D',
          plz: '01665',
          ort: 'Klipphausen',
          strasse: 'Göttinger Straße',
          hausnr: '1'
        }
      },
      name1: 'Distributions GmbH - 69',
      name2: null,
      name3: null,
      name123: null
    },
    raster_ebene_id: 4,
    ambient: false,
    planAnkunft: '29.03.2021 12:11:01',
    planStartBearbeitung: '29.03.2021 12:11:01',
    planBearbeitungszeit: 600,
    planStrecke: 161118,
    planZeitFenster: '[12:00 - 20:00]',
    sendungen: null,
    uebernahmen: null,
    tournr: '9955',
    selected: false
  },
  {
    dispostopp_id: 66000000196782,
    ausliefertag: '29.03.2021',
    tour_id: 66000000000102,
    shuttle_tour_id: null,
    soll_stopp: 2,
    nachladebereich: '0',
    ziel_name: {
      ziel_name_id: 105000000038860,
      geoposition: {
        geoposition_id: 105000000039059,
        geo_x: 51.349830581,
        geo_y: 12.315210393,
        geoadresse: {
          geoadresse_id: 105000000039059,
          land: 'D',
          plz: '04179',
          ort: 'Leipzig',
          strasse: 'Rathenaustraße',
          hausnr: '4'
        }
      },
      name1: 'Rotem GmbH',
      name2: null,
      name3: null,
      name123: null
    },
    raster_ebene_id: 4,
    ambient: false,
    planAnkunft: '29.03.2021 13:30:00',
    planStartBearbeitung: '29.03.2021 13:30:00',
    planBearbeitungszeit: 600,
    planStrecke: 271502,
    planZeitFenster: '[13:30 - 15:30]',
    sendungen: null,
    uebernahmen: null,
    tournr: '9955',
    selected: false
  }
];
