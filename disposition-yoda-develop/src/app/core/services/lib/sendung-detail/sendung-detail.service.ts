import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@environment*';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendungDetailService {

  constructor(private http: HttpClient) {
  }

  requestSendungsDetailFromMultipleSources(sendungId) {
    let sendungsereignisse = this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}/sendungsereignisse`);
    let dispoDetails = this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}/dispodetails`);
    let colliereignisse = this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}/scannungen`);
    let gefahrgueter = this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}/gefahrgueter`);
    let sendungsdaten = this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}`);
    let dienste = this.http.get(`${environment.apiHost}/process/masterdata/dienste/sendungskorrektur/zeit`);
    let sendungskette = this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}/sendungskette`);
    return forkJoin([sendungsereignisse, dispoDetails, colliereignisse, gefahrgueter, sendungsdaten, dienste, sendungskette]);
  }

  sendCorrectedValues(form, sendungId) {
    if (form !== null) {
      return this.http.put(`${environment.apiHost}/process/sendungen/${sendungId}/korrektur`, form);
    }
  }

  getCorrectedValues(sendungId) {
    return this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}`);
  }

  getSendungsDaten(sendungId, scannungen) {
    let params = new HttpParams();
    params = params.set('scannungen', scannungen);
    return this.http.get(`${environment.apiHost}/process/sendungen/${sendungId}`, {params: params});
  }

}
