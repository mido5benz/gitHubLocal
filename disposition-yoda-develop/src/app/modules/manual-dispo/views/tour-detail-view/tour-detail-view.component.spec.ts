// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {TourDetailViewComponent} from '@modules/manual-dispo/views';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {RouterTestingModule} from '@angular/router/testing';
// import {DialogService} from '@modules/dialog/services/dialog.service';
// import {MockStore, provideMockStore} from '@ngrx/store/testing';
// import {ActivatedRoute} from '@angular/router';
// import {of} from 'rxjs';
//
// describe('TourDetailViewComponent', () => {
//   let component: TourDetailViewComponent;
//   let fixture: ComponentFixture<TourDetailViewComponent>;
//   let store: MockStore;
//   const initialState = {};
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [TourDetailViewComponent],
//       imports: [HttpClientTestingModule, RouterTestingModule],
//       providers: [
//         DialogService,
//         provideMockStore({initialState}),
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             parent: {
//               params: of({
//                 tourId: () => {
//                   return of(10);
//                 }
//               }),
//               paramMap: of({
//                 tourId: () => {
//                   return of(10);
//                 }
//               })
//             }
//           }
//         }
//         ]
//     })
//       .compileComponents();
//
//     store = TestBed.inject(MockStore);
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(TourDetailViewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
