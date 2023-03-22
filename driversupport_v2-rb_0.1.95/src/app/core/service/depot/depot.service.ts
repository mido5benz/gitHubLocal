import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Observable } from "rxjs";
import { app } from "src/environments/app-info";
import { baseUrl } from "src/environments/keycloak";


import { CurrentUser, User } from "../../../shared/models/user.model";

@Injectable({
  providedIn: "root",
})
export class DepotService {
  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {}

  public getDepots(token: string): Promise<CurrentUser> {
    const url = `${baseUrl}/rechte/v1/x/${app.name}/depots`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    return this.http.post<any>(url, {}, httpOptions).toPromise();
  }

  public getDepotForUser(): Observable<any> {
    const url = `${baseUrl}/rechte/v1/x/${app.name}/depots`;
    const token = this.keycloakService.getKeycloakInstance().token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    return this.http.post<any>(url, {}, httpOptions);
  }
}
