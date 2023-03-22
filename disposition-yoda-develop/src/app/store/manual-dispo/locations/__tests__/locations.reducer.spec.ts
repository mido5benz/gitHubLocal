// import * as fromSites from '../reducers/location.reducer';
// import * as sitesActions from '../actions/fetch-locations.actions';
//
// describe('Sites reducer', () => {
//   describe('undefined action', () => {
//     it('should return the default state', () => {
//       const { initialLocationState } = fromSites;
//       const state = fromSites.reducer(undefined, { type: '' });
//
//       expect(state).toBe(initialLocationState);
//     });
//   });
//
//   describe('selectSitesStart action', () => {
//     it('should set loading property to true', () => {
//       const exptectedState = {
//         loading: true,
//         sites: [],
//       };
//
//       const state = fromSites.reducer(undefined, sitesActions.fetchLocationsStart);
//
//       expect(state).toEqual(exptectedState);
//     });
//   });
//
//   describe('selectSitesSuccess action', () => {
//     it('should set loading property to false and the locations', () => {
//       const exptectedState = {
//         loading: false,
//         sites: [],
//       };
//
//       const state = fromSites.reducer(
//         undefined,
//         sitesActions.fetchLocationsSuccess({ sites: [] })
//       );
//
//       expect(state).toEqual(exptectedState);
//     });
//   });
//
//   describe('selectSitesSuccess action', () => {
//     it('should set loading property to false', () => {
//       const exptectedState = {
//         loading: false,
//         sites: [],
//       };
//
//       const state = fromSites.reducer(
//         undefined,
//         sitesActions.fetchLocationsFailure()
//       );
//
//       expect(state).toEqual(exptectedState);
//     });
//   });
// });
