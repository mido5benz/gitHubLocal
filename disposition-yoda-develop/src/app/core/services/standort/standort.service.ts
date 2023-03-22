import {Injectable} from '@angular/core';
import {locations} from '@shared/data/liste-standorte.data';
import {Observable, of} from 'rxjs';
import {Location} from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor() {
  }

  public fetchLocations(): Observable<Location[]> {
    return of(locations);
  }
}
