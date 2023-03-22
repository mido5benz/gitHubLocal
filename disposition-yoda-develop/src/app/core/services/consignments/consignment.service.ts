import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consignment, DispoStopp} from '@shared/models';
import {environment} from '@environment*';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MoveConsignmentResponse} from '@models/consignment/move-consignment.response';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentService {

  constructor(private http: HttpClient) {
  }

  public moveConsignment(sourceStoppId: number, sendungen: Consignment[], targetTourId: number): Observable<MoveConsignmentResponse> {
    const requestBody = [{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      quell_dispostopp_id: sourceStoppId,
      sendungIds: sendungen.map((s: Consignment) => s.sendung_id),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ziel_tour_id: targetTourId
    }];
    return this.http.post<MoveConsignmentResponse>(`${environment.apiHost}/disposition/umDisposition`, requestBody);
  }

  public fetchConsignments(tourId: number, dispoStoppId: number): Observable<Consignment[]> {
    return this.http.get<DispoStopp>(`${environment.apiHost}/disposition/${tourId}/${dispoStoppId}`).pipe(
      map((dispoStopp: DispoStopp) => dispoStopp?.sendungen)
    );
  }
}
