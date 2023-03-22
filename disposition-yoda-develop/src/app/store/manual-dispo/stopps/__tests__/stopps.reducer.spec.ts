// describe('stopps reducer', () => {
//   describe('undefined action', () => {
//     it('should return the default state', () => {
//       const { initialState } = fromStopps;
//       const state = fromStopps.reducer(undefined, { type: '' });

//       expect(state).toBe(initialState);
//     });
//   });

//   describe('selectStoppsStart action', () => {
//     it('should set the loading property to true', () => {
//       const { initialState } = fromStopps;
//       const state = fromStopps.reducer(
//         initialState,
//         stoppsAction.fetchStoppsStart
//       );

//       const expectedState = { ...initialState, loading: true };

//       expect(state).toEqual(expectedState);
//     });
//   });

//   describe('selectStoppsSuccess action', () => {
//     it('should set the loading property to false and fill the unassigned and assigned stopps arrays', () => {
//       const { initialState } = fromStopps;
//       const state = fromStopps.reducer(
//         initialState,
//         stoppsAction.fetchStoppsSuccess({
//           assignedStopps: [
//             {
//               dispo_id: 422,
//               tour_id: 41000000004430,
//               sendung_id: 593,
//               uebernahme_id: null,
//               stopp_nr: 5,
//               longitude: 8.647958,
//               latitude: 49.870705,
//               name1: 'Peters Blumenladen Mannheim GmbH',
//               name2: null,
//               name3: null,
//               strasse: 'Adelungstr.',
//               hausnr: '24',
//               plz: '64283',
//               ort: 'Darmstadt',
//               infodienstmaske: null,
//               colli: 0,
//               paletten: 0,
//               pickup: false,
//               delivery: true,
//               shuttletour: false,
//               plus8: true,
//               plus9: true,
//               frueh: true,
//               vormittag: false,
//               abend: false,
//               amb: false,
//               kuehl_raum: false,
//               gefahrgut: false,
//               gesamtgewicht: 2,
//             },
//           ],
//           unassignedStopps: [
//             {
//               dispo_id: 422,
//               tour_id: undefined,
//               sendung_id: 593,
//               uebernahme_id: null,
//               stopp_nr: 5,
//               longitude: 8.647958,
//               latitude: 49.870705,
//               name1: 'Peters Blumenladen Mannheim GmbH',
//               name2: null,
//               name3: null,
//               strasse: 'Adelungstr.',
//               hausnr: '24',
//               plz: '64283',
//               ort: 'Darmstadt',
//               infodienstmaske: null,
//               colli: 0,
//               paletten: 0,
//               pickup: false,
//               delivery: true,
//               shuttletour: false,
//               plus8: true,
//               plus9: true,
//               frueh: true,
//               vormittag: false,
//               abend: false,
//               amb: false,
//               kuehl_raum: false,
//               gefahrgut: false,
//               gesamtgewicht: 2,
//               reload: true,
//               tourNr: '',
//             },
//           ],
//         })
//       );

//       expect(state.loading).toBeFalse();
//       expect(state.assignedStopps.length).toBe(1);
//       expect(state.unassignedStopps.length).toBe(1);
//     });
//   });

//   describe('selectStoppsFailed action', () => {
//     it('should set the loading property to false', () => {
//       const { initialState } = fromStopps;
//       const state = fromStopps.reducer(
//         initialState,
//         stoppsAction.fetchStoppsFailure
//       );

//       const expectedState = { ...initialState, loading: false };

//       expect(state).toEqual(expectedState);
//     });
//   });

//   describe('addUnassignedStopStart action', () => {
//     it('should set the loading property to true', () => {
//       const { initialState } = fromStopps;
//       const state = fromStopps.reducer(
//         initialState,
//         stoppsAction.moveStoppToTourStart
//       );

//       const expectedState = { ...initialState, loading: true };

//       expect(state).toEqual(expectedState);
//     });
//   });

  // describe('addUnassignedStopSuccess action', () => {
  //   it('should set the loading property to false and add the unassgined stop to a tour', () => {
  //     const { initialState } = fromStopps;

  //     const stopToAdd: Stopp = {
  //       tour_id: 1,
  //       dispo_id: 536,
  //       sendung_id: 482,
  //       uebernahme_id: null,
  //       stopp_nr: 1,
  //       longitude: 8.6333393,
  //       latitude: 49.5477777,
  //       name1: 'Ankes Tankstelle',
  //       name2: null,
  //       name3: null,
  //       strasse: 'Grundelbachstr.',
  //       hausnr: '11',
  //       plz: '69469',
  //       ort: 'WEINHEIM (BERGSTRASSE)',
  //       infodienstmaske: null,
  //       colli: 0,
  //       paletten: 0,
  //       pickup: false,
  //       delivery: false,
  //       shuttletour: false,
  //       plus8: true,
  //       plus9: true,
  //       frueh: false,
  //       vormittag: false,
  //       abend: false,
  //       amb: false,
  //       kuehl_raum: true,
  //       gefahrgut: false,
  //       gesamtgewicht: 1,
  //       tourNr: '',
  //       reload: true,
  //     };

  //     const currentState = {
  //       ...initialState,
  //       unassignedStops: [stopToAdd],
  //     };

  //     const state = fromStopps.reducer(
  //       currentState,
  //       stoppsAction.moveStoppToTourSuccess({
  //         tourId: 1,
  //         stopps: stopToAdd,
  //       })
  //     );

  //     const expectedState = {
  //       ...currentState,
  //       loading: false,
  //       unassignedStops: [],
  //     };

  //     expect(state).toEqual(expectedState);
  //   });
  // });

//   describe('addUnassignedStopFailure action', () => {
//     it('should set the loading property to false', () => {
//       const { initialState } = fromStopps;
//       const state = fromStopps.reducer(
//         initialState,
//         stoppsAction.moveStoppToTourFailure
//       );

//       const expectedState = { ...initialState, loading: false };

//       expect(state).toEqual(expectedState);
//     });
//   });
// });
