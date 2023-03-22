import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {of} from "rxjs";
import {delay} from "rxjs/operators";


describe("Async Testing examples", () => {

  it('Asynchronous test example with Jasmine done()', function (done: DoneFn) {

      let test = false;

      setTimeout(() =>{

        console.log("running assertions");

        // after one second we set this flag to true

        test = true;

        expect(test).toBeTruthy();

        done();

      },1000);


  });

  it('Asynchronous test example - setTimeout()', fakeAsync(function () {

    let test = false;

    setTimeout(() => {

    });

    setTimeout(() => {

      console.log("running assertions for setTimeout");

      test = true;

      // expect(test).toBeTruthy();

    }, 1000);

    // tick(500);
    //
    // tick(499);
    //
    // tick(1);

    flush();


    // we can make the assertion here because we are sure that the tick will assure that the
    // test function will wait until the setTimeout is finished
    expect(test).toBeTruthy();

  }));

  it('Asynchronous test Example - plain Promise', fakeAsync(() => {

    let test = false;

    console.log('Creating promise');

      Promise.resolve().then(() => {

      console.log('Promise first then() evaluated successfully');

      test = true;
      return Promise.resolve();
    }).then(() => {

      console.log('Promise second then() evaluated successfully');

    });

    flushMicrotasks();

    console.log('Running test assertions');

    expect(test).toBeTruthy();

  }));

  it('Asynchronous Test example - Promises + setTimeout()',fakeAsync(() => {

    let counter = 0;

    Promise.resolve()
      .then(() =>{

        counter +=10;

        setTimeout(() => {
            counter +=1;
        },1000);
      });

    // because Promise is async and will be executed after expect()
    expect(counter).toBe(0);

    // this function will make sure to empty the MicroTask queue and nothing more.
    flushMicrotasks();

    // we are sure that the line 94 is executed but not the setTimeout()
    expect(counter).toBe(10);

    tick(500);

    // the setTimeout is not finished, it still needs 500ms
    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);

  }));

  it('Asynchronous test example- Observables',fakeAsync(() =>{

    let test = false;

    console.log("Creating Observable");

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() =>{

      test = true;

    });

    tick(1000);

    console.log("Running test assertions");

    expect(test).toBe(true);


  }));

});
