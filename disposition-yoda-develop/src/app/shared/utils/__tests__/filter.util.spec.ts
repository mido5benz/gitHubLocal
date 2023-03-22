// {
//   "tour": {
//   "tour_id": 66000000000014,
//     "tournr": "9999",
//     "frachtfuehrer_tour_id": null,
//     "frachtfuehrer_id": null,
//     "fahrzeugart_id": 2345,
//     "fruehestertourstart": null,
//     "laenge": 1,
//     "min_ladeflaeche": 1,
//     "min_ladeflaeche_laenge": 1,
//     "min_ladeflaeche_breite": 1,
//     "min_ladeflaechehoehe": 1,
//     "min_ladevolumen": 1,
//     "min_nutzlast": 1,
//     "virtuelletour": "1",
//     "tourstartoffset": null,
//     "nutzlast": null,
//     "max_paletten": null,
//     "max_colli": null,
//     "name_1": null,
//     "name_2": null,
//     "name_3": null,
//     "kennzeichen": null,
//     "ausweisnr": null,
//     "fahrername": null,
//     "fahrervorname": null,
//     "ambientbox": null,
//     "puffertour": true
// },
//   "shuttle_tour_id": null,
//   "shuttle_tour_nummer": null,
//   "istTourShuttlefaehig": false,
//   "nachladegrenze": null,
//   "planDistanz": null,
//   "planFahrtdauer": null,
//   "planAuslieferdauer": null,
//   "planTourdauer": null,
//   "dispostopps": [
//   {
//     "dispostopp_id": 66000000171835,
//     "ausliefertag": "08.03.2021",
//     "tour_id": 66000000000014,
//     "shuttle_tour_id": null,
//     "soll_stopp": null,
//     "nachladebereich": null,
//     "ziel_name": {
//       "ziel_name_id": 105000000019085,
//       "geoposition": {
//         "geoposition_id": 105000000020527,
//         "geo_x": 50.884529136,
//         "geo_y": 11.607660229,
//         "geoadresse": {
//           "geoadresse_id": 105000000020507,
//           "land": "D",
//           "plz": "07747",
//           "ort": "Jena",
//           "strasse": "Karl-Marx-Allee",
//           "hausnr": "20"
//         }
//       },
//       "name1": "Sonnen-Apotheke",
//       "name2": "Nadine Herrmann e.K.",
//       "name3": null,
//       "name123": null
//     },
//     "raster_ebene_id": 1,
//     "ambient": false,
//     "planAnkunft": null,
//     "planStartBearbeitung": null,
//     "planBearbeitungszeit": null,
//     "planStrecke": null,
//     "planZeitFenster": null,
//     "sendungen": null,
//     "uebernahmen": null
//   },
// ],
//   "dispostoppssum": [
//   {
//     "dispostopp_id": 66000000171023,
//     "soll_stopp": 0,
//     "sendung_sum": 2,
//     "col_sum": 2,
//     "pal_sum": 0,
//     "gewicht_sum": 1.03,
//     "p8_sum": 0,
//     "p9_sum": 0,
//     "p10_sum": 0,
//     "p12_sum": 0,
//     "abend_sum": 0,
//     "tm_sum": 0,
//     "kl7_sum": 0,
//     "amb_sum": 2
//   },
// ],
//   "sendungSum": 234,
//   "colSum": 539,
//   "palSum": 47,
//   "gewichtSum": 7690.2,
//   "p8Sum": 0,
//   "p9Sum": 0,
//   "p10Sum": 0,
//   "p12Sum": 12,
//   "abendSum": 0,
//   "tmSum": 0,
//   "kl7Sum": 3,
//   "amb_sum": 103
// }

import {timeFramesValidForGivenWeekday} from '../restriction.utils';
import {Zeitfenster} from '@models/recipient/recipient.models';

describe('filter utils', () => {
  describe('Check if a given tour has a services', () => {
    it('', () => {
            // const isValid = timeFrameValidForGivenWeekday(timeFrames, givenTimeFrame);
      // expect(isValid).toBe(true);
    });
  });
});
