import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '@models/user/user.model';
import {app, baseUrl} from '@environment*';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  public user: User = {
    roles: [],
    depot: null,
    app: '',
    user: '',
    total: 0
  };

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
  }

  async getUserRights(): Promise<void> {
    const url = `${baseUrl}/rechte/v1/x/${app.name}/${localStorage.getItem('userDepotId')}`;
    const token = this.keycloakService.getKeycloakInstance().token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.user = await this.http.post<User>(url, {}, httpOptions).toPromise();
  }
}
