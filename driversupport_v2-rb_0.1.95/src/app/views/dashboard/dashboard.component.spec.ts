// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AccordionModule, ProgressbarModule } from 'ngx-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
// import { apiService } from 'src/app/_services/api.service';
// import { DashboardComponent } from './dashboard.component';
// import { Functions } from './../../Global/functions';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let injector: TestBed;
//   let service: apiService;
//   let httpMock: HttpTestingController;
//   let functions: Functions;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [DashboardComponent],
//       imports: [
//         ProgressbarModule.forRoot(),
//         RouterTestingModule,
//         HttpClientTestingModule,
//         ToastrModule.forRoot(),
//         AccordionModule.forRoot(),
//         BrowserAnimationsModule
//       ],
//       providers: [apiService]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     injector = getTestBed();
//     service = injector.get(apiService);
//     httpMock = injector.get(HttpTestingController);
//     functions = injector.get(Functions);
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     functions.hideLoader();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should return true for the red header', () => {
//     let tour = {
//       tourId: 66000000000006,
//       tourNr: "2-100",
//       tourStartTime: "07:45",
//       presortCountTotal: 100,
//       presortCountCurrent: 43,
//       loadingCountTotal: 100,
//       loadingCountCurrent: 31,
//       currentDegreeVehicle: 19.8,
//       cashReturn: 0,
//       driverRegistration: false,
//       rearrangeCount: 0,
//       rearrangeTours: [],
//       requestDriverSupporter: false,
//     }
//     // expect(component.getCardColor(tour)).toEqual('red-header');
//   });

//   it('should return true for the yellow header', () => {
//     let tour = {
//       tourId: 66000000000006,
//       tourNr: "4-100",
//       tourStartTime: "07:45",
//       presortCountTotal: 100,
//       presortCountCurrent: 43,
//       loadingCountTotal: 100,
//       loadingCountCurrent: 37,
//       currentDegreeVehicle: 15.8,
//       cashReturn: 0,
//       driverRegistration: true,
//       rearrangeCount: 0,
//       rearrangeTours: [],
//       requestDriverSupporter: null,
//     }
//     // expect(component.getCardColor(tour)).toEqual('yellow-header');
//   });

//   it('should return true for the white header', () => {
//     let tour = {
//       tourId: 66000000000006,
//       tourNr: "5-400",
//       tourStartTime: "07:45",
//       presortCountTotal: 100,
//       presortCountCurrent: 83,
//       loadingCountTotal: 100,
//       loadingCountCurrent: 77,
//       currentDegreeVehicle: 19.8,
//       cashReturn: 0,
//       driverRegistration: true,
//       rearrangeCount: 0,
//       rearrangeTours: [],
//       requestDriverSupporter: null,
//     }
//     expect(component.getCardColor(tour)).toEqual('white-header');
//   });

//   it('should ProgressColor greater than 66 then return true green', () => {
//     let tour = {
//       presortCountCurrent: 83,
//       presortCountTotal: 100
//     }
//     // expect(component.getProgressColor(tour.presortCountCurrent, tour.presortCountTotal)).toEqual('green');
//   });

//   it('should ProgressColor greater than 66 then return true yellow', () => {
//     let tour = {
//       presortCountCurrent: 43,
//       presortCountTotal: 100
//     }
//     // expect(component.getProgressColor(tour.presortCountCurrent, tour.presortCountTotal)).toEqual('yellow');
//   });

//   it('should ProgressColor greater than 66 then return true yellow', () => {
//     let tour = {
//       presortCountCurrent: 0,
//       presortCountTotal: 100
//     }
//     // expect(component.getProgressColor(tour.presortCountCurrent, tour.presortCountTotal)).toEqual('red');
//   });

//   it('should Percentage a and b value return', () => {
//     let tour = {
//       presortCountCurrent: 10,
//       presortCountTotal: 100
//     }
//     // expect(component.getPercentage(tour.presortCountCurrent, tour.presortCountTotal)).toEqual('10');
//   });

//   it('should get tours Cards', () => {
//     service.getTourDashboard('DRIVES01')
//       .subscribe((data) => {
//         expect(data.length).toBeDefined();
//         // done();
//       });

//     // const req = httpMock.match(service.env.baseURL + '/tourDashboard/');
//     // expect(req[0].request.method).toBe("PUT");

//   });

//   it('should user click on the routeToTourDetail(tour) then should navigate to the tourdetail', (() => {
//     // spyOn(component, 'routeToTourDetail');
//     // let routeToTourDetail = fixture.debugElement.nativeElement.querySelector('.tour-card');

//     // routeToTourDetail.click();
//     let tour = {
//       tourId: 66000000000006,
//       tourNr: "5-400",
//       tourStartTime: "07:45",
//       presortCountTotal: 100,
//       presortCountCurrent: 83,
//       loadingCountTotal: 100,
//       loadingCountCurrent: 77,
//       currentDegreeVehicle: 19.8,
//       cashReturn: 0,
//       driverRegistration: true,
//       rearrangeCount: 0,
//       rearrangeTours: [],
//       requestDriverSupporter: null,
//     }
//     component.routeToTourDetail(tour);
//     let sessionTour = window.sessionStorage.getItem('tourDetails')
//     expect(sessionTour).toEqual(JSON.stringify(tour));
//   }));

// });
