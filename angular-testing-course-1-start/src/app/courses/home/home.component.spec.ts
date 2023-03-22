import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses()
    .filter(course => course.category == 'BEGINNER');

  const advancedCourses = setupCourses()
    .filter(course => course.category == 'ADVANCED');

  beforeEach(waitForAsync (() => {

     const coursesServiceSpy = jasmine.createSpyObj('CoursesService',['findAllCourses']);

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers:[
        {provide: CoursesService, useValue: coursesServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.get(CoursesService);
      });


  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    // return value with an abservable, this is going to happen synchronously not asynchronously.
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    //console.log(beginnerCourses);
    expect(beginnerCourses.length).toBeGreaterThan(1);
    expect(beginnerCourses[0].category).toEqual("BEGINNER");

    fixture.detectChanges();

    const coursesComponents = el.queryAll(By.css(".mat-mdc-card-header"));


     const beginnerCoursesCount = beginnerCourses.length;
     expect(coursesComponents.length).toEqual(beginnerCoursesCount);

    expect(coursesComponents.length).toBe(beginnerCoursesCount,"Unexpected number of Tabs found");

  });


  it("should display only advanced courses", () => {

    // return value with an abservable, this is going to happen synchronously not asynchronously.
    // the of Observable emit the values and will be returned (synchronously)
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));


    expect(advancedCourses.length).toBeGreaterThan(1);
    expect(advancedCourses[0].category).toEqual("ADVANCED");

    fixture.detectChanges();

    const coursesComponents = el.queryAll(By.css(".mat-mdc-card-header"));
    const advancedCoursesCount = advancedCourses.length;

    expect(coursesComponents.length).toEqual(advancedCoursesCount);

    expect(coursesComponents.length).toBe(advancedCoursesCount,"Unexpected number of Tabs found");

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mdc-tab"));
    const tabsCount = tabs.length;

    expect(tabs.length).toEqual(2);


    expect(tabs.length).toBe(2,"Unexpected number of Tabs found");

  });


  it("should display advanced courses when tab clicked",(done: DoneFn) => {

    // return value with an abservable, this is going to happen synchronously not asynchronously.
    // it mocks the Courses Data for the Test
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-mdc-tab"));

    click(tabs[1]);

    // click(tabs[0]);

    fixture.detectChanges();

    setTimeout(() => {

      fixture.detectChanges();

      const cardTitles = el.queryAll(By.css('.mat-mdc-card-title'));


      expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

      //expect(cardTitles[0].nativeElement.textContent).toContain("Angular Testing Course");

      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course - Web Security Fundamentals");

      // it's needed because the setTimeout block will be executed after the it () is finished
      // adding done() will keep the test running until the setTimeout get finished.
      done();

    }, 500);


  });

  it('should display advanced courses when tab clicked + fakeAsync',fakeAsync(() =>{

    // return value with an abservable, this is going to happen synchronously not asynchronously.
    // it mocks the Courses Data for the Test
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-mdc-tab"));

    click(tabs[1]);
    // click(tabs[0]);

    fixture.detectChanges();

    flush();

    fixture.detectChanges();

    const cardTitles = el.queryAll(By.css('.mat-mdc-card-title'));

    expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

    //expect(cardTitles[0].nativeElement.textContent).toContain("Angular Testing Course");

    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course - Web Security Fundamentals");


  }));



});


