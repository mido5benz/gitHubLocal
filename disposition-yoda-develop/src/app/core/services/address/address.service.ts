import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment*';
import {SeperateSynonymRequest} from '@models/server-request/seperate-synonym.request';
import {Address} from '@shared/models';
import {Synonym} from '@models/address/synonym.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public addedSynonym = new BehaviorSubject(false);
  clearAdressFormObserv = this.addedSynonym.asObservable();

  public resetSynonymErgebnisse = new BehaviorSubject(false);
  clearSynonymErgebisseObserv = this.resetSynonymErgebnisse.asObservable();

  public clearAdressForm(clearForm: boolean) {
    this.addedSynonym.next(clearForm);
  }

  public clearSynonymErgebnisse(clearSynonym: boolean) {
    this.resetSynonymErgebnisse.next(clearSynonym);
  }

  constructor(private httpClient: HttpClient) {
  }

  public fetchUnassignedAddresses(days: number, records: number = 50): Observable<Address[]> {
    const queryParams = days ? `days=${days}&records=${records}` : `records=${records}`;
    return this.httpClient.get<Address[]>(`${environment.apiHost}/fehler/adressen?${queryParams}`);
  }

  public fetchUnassignedAddressesCount(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiHost}/fehler/anzahl_adressen`);
  }

  public createAddress(): Observable<boolean> {
    return of(true);
  }

  public saveUnassignedAdress(address: Address): Observable<Address> {
    return this.httpClient.post<any>(`${environment.apiHost}/fehler/adressen`, address);
  }

  public createSynonym(address: Address): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiHost}/fehler/adressen`, address);
  }

  public fetchSynonyms(zielNameId: number): Observable<Synonym[]> {
    return this.httpClient.get<Synonym[]>(`${environment.apiHost}/ziele/synonyme/${zielNameId}`);
  }

  public seperateSynonym(seperateRequest: SeperateSynonymRequest): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiHost}/ziele/trennen`, seperateRequest);
  }

  //Services für Archivierung von fehlerhaften Adressen vorbereitet

  public archiveAddress(geoadresseFehlerIds: any[]): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiHost}/fehler/adressen/archivieren`, geoadresseFehlerIds);
  }

  public reactivateArchivedAddress(geoadresseFehlerIds: number[]): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiHost}/fehler/adressen/reaktivieren`, geoadresseFehlerIds)
  }

  public getArchivedAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`${environment.apiHost}/fehler/adressen/archiviert`);
  }

  public getArchivedAddressCount(): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiHost}/fehler/anzahl_adressen/archiviert`);
  }

}
