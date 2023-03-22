import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TagesDispoActiveResponse} from '@models/index';
import {Observable} from 'rxjs';
import {environment} from '@environment*';

@Injectable({
  providedIn: 'root',
})
export class TagesdispoService {
  constructor(private http: HttpClient) {
  }

  public isActiveRequest(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiHost}/disposition/aktivierung`);
  }

  public activateDispoRequest(): Observable<TagesDispoActiveResponse> {
    return this.http.put<TagesDispoActiveResponse>(`${environment.apiHost}/disposition/aktivierung`, {});
  }
}
