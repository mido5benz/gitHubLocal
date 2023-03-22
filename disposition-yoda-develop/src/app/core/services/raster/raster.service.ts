import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {share, tap} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {Raster, RasterDetails} from '@models/strategic-dispo/raster.model';
import {locations} from '@app/shared/data/liste-standorte.data';
import {Location} from '@app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class RasterService {
  currentRaster: BehaviorSubject<number> = new BehaviorSubject(0);

  private detailsSattel: RasterDetails[];
  private detailsSattelObservable: Observable<RasterDetails[]>;
  private detailsLkw: RasterDetails[];
  private detailsLkwObservable: Observable<RasterDetails[]>;
  private detailsExpress: RasterDetails[];
  private detailsExpressObservable: Observable<RasterDetails[]>;
  private detailsRegel: RasterDetails[];
  private detailsRegelObservable: Observable<RasterDetails[]>;
  private detailsSamstag: RasterDetails[];
  private detailsSamstagObservable: Observable<RasterDetails[]>;

  public rasterMapSattel = {};
  private rasterMapLkw = {};
  private rasterMapExpress = {};
  public rasterMapRegel = {};
  public rasterMapSamstag = {};

  public standort = null;

  constructor(private http: HttpClient) {
    this.getRastersSattel().subscribe();
    this.getRastersLkw().subscribe();
    this.getRastersExpress().subscribe();
    this.getRastersRegel().subscribe();
    this.getRastersSamstag().subscribe();
  }

  public getRasterStandort(): void {
    const standort = locations.find(
      (s: Location) => s.relnr.toString() === localStorage.getItem('userDepot')
    );
    const url = `${environment.apiHost}/raster/${standort.lon}/${standort.lat}`;
    this.http.get<any>(url).subscribe((result) => this.standort = result.features[0].properties.id);
  }

  public getSattelRaster(): Observable<RasterDetails[]> {
    const url = `${environment.apiHost}/raster/mengen/sattel`;
    return this.http.get<RasterDetails[]>(url);
  }

  public getLKWRaster(): Observable<RasterDetails[]> {
    const url = `${environment.apiHost}/raster/mengen/lkw`;
    return this.http.get<RasterDetails[]>(url);
  }

  public getExpressRaster(): Observable<RasterDetails[]> {
    const url = `${environment.apiHost}/raster/mengen/express`;
    return this.http.get<RasterDetails[]>(url);
  }

  public getNormalRaster(): Observable<RasterDetails[]> {
    const url = `${environment.apiHost}/raster/mengen/rahmen`;
    return this.http.get<RasterDetails[]>(url);
  }



  public getRastersSattel(): Observable<RasterDetails[]> {
    if (this.detailsSattel) {
      return of(this.detailsSattel);
    } else if (this.detailsSattelObservable) {
      return this.detailsSattelObservable;
    } else {
      const url = `${environment.apiHost}/raster/mengen/sattel`;
      return this.detailsSattelObservable = this.http.get<RasterDetails[]>(url).pipe(
        tap((details: RasterDetails[]) => {
          this.detailsSattel = details;
          this.detailsSattelObservable = null;
          this.generateDataMapsSattel();
          return details;
        }),
        share()
      );
    }
  }

  public getRastersLkw(): Observable<RasterDetails[]> {
    if (this.detailsLkw) {
      return of(this.detailsLkw);
    } else if (this.detailsLkwObservable) {
      return this.detailsLkwObservable;
    } else {
      const url = `${environment.apiHost}/raster/mengen/lkw`;
      return this.detailsLkwObservable = this.http.get<RasterDetails[]>(url).pipe(
        tap((details: RasterDetails[]) => {
          this.detailsLkw = details;
          this.detailsLkwObservable = null;
          this.generateDataMapsLkw();
          return details;
        }),
        share()
      );
    }
  }

  public getRastersExpress(): Observable<RasterDetails[]> {
    if (this.detailsExpress) {
      return of(this.detailsExpress);
    } else if (this.detailsExpressObservable) {
      return this.detailsExpressObservable;
    } else {
      const url = `${environment.apiHost}/raster/mengen/express`;
      return this.detailsExpressObservable = this.http.get<RasterDetails[]>(url).pipe(
        tap((details: RasterDetails[]) => {
          this.detailsExpress = details;
          this.detailsExpressObservable = null;
          this.generateDataMapsExpress();
          return details;
        }),
        share()
      );
    }
  }

  public getRastersRegel(): Observable<RasterDetails[]> {
    if (this.detailsRegel) {
      return of(this.detailsRegel);
    } else if (this.detailsRegelObservable) {
      return this.detailsRegelObservable;
    } else {
      const url = `${environment.apiHost}/raster/mengen/rahmen`;
      return this.detailsRegelObservable = this.http.get<RasterDetails[]>(url).pipe(
        tap((details: RasterDetails[]) => {
          this.detailsRegel = details;
          this.detailsRegelObservable = null;
          this.generateDataMapsRegel();
          return details;
        }),
        share()
      );
    }
  }

  public getRastersSamstag(): Observable<RasterDetails[]> {
    if (this.detailsSamstag) {
      return of(this.detailsSamstag);
    } else if (this.detailsSamstagObservable) {
      return this.detailsSamstagObservable;
    } else {
      const url = `${environment.apiHost}/raster/mengen/samstag`;
      return this.detailsRegelObservable = this.http.get<RasterDetails[]>(url).pipe(
        tap((details: RasterDetails[]) => {
          this.detailsSamstag = details;
          this.detailsSamstagObservable = null;
          this.generateDataMapsSamstag();
          return details;
        }),
        share()
      );
    }
  }

  public getRasterByCoordinate(latLng: L.LatLng, layer: string): Raster {
    const lat = latLng.lat.toFixed(6);
    const lng = latLng.lng.toFixed(6);

    switch (layer) {
      case 'sattel':
        return this.rasterMapSattel[lat] ? this.rasterMapSattel[lat][lng] : null;
      case 'lkw':
        return this.rasterMapLkw[lat] ? this.rasterMapLkw[lat][lng] : null;
      case 'express':
        return this.rasterMapExpress[lat] ? this.rasterMapExpress[lat][lng] : null;
      case 'regel':
        return this.rasterMapRegel[lat] ? this.rasterMapRegel[lat][lng] : null;
      case 'samstag':
        return this.rasterMapSamstag[lat] ? this.rasterMapSamstag[lat][lng] : null;
    }
  }

  private generateDataMapsSattel(): void {
    this.rasterMapSattel = {};

    // generate raster map
    this.detailsSattel.forEach((r: RasterDetails) => {
      const lat = r.geo_x_bottom_left.toFixed(6);
      const lng = r.geo_y_bottom_left.toFixed(6);

      if (!this.rasterMapSattel[lat]) {
        this.rasterMapSattel[lat] = {};
      }

      if (!this.rasterMapSattel[lat][lng]) {
        const details = {};
        details[r.wochentag_id_fk] = r;
        this.rasterMapSattel[lat][lng] = new Raster(r.georaster_id, r.geo_x_bottom_left, r.geo_y_bottom_left, details);
      } else {
        this.rasterMapSattel[lat][lng].details[r.wochentag_id_fk] = r;
      }
    });


  }

  private generateDataMapsLkw(): void {
    this.rasterMapLkw = {};

    // generate raster map
    this.detailsLkw.forEach((r: RasterDetails) => {
      const lat = r.geo_x_bottom_left.toFixed(6);
      const lng = r.geo_y_bottom_left.toFixed(6);

      if (!this.rasterMapLkw[lat]) {
        this.rasterMapLkw[lat] = {};
      }

      if (!this.rasterMapLkw[lat][lng]) {
        const details = {};
        details[r.wochentag_id_fk] = r;
        this.rasterMapLkw[lat][lng] = new Raster(r.georaster_id, r.geo_x_bottom_left, r.geo_y_bottom_left, details);
      } else {
        this.rasterMapLkw[lat][lng].details[r.wochentag_id_fk] = r;
      }
    });
  }

  private generateDataMapsExpress(): void {
    this.rasterMapExpress = {};

    // generate raster map
    this.detailsExpress.forEach((r: RasterDetails) => {
      const lat = r.geo_x_bottom_left.toFixed(6);
      const lng = r.geo_y_bottom_left.toFixed(6);

      if (!this.rasterMapExpress[lat]) {
        this.rasterMapExpress[lat] = {};
      }

      if (!this.rasterMapExpress[lat][lng]) {
        const details = {};
        details[r.wochentag_id_fk] = r;
        this.rasterMapExpress[lat][lng] = new Raster(r.georaster_id, r.geo_x_bottom_left, r.geo_y_bottom_left, details);
      } else {
        this.rasterMapExpress[lat][lng].details[r.wochentag_id_fk] = r;
      }
    });
  }

  private generateDataMapsRegel(): void {
    this.rasterMapRegel = {};

    // generate raster map
    this.detailsRegel.forEach((r: RasterDetails) => {
      const lat = r.geo_x_bottom_left.toFixed(6);
      const lng = r.geo_y_bottom_left.toFixed(6);

      if (!this.rasterMapRegel[lat]) {
        this.rasterMapRegel[lat] = {};
      }

      if (!this.rasterMapRegel[lat][lng]) {
        const details = {};
        details[r.wochentag_id_fk] = r;
        this.rasterMapRegel[lat][lng] = new Raster(r.georaster_id, r.geo_x_bottom_left, r.geo_y_bottom_left, details);
      } else {
        this.rasterMapRegel[lat][lng].details[r.wochentag_id_fk] = r;
      }
    });
  }

  private generateDataMapsSamstag(): void {
    this.rasterMapSamstag = {};

    // generate raster map
    this.detailsSamstag.forEach((r: RasterDetails) => {
      const lat = r.geo_x_bottom_left.toFixed(6);
      const lng = r.geo_y_bottom_left.toFixed(6);

      if (!this.rasterMapSamstag[lat]) {
        this.rasterMapSamstag[lat] = {};
      }

      if (!this.rasterMapSamstag[lat][lng]) {
        const details = {};
        details[r.wochentag_id_fk] = r;
        this.rasterMapSamstag[lat][lng] = new Raster(r.georaster_id, r.geo_x_bottom_left, r.geo_y_bottom_left, details);
      } else {
        this.rasterMapSamstag[lat][lng].details[r.wochentag_id_fk] = r;
      }
    });
  }

}
