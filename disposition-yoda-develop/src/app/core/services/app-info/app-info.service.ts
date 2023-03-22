import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment*';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  constructor(private http: HttpClient) {
  }

  public async getApplicationInfo(): Promise<any> {

    const applications = await this.http.get(`${environment.apiHost}/applications`).toPromise();
    const versions = await this.http.get(`${environment.apiHost}/versions`).toPromise();
    const status = await this.http.get(`${environment.apiHost}/status`).toPromise();

    return {
      applications,
      versions,
      status
    };
  }
}
