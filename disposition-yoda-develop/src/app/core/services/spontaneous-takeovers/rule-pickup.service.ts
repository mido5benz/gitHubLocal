import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RulePickup} from '@models/spontaneous-takeovers/rule-pickup.model';
import {environment} from '@environment*';

@Injectable({
  providedIn: 'root'
})
export class RulePickupService {

  public regelabholung = new BehaviorSubject(false);
  loadRegelAbholungDataObserv = this.regelabholung.asObservable();

  public createdRegelabholung(data) {
    this.regelabholung.next(data);
  }

  constructor(private http: HttpClient) { }

  public getRulePickups(): Observable<RulePickup[]> {
    return this.http.get<RulePickup[]>(`${environment.apiHost}/uebernahmen/dauerauftraege`);
  }

  public saveRulePickup(requestObject: RulePickup): Observable<any> {
    return this.http.put<RulePickup>(`${environment.apiHost}/uebernahmen/dauerauftraege`, requestObject, {observe: 'response'});
  }

  public deleteRulePickup(dauerauftragId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiHost}/uebernahmen/dauerauftraege/${dauerauftragId}`, {observe: 'response'});
  }

}
