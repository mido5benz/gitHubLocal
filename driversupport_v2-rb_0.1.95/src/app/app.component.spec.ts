// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppBreadcrumbModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { ToastrModule } from 'ngx-toastr';
// import { AppComponent } from './app.component';
// import { Functions } from './Global/functions';
// import { apiService } from './_services/api.service';
//
// fdescribe('AppComponent', () => {
//
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let injector: TestBed;
//   let service: apiService;
//   let httpMock: HttpTestingController;
//   let functions: Functions;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         AppBreadcrumbModule.forRoot(),
//         AppHeaderModule,
//         AppSidebarModule,
//         PerfectScrollbarModule,
//         ToastrModule.forRoot(),
//         FormsModule,
//         HttpClientTestingModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     injector = getTestBed();
//     service = injector.get(apiService);
//     httpMock = injector.get(HttpTestingController);
//     functions = injector.get(Functions);
//     fixture.detectChanges();
//   });
//
//   afterEach(() => {
//     functions.hideLoader();
//   });
//
//
//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
//
//   it(`should have as title 'DriverSupport'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('DriverSupport');
//   });
//
//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('.productname').textContent).toContain(compiled.title);
//   });
//
//   it('should user click on the logout then should navigate to the login', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     spyOn(app, 'logout');
//     app.logout();
//
//     fixture.whenStable().then(() => {
//       expect(app.logout).toHaveBeenCalled();
//     });
//   }));
//
//   it('should user click on the toggleMinimize then should toggle the sidebar', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     spyOn(app, 'toggleMinimize');
//     app.toggleMinimize()
//     fixture.whenStable().then(() => {
//       expect(app.toggleMinimize).toHaveBeenCalled();
//     });
//   }));
//
//
//   it('should call auto Fm change', () => {
//     spyOn(component, 'isChangeLimitAccessToggle');
//
//     component.isChangeLimitAccessToggle(true);
//     fixture.detectChanges(); // trigger ngOnInit here
//     expect(component.isChangeLimitAccessToggle).toHaveBeenCalled();
//   });
//
//   it('should call auto Fm active', () => {
//     // component.username = "DRIVES01";
//     component.isChangeLimitAccessToggle(true);
//     fixture.detectChanges(); // trigger ngOnInit here
//     let loginName = window.sessionStorage.getItem('autoFm')
//     expect(loginName).toEqual('true');
//   });
//
//   it('should call auto Fm false', () => {
//     // component.username = "DRIVES01";
//     component.isChangeLimitAccessToggle(false);
//     fixture.detectChanges(); // trigger ngOnInit here
//
//     let loginName = window.sessionStorage.getItem('autoFm')
//     expect(loginName).toEqual('false');
//
//   });
//
//
//   it('should update after login', () => {
//     spyOn(functions, 'emitloginEvent');
//     functions.emitloginEvent(true);
//     fixture.detectChanges(); // trigger ngOnInit here
//     expect(functions.emitloginEvent).toHaveBeenCalled();
//
//   });
//
//   it('should update after tour Selection', () => {
//     spyOn(functions, 'emitTourEvent');
//     let obj = {
//       name: 'TourSelection',
//       value: 13
//     }
//     functions.emitTourEvent(obj);
//     fixture.detectChanges(); // trigger ngOnInit here
//     expect(functions.emitTourEvent).toHaveBeenCalled();
//
//   });
//
//
//   it('should update interval amount', () => {
//     component.ngOnInit();
//     fixture.detectChanges();
//     let intervalAmount = window.sessionStorage.getItem('intervalAmount');
//     expect(intervalAmount).toBeDefined();
//   });
//
//   it('should update max tour amount', () => {
//     component.ngOnInit();
//     fixture.detectChanges();
//     let MaxTourNumber = window.sessionStorage.getItem('MaxTourNumber');
//     expect(MaxTourNumber).toBeDefined();
//   });
//
//
//
// });
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppBreadcrumbModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { ToastrModule } from 'ngx-toastr';
// import { AppComponent } from './app.component';
// import { Functions } from './Global/functions';
// import { apiService } from './_services/api.service';
//
// fdescribe('AppComponent', () => {
//
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let injector: TestBed;
//   let service: apiService;
//   let httpMock: HttpTestingController;
//   let functions: Functions;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         AppBreadcrumbModule.forRoot(),
//         AppHeaderModule,
//         AppSidebarModule,
//         PerfectScrollbarModule,
//         ToastrModule.forRoot(),
//         FormsModule,
//         HttpClientTestingModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     injector = getTestBed();
//     service = injector.get(apiService);
//     httpMock = injector.get(HttpTestingController);
//     functions = injector.get(Functions);
//     fixture.detectChanges();
//   });
//
//   afterEach(() => {
//     functions.hideLoader();
//   });
//
//
//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
//
//   it(`should have as title 'DriverSupport'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('DriverSupport');
//   });
//
//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('.productname').textContent).toContain(compiled.title);
//   });
//
//   it('should user click on the logout then should navigate to the login', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     spyOn(app, 'logout');
//     app.logout();
//
//     fixture.whenStable().then(() => {
//       expect(app.logout).toHaveBeenCalled();
//     });
//   }));
//
//   it('should user click on the toggleMinimize then should toggle the sidebar', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     spyOn(app, 'toggleMinimize');
//     app.toggleMinimize()
//     fixture.whenStable().then(() => {
//       expect(app.toggleMinimize).toHaveBeenCalled();
//     });
//   }));
//
//
//   it('should call auto Fm change', () => {
//     spyOn(component, 'isChangeLimitAccessToggle');
//
//     component.isChangeLimitAccessToggle(true);
//     fixture.detectChanges(); // trigger ngOnInit here
//     expect(component.isChangeLimitAccessToggle).toHaveBeenCalled();
//   });
//
//   it('should call auto Fm active', () => {
//     // component.username = "DRIVES01";
//     component.isChangeLimitAccessToggle(true);
//     fixture.detectChanges(); // trigger ngOnInit here
//     let loginName = window.sessionStorage.getItem('autoFm')
//     expect(loginName).toEqual('true');
//   });
//
//   it('should call auto Fm false', () => {
//     // component.username = "DRIVES01";
//     component.isChangeLimitAccessToggle(false);
//     fixture.detectChanges(); // trigger ngOnInit here
//
//     let loginName = window.sessionStorage.getItem('autoFm')
//     expect(loginName).toEqual('false');
//
//   });
//
//
//   it('should update after login', () => {
//     spyOn(functions, 'emitloginEvent');
//     functions.emitloginEvent(true);
//     fixture.detectChanges(); // trigger ngOnInit here
//     expect(functions.emitloginEvent).toHaveBeenCalled();
//
//   });
//
//   it('should update after tour Selection', () => {
//     spyOn(functions, 'emitTourEvent');
//     let obj = {
//       name: 'TourSelection',
//       value: 13
//     }
//     functions.emitTourEvent(obj);
//     fixture.detectChanges(); // trigger ngOnInit here
//     expect(functions.emitTourEvent).toHaveBeenCalled();
//
//   });
//
//
//   it('should update interval amount', () => {
//     component.ngOnInit();
//     fixture.detectChanges();
//     let intervalAmount = window.sessionStorage.getItem('intervalAmount');
//     expect(intervalAmount).toBeDefined();
//   });
//
//   it('should update max tour amount', () => {
//     component.ngOnInit();
//     fixture.detectChanges();
//     let MaxTourNumber = window.sessionStorage.getItem('MaxTourNumber');
//     expect(MaxTourNumber).toBeDefined();
//   });
//
//
//
// });
