import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userDepot = localStorage.getItem('userDepot');

    if (userDepot !== null) {
      // Replace the replace the DepotId in every request with the value from the local storage
      const dupReq = request.clone({url: request.url.replace('{DEPOT_ID}', localStorage.getItem('userDepot'))});
      return next.handle(dupReq);
    } else {
      return next.handle(request);
    }
  }
}
