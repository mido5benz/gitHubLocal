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
    let dupReq = request.clone();

    if (userDepot !== null) {
      if(request.url.includes('kcsrv')) {
        dupReq = request.clone( {url: request.url.replace('{DEPOTNR}', localStorage.getItem('userDepot'))});
      } else {
        dupReq = request.clone({ setHeaders: {"insUser": sessionStorage.getItem("loginName"),"depotNr": sessionStorage.getItem("userDepot")},url: request.url.replace('{DEPOTNR}', localStorage.getItem('userDepot'))});

      }

      return next.handle(dupReq);
    } else {
      return next.handle(request);
    }
  }
}


