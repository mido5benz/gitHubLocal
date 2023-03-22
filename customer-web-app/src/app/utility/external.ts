import { observable, Observable, of, Subscriber } from 'rxjs';

export const name = of('Alice', 'Ben', 'Charlie');

export function storeDataOnServer(data: string): Observable<string> {
  return new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next(`Saved successfully: ${data}`);
      subscriber.complete();
    }, 5000);
  });
}

export function storeDataOnServerError(data: string): Observable<string> {
  return new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.error(new Error('Failure!'));
    }, 5000);
  });
}

export function loginToDabase(criedentials: string): Observable<string> {
  return new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next("you're logged in !");
    }, 2000);
  });
}


const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Alice');
  setTimeout(() => subscriber.next('Ben'), 2000);
  setTimeout(() => subscriber.next('Charlie'), 4000);
});

const subscription = observable$.subscribe(value => console.log(value));

setTimeout(() => {
  console.log('Unsubscribe');
  subscription.unsubscribe();
}, 3000);
