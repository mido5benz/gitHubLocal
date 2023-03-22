import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '@environment*';
import {Aenderungswunsch, DetailAnsicht, StoppReihenfolgeResponse} from '@models/on-tour/aenderungswunsch.model';
import {Observable, throwError, TimeoutError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OnTourService {
  constructor(private http: HttpClient) {
  }

  requestChange(param: any): Observable<HttpResponse<StoppReihenfolgeResponse>> {
    const url = `${environment.apiHost}/anfrage_stoppreihenfolge/antwort`;
    return this.http.post<StoppReihenfolgeResponse>(url, param, {observe: 'response'});
  }

  fetchOnTourList(): Observable<Aenderungswunsch> {
    const url = `${environment.apiHost}/anfrage_stoppreihenfolge/false`;
    return this.http.get<Aenderungswunsch>(url);
  }

  fetchDetails(tourId: number): Observable<DetailAnsicht> {
    const url = `${environment.apiHost}/anfrage_stoppreihenfolge/fahrerinfo/` + tourId;
    return this.http.get<DetailAnsicht>(url);
  }

  fetchIstDetails(tourId: number) {
    const url = `${environment.apiHost}/anfrage_stoppreihenfolge/neue_tourplanung/${tourId}?moveBlock=false`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError('TimeoutError');
        }
        return throwError(error);
      })
    );
  }

  fetchSollDetails(tourId: number) {
    const url = `${environment.apiHost}/anfrage_stoppreihenfolge/neue_tourplanung/${tourId}?moveBlock=true`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError('TimeoutError');
        }
        return throwError(error);
      })
    );
  }
}
