import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {app, baseUrl} from '@environment*';
import {CurrentUser} from '@models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient,) { }

  public getDepots(token: string): Promise<CurrentUser> {
    const url = `${baseUrl}/rechte/v1/x/${app.name}/depots`;
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Bearer ' + token,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: '*/*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<any>(url, {}, httpOptions).toPromise();
  }

}
