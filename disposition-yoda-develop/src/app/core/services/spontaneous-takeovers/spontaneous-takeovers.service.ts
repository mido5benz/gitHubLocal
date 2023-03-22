import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  DepotListe,
  KundenUebernahme,
  SpontaneUebernahme,
} from '@models/spontaneous-takeovers/spontaneous-takeovers.model';
import {environment} from '@environment*';

@Injectable({
  providedIn: 'root'
})
export class SpontaneousTakeoversService {

  private refresh = new BehaviorSubject(false);
  refreshTableData = this.refresh.asObservable();

  private changeDepotNr = new BehaviorSubject(null);
  newDepotNr = this.changeDepotNr.asObservable();

  constructor(private http: HttpClient) {
  }

  public formSubmitted(message: boolean) {
    this.refresh.next(message);
  }

  // When selecting a new depot
  public getDataForNewDepotNr(depotNr: string) {
    this.changeDepotNr.next(depotNr);
  }

  public getSpontaneUebernahmen(): Observable<SpontaneUebernahme[]> {
    return this.http.get<SpontaneUebernahme[]>(`${environment.apiHost}/uebernahmen?typ=S`);
  }

  public getKundenUebernahmen(depotNr: string): Observable<KundenUebernahme[]> {
    return this.http.get<KundenUebernahme[]>(`${environment.apiHost}/uebernahmen/ladestellen/${depotNr}`);
  }

  public saveSpontaneousTakeovers(form): Observable<SpontaneUebernahme[]> {
    return this.http.put<SpontaneUebernahme[]>(`${environment.apiHost}/uebernahmen`, form);
  }

  public getDepotList(): Observable<DepotListe[]> {
    return this.http.get<DepotListe[]>(`${environment.apiHost}/stammdaten/depots`);
  }

}
