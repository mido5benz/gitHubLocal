// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {TourInfoComponent} from './tour-info.component';
// import {DispoStopp, ManualDispoTour, Tour} from '@shared/models';
// import {TourNumberPipe} from '@shared/pipes';
// import {TourWeightPipe} from '@shared/pipes/tourWeight/tour-weight.pipe';
// import {TourColliPipe} from '@shared/pipes/tourColli/tour-colli.pipe';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
//
// describe('TourInfoComponent', () => {
//   let component: TourInfoComponent;
//   let fixture: ComponentFixture<TourInfoComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       providers: [HttpClientTestingModule],
//       declarations: [TourInfoComponent, TourNumberPipe, TourWeightPipe, TourColliPipe]
//     })
//       .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(TourInfoComponent);
//     component = fixture.componentInstance;
//
//     const mTour: ManualDispoTour = {
//       tour_id: 12,
//       tournr: '9990',
//     };
//
//     const tour: Tour = {
//       tour: mTour,
//       dispostopps: [],
//       nachladegrenze: 1,
//       planTourdauer: 213124
//     };
//
//     fixture.componentInstance.selectedTour = tour;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
