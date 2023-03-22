import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {RightsService} from '@app/core/services/rights/rights.service';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {User} from '@models/user/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {app, baseUrl} from '@environment*';
import {DepotService} from '@app/core/services/depot/depot.service';

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

      const url = `${baseUrl}/rechte/v1/x/${app.name}/${localStorage.getItem('userDepotId')}`;
      const token = this.keycloak.getKeycloakInstance().token;
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
      const user = await this.http.post<User>(url, {}, httpOptions).toPromise();
      if (user.roles.includes('DISPOYODA_NOTFALL')) {
        sessionStorage.setItem('hasEmergencyButtonRight', 'true');
      } else {
        sessionStorage.setItem('hasEmergencyButtonRight', 'false');
      }

      return requiredRights.every((role) => user.roles.includes(role));
    }
  }
}
