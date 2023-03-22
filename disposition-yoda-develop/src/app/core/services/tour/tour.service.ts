import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AvailableTour,
  DispoStopp,
  MoveStoppsRequest,
  SourceStoppToTargetStopp,
  Tour
} from '@models/index';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {environment} from '@environment*';
import {FreezeTourResponse} from '@models/tour/freeze-tour.response';
import {SetStoppOrderResponse} from '@models/tour/set-stopp-order.response';
import {NachladeBereichInfoResponse} from '@models/tour/reloadline-info.reponse';

@Injectable({
  providedIn: 'root',
})
export class TourService {

  public zieleZusammenfuehren = new BehaviorSubject(null);
  zieleZusammenfuehrenObserv = this.zieleZusammenfuehren.asObservable();

  public setZieleZusammenfuehren(ziele) {
    this.zieleZusammenfuehren.next(ziele);
  }

  constructor(private http: HttpClient) {
  }

  public moveStoppsToTour(tourId: number, dispoStopps: DispoStopp[]): Observable<any> {
    const url = `${environment.apiHost}/disposition/umDisposition`;

    const request: MoveStoppsRequest = {
      stopps: []
    };

    dispoStopps.forEach((stopp: DispoStopp) => {
      const requestObject: SourceStoppToTargetStopp = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        quell_dispostopp_id: stopp.dispostopp_id,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ziel_tour_id: tourId
      };

      request.stopps.push(requestObject);
    });
    return this.http.post<any>(url, request.stopps, {observe: 'response'});
  }

  public fetchAllTours(): Observable<Tour[]> {
    const url = `${environment.apiHost}/disposition?sendungDetails=false&uebernahmeDetails=false`;
    return this.http.get<Tour[]>(url);
  }

  public fetchAvailableTours(): Observable<AvailableTour[]> {
    const url = `${environment.apiHost}/stammdaten/touren`;
    return this.http.get<AvailableTour[]>(url);
  }

  public fetchTourById(tourId: number, withDetails: boolean = false): Observable<Tour> {
    return this.http.get<Tour>(`${environment.apiHost}/disposition/${tourId}?sendungDetails=${withDetails}&uebernahmeDetails=true`);
  }

  public fetchTour9999(): Observable<Tour> {
    return this.http.get<Tour>(`${environment.apiHost}/disposition/tour/9999`);
  }

  public isTourFrozen(tourId: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiHost}/disposition/${tourId}/isStoppsFreez`);
  }

  public isTourBlocked(tourId: number): Observable<any> {
    return this.http.get<boolean>(`${environment.apiHost}/disposition/${tourId}/isStoppsBlocked`);
  }

  public setTourStatus(tourId: number, frozen: boolean): Observable<FreezeTourResponse> {
    return this.http.put<FreezeTourResponse>(`${environment.apiHost}/disposition/${tourId}/stoppsFestschreiben?aktivieren=${frozen}`, {});
  }

  public stoppreihenfolgeNeuBerechnen(tourId: number): Observable<any> {
    return this.http.put<any>(`${environment.apiHost}/disposition/${tourId}/stoppsBerechnen`, {}, {observe: 'response'});
  }

  public setPotenzielleZieleBearbeitung(tourId: number) {
    return this.http.put<boolean>(`${environment.apiHost}/disposition/${tourId}/stoppsBearbeitet`, {});
  }

  public stoppsInManualDispoVereinigen(requestBody) {
    return this.http.post<any>(`${environment.apiHost}/disposition/stoppsVereinigen`, requestBody)
  }

  public getFrachfuehrer(tour: any): string {
    const name1 = tour.tour?.name_1 === null ? '' : tour.tour?.name_1;
    const name2 = tour.tour?.name_2 === null ? '' : tour.tour?.name_2;
    const name3 = tour.tour?.name_3 === null ? '' : tour.tour?.name_3;

    return `${name1} - ${name2} - ${name3}`;
  }

  public setTourStoppOrder(tourId: number, stopps: DispoStopp[]): Observable<SetStoppOrderResponse> {
    const requestBody = this.createChangeOrderRequestBody(stopps);
    return this.http.put<SetStoppOrderResponse>(`${environment.apiHost}/disposition/${tourId}/stoppsVerschieben`, requestBody);
  }

  public isReloadEditable(tourId: number): Observable<NachladeBereichInfoResponse> {
    return this.http.get<NachladeBereichInfoResponse>(`${environment.apiHost}/disposition/${tourId}/nachladebereich`);
  }

  public calculateOptimalRoute(waypoints): any {
    if (waypoints.length <= 1) {
      return of();
    }

    return this.http.post(`${environment.apiHost}/disposition/route`, waypoints);
  }

  private createChangeOrderRequestBody(stopps: DispoStopp[]): any {
    const requestBody = [];

    stopps.forEach((stopp: DispoStopp) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const {dispostopp_id, soll_stopp} = stopp;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      requestBody.push({dispostopp_id, soll_stopp});
    });

    return requestBody;
  }
}

