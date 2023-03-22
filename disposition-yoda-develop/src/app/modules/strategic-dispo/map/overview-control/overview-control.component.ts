import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, DoCheck, Input, OnDestroy} from '@angular/core';
import {RasterService} from '@app/core/services/raster/raster.service';
import {environment} from '../../../../../environments/environment';
import {Raster, RasterDetails} from '@models/strategic-dispo/raster.model';
import {StrategicTour} from '@models/strategic-dispo/strategic-tour.model';
import {MapService} from '../map.service';
import {select, Store} from '@ngrx/store';
import * as ActiveLayerSelectors from '@store/strategic-dispo/selectors/active-layer.selectors';

@Component({
  templateUrl: 'overview-control.component.html',
  styleUrls: ['./overview-control.component.scss']
})
export class OverviewControlComponent implements DoCheck, OnDestroy {

  @Input() tour: StrategicTour;

  public shipments = 0;
  public colli = 0;
  public paletten = 0;
  public kg = 0;
  public fahrtzeit: number = null;

  public maxFahrtzeitInSec = 28800; // 8h

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private mapService: MapService,
    private rasterService: RasterService,
    private store: Store) {
  }

  get loading(): boolean {
    return this.mapService.getLoading();
  }

  // TODO Prüfen ob Raster da
  ngDoCheck(): void {
    this.mapService.setLoadingTrue();

    const rasterArray = this.tour.raster_total.map((r: Raster) => r.id);
    if (rasterArray.find(a => a === this.rasterService.standort) !== this.rasterService.standort) {
      rasterArray.push(this.rasterService.standort);
    }
    this.store.pipe(select(ActiveLayerSelectors.getActiveLayer)).subscribe((layer) => {
      const url = `${environment.apiHost}/raster/fahrzeiten?layer=${layer}`;
      this.http.post(url, rasterArray).subscribe((result: any) => {
        this.fahrtzeit = result.value;
        this.mapService.setLoadingFalse();
        this.changeDetectorRef.detectChanges();
      });
    }).unsubscribe();

    this.shipments = 0;
    this.colli = 0;
    this.paletten = 0;
    this.kg = 0;

    this.tour.raster_total.forEach((r: Raster) => {
      let length = 0;
      let zwischenKg = 0;
      let zwischenShipments = 0;
      let zwischenColli = 0;
      let zwischenPaletten = 0;
      Object.values(r.details).forEach((details: RasterDetails) => {
        zwischenKg += details.gesamtgewicht;
        zwischenShipments += details.gesamtmenge;
        zwischenColli += details.anzahl_col;
        zwischenPaletten += details.anzahl_pal;
        length++;
      });
      if (length > 0) {
        this.kg += zwischenKg / length;
        this.shipments += zwischenShipments / length;
        this.colli += zwischenColli / length;
        this.paletten += zwischenPaletten / length;
      }
    });

    if (this.kg) {
      this.kg = this.kg;
    }
  }

  public aufrunden(value: number): number {
    return Math.ceil(value);
  }

  public convertTourNr(tourNr: string): string {
    let convertedTourNr = tourNr;

    if (convertedTourNr) {
      convertedTourNr = convertedTourNr.slice(0, 1) + '-' + convertedTourNr.slice(1);
    }

    return convertedTourNr;
  }

  ngOnDestroy(): void {
    this.changeDetectorRef.detach();
  }

}
