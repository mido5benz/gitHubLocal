import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment*';
import {Observable} from 'rxjs';
import {OutstandingToursReponse} from '@models/tour/outstanding-tours.reponse';

@Injectable({
  providedIn: 'root'
})
export class TagesabschlussService {

  constructor(private http: HttpClient) {
  }

  public executeDailyClosing(): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiHost}/disposition/tagesabschluss`, {});
  }

  public fetchOustandingTours(): Observable<OutstandingToursReponse> {
    return this.http.get<OutstandingToursReponse>(`${environment.apiHost}/disposition/tagesabschluss/touren`);
  }
}
