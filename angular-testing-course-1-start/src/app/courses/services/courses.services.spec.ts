import {CoursesService} from "./courses.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {COURSES, findLessonsForCourse} from "../../../../server/db-data";
import {Course} from "../model/course";
import {HttpErrorResponse} from "@angular/common/http";

describe("CoursesService", () =>{


let coursesService : CoursesService,
  httpTestingController: HttpTestingController ;


beforeEach(()=>{

  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      CoursesService
    ]
  });

  coursesService =  TestBed.get(CoursesService);
  //coursesService =  TestBed.get(CoursesService);
 // httpTestingController = TestBed.get(HttpTestingController);

  httpTestingController = TestBed.get(HttpTestingController);

});

  it('should retrieve all courses', () => {

    coursesService.findAllCourses()
      .subscribe(courses => {

        expect(courses).toBeTruthy('No courses returned');

        expect(courses.length).toBe(12,"incorrect number of courses");

        const course = courses.find(course => course.id == 12);

        expect(course.titles.description).toBe("Angular Testing Course");

      });
    const req = httpTestingController.expectOne('http://localhost:9000/api/courses');


    expect(req.request.method).toEqual("GET");


    // return some data
    req.flush({payload: Object.values(COURSES)});

  });


  it('should find a course by id', () => {

    coursesService.findCourseById(12)
      .subscribe( course => {

        expect(course).toBeTruthy();
        expect(course.id).toBe(12);

      });

    // check that findCourseById() will call the given URL
    const req = httpTestingController.expectOne('/api/courses/12');

    // check that is a GET Request
    expect(req.request.method).toEqual("GET");

    // return the course with id = 12
    req.flush(COURSES[12]);

  });

  it('should save the course data', () => {

    const changes : Partial<Course> =
        {titles: {description: 'Testing Course'}};

    coursesService.saveCourse(12,changes)
      .subscribe(course => {

      expect(course.id).toBe(12);

      });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual("PUT");

    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    // flush the mock request
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush({
      ...COURSES[12],
      ...changes
    })

  });


  it('should give an error if save course fails', () => {


    // use Partial Type is like to have all the properties of Object as optional
    // used if it needs to update only some fields of an Object.
    const changes : Partial<Course> =
      {titles: {description: 'Testing Course'}};

    coursesService.saveCourse(12,changes)
      .subscribe(
        () => fail("the save course operation should have failed"),

        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual("PUT");

    req.flush('Save course failed',{status:500, statusText:'Internal Server Error'});

  });

  it('should find a list of lessons', () => {

    coursesService.findLessons(12)
      .subscribe( lessons => {

        expect(lessons).toBeTruthy();

        expect(lessons.length).toBe(3);

      });

    const req = httpTestingController.expectOne(
      req => req.url == '/api/lessons'
    );

    expect(req.request.method).toEqual("GET");
    expect(req.request.params.get("courseId")).toEqual("12");

    expect(req.request.params.get("filter")).toEqual("");
    expect(req.request.params.get("sortOrder")).toEqual("asc");
    expect(req.request.params.get("pageNumber")).toEqual("0");
    expect(req.request.params.get("pageSize")).toEqual("3");

    req.flush({
      payload: findLessonsForCourse(12).slice(0,3)
    });

  });

  /**
   *  After every test, assert that there are no more pending requests.
   *  Finally, assert that there are no outstanding requests.
   */

  afterEach(() => {
    // to verify that the request is called by the specific controller using the correct given URL in the test Method
    httpTestingController.verify();

  })

})
