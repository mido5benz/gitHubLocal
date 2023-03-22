import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ReloadLineChangedResponse} from '@shared/models';
import {environment} from '@environment*';
import {DeleteReloadlineResponse} from '@models/tour/delete-reloadline.model';

@Injectable({
  providedIn: 'root'
})
export class ReloadlineService {

  constructor(private httpClient: HttpClient) {
  }

  public deleteReloadLine(tourId: number): Observable<DeleteReloadlineResponse> {
    return this.httpClient.delete<DeleteReloadlineResponse>(
      `${environment.apiHost}/disposition/${tourId}/nachladebereich`,
      {}
    );
  }

  public moveReloadLine(tourId: number, sollStopp: number): Observable<ReloadLineChangedResponse> {
    return this.httpClient.put<ReloadLineChangedResponse>(
      `${environment.apiHost}/disposition/${tourId}/nachladebereich/${sollStopp}`,
      {}
    );
  }
}
