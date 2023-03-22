import {Injectable} from '@angular/core';
import {DeliveryDay, Location} from '@models/index';
import {GeoJsonService, MarkerService} from '@app/core/services';
import {FeatureCollection, Geometry} from 'geojson';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '@environment*';
import {GeofenceResponse} from '@models/map/geofence-response.model';
import {PointMarker} from '@models/map/marker.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private umdispoEvent = new Subject();
  umdispoEventInfo = this.umdispoEvent.asObservable();

  public checkLoadingUmdispo = new BehaviorSubject(false)
  checkLoadingUmdispoObserv = this.checkLoadingUmdispo.asObservable();

  public ausliefertag = new BehaviorSubject(null);
  ausliefertagObserv = this.ausliefertag.asObservable();

  public maschDispoStart = new BehaviorSubject(false);
  checkIfMaschDispoStartedObserv = this.maschDispoStart.asObservable();

  constructor(
    private markerService: MarkerService,
    private geoJsonService: GeoJsonService,
    private http: HttpClient
  ) {
  }

  public setUmdispoLoading(loading) {
    this.checkLoadingUmdispo.next(loading);
  }

  public isMaschinelleDispoStarted(loading) {
    this.maschDispoStart.next(loading);
  }

  public setAusliefertag(ausliefertag) {
    this.ausliefertag.next(ausliefertag);
  }

  public umdispoEventInfoMethod(umdispoEvent) {
    this.umdispoEvent.next(umdispoEvent);
  }

  public getAusliefergrenze(): Observable<GeofenceResponse> {
    return this.http.get<GeofenceResponse>(`${environment.apiHost}/raster/geofence`);
  }

  public getAusliefergrenzeTour(tour): Observable<GeofenceResponse> {
    return this.http.post<GeofenceResponse>(`${environment.apiHost}/raster/geofence`, tour);
  }

  public createSites(
    sites: Location[]
  ): FeatureCollection<Geometry, { [p: string]: any }> {
    const markers = this.createSiteMakers(sites);
    return this.geoJsonService.createFeatureCollection(markers);
  }

  private createSiteMakers(collection: Location[]): PointMarker[] {
    return this.markerService.createSitesMarkerArray(collection);
  }

  public getDeliveryDay(): Observable<DeliveryDay> {
    const url = `${environment.apiHost}/disposition/ausliefertag`;
    return this.http.get<DeliveryDay>(url);
  }

  public activateMaschinelleDispo(): Observable<any> {
    const url = `${environment.apiHost}/masch_dispo/aktivieren`;
    return this.http.put<any>(url, {});
  }

  public startPTVPlanning(code: number): Observable<any> {
    let url = `${environment.apiHost}/masch_dispo/restplanung/${code}`;
    return this.http.put(url, {});
  }

  public checkPtvLoading(): Observable<any> {
    let url = `${environment.apiHost}/masch_dispo/restplanung`;
    return this.http.get(url);
  }

  public isMaschinelleDispoLoading(): Observable<any> {
    let url = `${environment.apiHost}/masch_dispo/aktiv`;
    return this.http.get(url);
  }
}

