// import * as fromSelectedTour from '../selectedTour.reducer';
// import * as selectedTourActions from '../../actions/set-selected-tour.actions';
// import { ManualTour } from '@app/views/manual-dispo/model/Tour.model';
//
// describe('SelectedTour reducer', () => {
//   describe('undefined action', () => {
//     it('should return the default state', () => {
//       const { initialState } = fromSelectedTour;
//       const state = fromSelectedTour.reducer(undefined, { type: '' });
//
//       expect(state).toBe(initialState);
//     });
//   });
//
//   describe('setSelectedTour action', () => {
//     it('should set the selected tour', () => {
//       const tourToSet: ManualTour = {
//         tour_id: 34000000000388,
//         tournr: '0000',
//         fahrzeugart_id: 2336,
//         laenge: null,
//         kfz: '',
//         niederlassung_id: 0,
//         min_ladeflaeche: null,
//         min_ladeflaeche_laenge: null,
//         min_ladeflaeche_breite: null,
//         min_ladeflaechehoehe: null,
//         min_ladevolumen: null,
//         min_nutzlast: null,
//         nutzlast: null,
//         max_paletten: null,
//         max_colli: null,
//         name_1: null,
//         name_2: null,
//         name_3: null,
//         kennzeichen: null,
//         ausweisnr: null,
//         fahrername: null,
//         fahrervorname: null,
//         ambientbox: null,
//         puffertour: true,
//       };
//
//       const expectedState = {
//         selectedTour: tourToSet,
//       };
//
//       const state = fromSelectedTour.reducer(
//         undefined,
//         selectedTourActions.setSelectedTour({ selectedTour: tourToSet })
//       );
//
//       expect(state).toEqual(expectedState);
//     });
//   });
// });
