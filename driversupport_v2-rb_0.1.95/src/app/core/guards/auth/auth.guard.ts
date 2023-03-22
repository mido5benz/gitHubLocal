import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { User } from '../../../shared/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RightsService } from '../../service/rights/rights.service';
import { DepotService } from '../../service/depot/depot.service';

import { app } from 'src/environments/app-info';
import { baseUrl } from 'src/environments/keycloak';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private rightsService: RightsService,
    private http: HttpClient,
    private depotService: DepotService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login();
    } else {
      const requiredRights = route.data.rights;
      // If there is no right needed for this route
      if (requiredRights.length <= 0) {
        return true;
      }

      if (!(requiredRights instanceof Array) || requiredRights.length === 0) {
        return true;
      }

      const url = `${baseUrl}/rechte/v1/x/${app.name}/${localStorage.getItem(
        'userDepotId'
      )}`;
      const token = this.keycloak.getKeycloakInstance().token;
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      };
      const user = await this.http.post<User>(url, {}, httpOptions).toPromise();
      return requiredRights.every((role) => user.roles.includes(role));
    }
  }
}
