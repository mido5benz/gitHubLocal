import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('http://kcsrve.tof.de:8080') || req.url.startsWith('https://kcsrve.tof.de:8080')) {
      return next.handle(req);
    }

    return next.handle(req);
    // TODO: We are waiting for the backend here to accept the auth headers
    // return from(this.userService.getToken()).pipe(
    //   switchMap((token: any) => {
    //     if (token) {
    //       // TODO: Adjust this later when we know how the backend wants the header to look like or append
    //       // more headers if need
    //       const headers = req.headers.set('Authorization', token);
    //       // e.g. appending more headers
    //       // const headers = req.headers.set('Authorization', token).append('Content-Type', 'application/json');
    //       const requestClone = req.clone({
    //         headers,
    //       });
    //       return next.handle(requestClone);
    //     } else {
    //       return next.handle(req);
    //     }
    //   })
    // );
  }
}
