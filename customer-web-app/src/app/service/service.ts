import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerModel} from "../shared/models/customer.model";

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {

  public env = environment;

  constructor(private http:HttpClient) {}


  getAllCustomers(): Observable<CustomerModel[]>{
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http.get<CustomerModel[]>(this.env.serverUrl+'/customers',{headers});
  }

}
