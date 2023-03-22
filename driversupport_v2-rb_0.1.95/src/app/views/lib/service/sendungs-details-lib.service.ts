import { Observable } from 'rxjs';
import { TypeSendung } from './../../../_services/api';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SendungsDetailsLibService {
  public env = environment;

  constructor(private http: HttpClient) { }

  getShipmentDetailsTypeSend(packstueckreferenz,avisDetails?,sendungskette?,dispoDetails?,scannungen?,seereignisse?): Observable<TypeSendung>{
    var params = new HttpParams();
    params = params.set('avisDetails', !avisDetails ? true : avisDetails );
    params = params.set('sendungskette', !sendungskette ? true : sendungskette);
    params = params.set('dispoDetails', !dispoDetails ? true : dispoDetails);
    params = params.set('scannungen', !scannungen ? true : scannungen);
    params = params.set('seereignisse', !seereignisse ? true : seereignisse);
    return this.http.get<TypeSendung>(this.env.baseUrl + '/process/sendungen/dispovolumen/'+ packstueckreferenz,{ params: params });
  }

  getShipmentDetailsForModal(packstueckreferenz,avisDetails?): Observable<TypeSendung>{
    var params = new HttpParams();
    params = params.set('avisDetails', !avisDetails ? true : avisDetails );
    return this.http.get<TypeSendung>(this.env.baseUrl + '/process/sendungen/dispovolumen/'+ packstueckreferenz,{ params: params });
  }

  getSendungskorrekturDienste() {
    return this.http.get<any>(this.env.baseUrl + '/process/masterdata/dienste/sendungskorrektur/zeit');
  }

  sendCorrectedValues(form, sendungId) {
    if(form !== null) {
      return this.http.put(this.env.baseUrl + `/process/sendungen/${sendungId}/korrektur`, form, {observe: 'response'});
    }
  }

  getCorrectedValues(sendungId) {
    return this.http.get(this.env.baseUrl + `/process/sendungen/${sendungId}`);
  }

  getSendungsDaten(sendungsId, scannungen) {
    let params = new HttpParams();
    params = params.set('scannungen', scannungen);
    return this.http.get<any>(this.env.baseUrl + `/process/sendungen/${sendungsId}`, {params: params});
  }

}
