import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReleaseProcessService {
  public env = environment

  private sendSSEData = new BehaviorSubject(null);
  sseData = this.sendSSEData.asObservable();

  private tourSelection = new BehaviorSubject(false);
  selectedTours = this.tourSelection.asObservable();

  private toggleCard = new BehaviorSubject(null);
  cardToggle = this.toggleCard.asObservable();

  constructor(private http: HttpClient) {
  }

  public transferSelectedTours(selectedTours) {
    this.tourSelection.next(selectedTours)
  }

  public sendSSEDataToProcessRelease(anzeigeFreigabe) {
    this.sendSSEData.next(anzeigeFreigabe);
  }


  public fetchReasonForPhotoRejection() {
    return this.http.get(this.env.baseUrl + '/mainData/fotoRatingReason');
  }

  public sendPhotoRelease(photoReleaseObject) {
    return this.http.put(this.env.baseUrl + '/tourDashboard/confirmRingFahrer', photoReleaseObject);
  }

  // RequestObject: Daten aus SSE
  // Response: Fotodaten aus DS-Backend
  public sendFotoLadesicherungData(requestObject) {
    return this.http.put(this.env.baseUrl + '/tourDashboard/FotoLadesicherung/', requestObject);
  }

  public sendLoadingEquipment(loadingEquipment) {
    console.log(loadingEquipment);
  }



}
