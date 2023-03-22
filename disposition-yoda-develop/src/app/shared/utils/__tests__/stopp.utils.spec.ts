import {isUnassignedStopp} from '@shared/utils/stopp.utils';
import {DispoStopp} from '@shared/models';

describe('stopp utils', () => {
  describe('isUnassignedStopp', () => {
    it('Returns true because the property tournr is not set on the stopp', () => {
      const stopp: DispoStopp = {
        dispostopp_id: 34000000122161,
        ausliefertag: '26.03.2021',
        tour_id: 34000000000369,
        shuttle_tour_id: null,
        soll_stopp: null,
        nachladebereich: null,
        ziel_name: {
          ziel_name_id: 105000000002270,
          geoposition: {
            geoposition_id: 105000000001125,
            geo_x: 51.624561345,
            geo_y: 7.8586897196,
            geoadresse: {
              geoadresse_id: 105000000001122,
              land: 'D',
              plz: '59069',
              ort: 'Hamm',
              strasse: 'Lange Wende',
              hausnr: '5A'
            }
          },
          name1: 'teamvitaale Gesundheitsservice',
          name2: 'Lange Wende 5a',
          name3: null,
          name123: null
        },
        raster_ebene_id: 4,
        ambient: false,
        planAnkunft: null,
        planStartBearbeitung: null,
        planBearbeitungszeit: null,
        planStrecke: null,
        planZeitFenster: null,
        sendungen: null,
        uebernahmen: null,
        selected: false,
        sum: {
          dispostopp_id: 34000000122161,
          soll_stopp: 0,
          ggPunkteSum: 0,
          sendung_sum: 1,
          col_sum: 1,
          pal_sum: 0,
          gewicht_sum: 1.86,
          p8_sum: 0,
          p9_sum: 0,
          p10_sum: 0,
          p12_sum: 0,
          abend_sum: 0,
          tm_sum: 0,
          kl7_sum: 0,
          amb_sum: 0,
          soll_gewicht_sum: 0,
          soll_col_sum: 0,
          soll_pal_sum: 0
        }
      };
      const isUnassigned = isUnassignedStopp(stopp);
      expect(isUnassigned).toBe(true);
    });

    it('Returns true because the property tournr is set to 9999 on the stopp', () => {
      const stopp: DispoStopp = {
        dispostopp_id: 34000000122161,
        ausliefertag: '26.03.2021',
        tour_id: 34000000000369,
        shuttle_tour_id: null,
        soll_stopp: null,
        nachladebereich: null,
        ziel_name: {
          ziel_name_id: 105000000002270,
          geoposition: {
            geoposition_id: 105000000001125,
            geo_x: 51.624561345,
            geo_y: 7.8586897196,
            geoadresse: {
              geoadresse_id: 105000000001122,
              land: 'D',
              plz: '59069',
              ort: 'Hamm',
              strasse: 'Lange Wende',
              hausnr: '5A'
            }
          },
          name1: 'teamvitaale Gesundheitsservice',
          name2: 'Lange Wende 5a',
          name3: null,
          name123: null
        },
        raster_ebene_id: 4,
        ambient: false,
        planAnkunft: null,
        planStartBearbeitung: null,
        planBearbeitungszeit: null,
        planStrecke: null,
        planZeitFenster: null,
        sendungen: null,
        uebernahmen: null,
        selected: false,
        tournr: '9999',
        sum: {
          dispostopp_id: 34000000122161,
          soll_stopp: 0,
          sendung_sum: 1,
          ggPunkteSum: 0,
          col_sum: 1,
          pal_sum: 0,
          gewicht_sum: 1.86,
          p8_sum: 0,
          p9_sum: 0,
          p10_sum: 0,
          p12_sum: 0,
          abend_sum: 0,
          tm_sum: 0,
          kl7_sum: 0,
          amb_sum: 0,
          soll_pal_sum: 0,
          soll_gewicht_sum: 0,
          soll_col_sum: 0
        }
      };
      const isUnassigned = isUnassignedStopp(stopp);
      expect(isUnassigned).toBe(true);
    });

    it('Returns true because the property tournr is set on the stopp', () => {
      const stopp: DispoStopp = {
        dispostopp_id: 34000000122161,
        ausliefertag: '26.03.2021',
        tour_id: 34000000000369,
        shuttle_tour_id: null,
        soll_stopp: null,
        nachladebereich: null,
        tournr: '1234',
        ziel_name: {
          ziel_name_id: 105000000002270,
          geoposition: {
            geoposition_id: 105000000001125,
            geo_x: 51.624561345,
            geo_y: 7.8586897196,
            geoadresse: {
              geoadresse_id: 105000000001122,
              land: 'D',
              plz: '59069',
              ort: 'Hamm',
              strasse: 'Lange Wende',
              hausnr: '5A'
            }
          },
          name1: 'teamvitaale Gesundheitsservice',
          name2: 'Lange Wende 5a',
          name3: null,
          name123: null
        },
        raster_ebene_id: 4,
        ambient: false,
        planAnkunft: null,
        planStartBearbeitung: null,
        planBearbeitungszeit: null,
        planStrecke: null,
        planZeitFenster: null,
        sendungen: null,
        uebernahmen: null,
        selected: false,
        sum: {
          dispostopp_id: 34000000122161,
          soll_stopp: 0,
          sendung_sum: 1,
          col_sum: 1,
          pal_sum: 0,
          ggPunkteSum: 0,
          gewicht_sum: 1.86,
          p8_sum: 0,
          p9_sum: 0,
          p10_sum: 0,
          p12_sum: 0,
          abend_sum: 0,
          tm_sum: 0,
          kl7_sum: 0,
          amb_sum: 0,
          soll_gewicht_sum: 0,
          soll_col_sum: 0,
          soll_pal_sum: 0
        }
      };
      const isUnassigned = isUnassignedStopp(stopp);
      expect(isUnassigned).toBe(false);
    });
  });
});
