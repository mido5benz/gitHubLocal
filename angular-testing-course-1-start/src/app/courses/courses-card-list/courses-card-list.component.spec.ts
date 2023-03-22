import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync (() =>{
    TestBed.configureTestingModule({
      imports:[CoursesModule]
    })
      .compileComponents()
      .then(() => {
        // those two lines will be executed after the test execution to solve it we need to use waitForAsync in line 20
        // waitForAsync function will white for a while until the code get executed
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      })
  }) );

  it("should create the component", () => {

    // we could use one of the asserts
   expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });


  it("should display the course list", () => {

    component.courses = setupCourses();


    // this function will synchronously update the dom
    fixture.detectChanges();

    //console.log("dom",el.nativeElement.outerHTML);

    const cards = el.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("could not find cards");
    // test there is a list of course-card get added to the Dom
    expect(cards).toBeDefined();
    expect(cards.length).toBe(12,"UnexpectedEndOfComment number of courses");
    expect(cards).toHaveSize(12);



  });


  it("should display the first course", () => {

     component.courses = setupCourses();

     fixture.detectChanges();

     const firstCourse = component.courses[0];

     const card = el.query(By.css(".course-card")),
       title = card.query(By.css("mat-card-title")),
     image = card.query(By.css("img"));

     expect(card).toBeTruthy("could not find course card");
     expect(title.nativeElement.textContent).toBe(firstCourse.titles.description);
     expect(image.nativeElement.src).toBe(firstCourse.iconUrl);

  });


});


