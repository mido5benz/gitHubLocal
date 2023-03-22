import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {share, tap} from 'rxjs/internal/operators';
import {environment} from '@environment*';
import {Raster} from '@models/strategic-dispo/raster.model';
import {StrategicTour} from '@models/strategic-dispo/strategic-tour.model';
import {PalletService} from '../pallet/pallet.service';

@Injectable({
  providedIn: 'root'
})
export class StrategicTourService {

  public selectTourControl: BehaviorSubject<any> = new BehaviorSubject(null);

  private tours: StrategicTour[];
  private toursObservable: Observable<StrategicTour[]>;
  private rasterTourSattel = {};
  private rasterTourLkw = {};
  private rasterTourExpress = {};
  private rasterTourRegel = {};
  private rasterTourSamstag = {};
  private tourMap = {};

  private selectedTour: StrategicTour;

  constructor(private http: HttpClient, private palletService: PalletService) {
    this.getTours().subscribe();
  }

  public getTours(): Observable<StrategicTour[]> {
    if (this.tours) {
      return of(this.tours);
    } else if (this.toursObservable) {
      return this.toursObservable;
    } else {
      const url = `${environment.apiHost}/stammdaten/rahmentouren`;
      return this.toursObservable = this.http.get<StrategicTour[]>(url).pipe(
        tap((tours: StrategicTour[]) => {
          this.tours = tours;
          this.toursObservable = null;
          // fill raster tour map (for performance improvement)
          tours.forEach((tour: StrategicTour) => this.tourMap[tour.tour_id] = tour);
          return tours;
        }),
        share()
      );
    }
  }

  public getTourByRaster(raster: Raster, layer: string): StrategicTour {
    switch (layer) {
      case 'sattel':
        return this.rasterTourSattel[raster.id];
      case 'lkw':
        return this.rasterTourLkw[raster.id];
      case 'express':
        return this.rasterTourExpress[raster.id];
      case 'regel':
        return this.rasterTourRegel[raster.id];
      case 'samstag':
        return this.rasterTourSamstag[raster.id];
    }
  }

  public getTourById(id: number): StrategicTour {
    return this.tourMap[id];
  }

  public clearRaster(): void {
    this.tours.forEach((tour) => {
      tour.raster_sattel?.forEach((raster) => {
        this.removeRasterFromTourSattel(tour.tour_id, raster.id);
      });
      tour.raster_lkw?.forEach((raster) => {
        this.removeRasterFromTourLkw(tour.tour_id, raster.id);
      });
      tour.raster_express?.forEach((raster) => {
        this.removeRasterFromTourExpress(tour.tour_id, raster.id);
      });
      tour.raster_regel?.forEach((raster) => {
        this.removeRasterFromTourRegel(tour.tour_id, raster.id);
      });
      tour.raster_samstag?.forEach((raster) => {
        this.removeRasterFromTourSamstag(tour.tour_id, raster.id);
      });
      tour.raster_total = [];
    });
  }

  public addRasterToLayer(tourId: number, raster: Raster, layer: string): void {
    switch (layer) {
      case 'sattel': {
        this.addRasterToTourSattel(tourId, raster);
        break;
      }
      case 'lkw': {
        this.addRasterToTourLkw(tourId, raster);
        break;
      }
      case 'express': {
        this.addRasterToTourExpress(tourId, raster);
        break;
      }
      case 'regel': {
        this.addRasterToTourRegel(tourId, raster);
        break;
      }
      case 'samstag': {
        this.addRasterToTourSamstag(tourId, raster);
        break;
      }
    }
  }

  public addRasterToTourSattel(tourId: number, raster: Raster): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      if (!foundTour.raster_sattel) {
        foundTour.raster_sattel = [];
      }
      if (!foundTour.raster_total) {
        foundTour.raster_total = [];
      }

      if (foundTour.raster_sattel.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_sattel.push(raster);
        this.rasterTourSattel[raster.id] = foundTour;
      }
      if (foundTour.raster_total.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_total.push(raster);
        this.rasterTourSattel[raster.id] = foundTour;
      }
      this.palletService.removeGrosspostenSattel(raster.id);
    }
  }

  public addRasterToTourLkw(tourId: number, raster: Raster): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      if (!foundTour.raster_lkw) {
        foundTour.raster_lkw = [];
      }
      if (!foundTour.raster_total) {
        foundTour.raster_total = [];
      }

      if (foundTour.raster_lkw.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_lkw.push(raster);
        this.rasterTourLkw[raster.id] = foundTour;
      }
      if (foundTour.raster_total.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_total.push(raster);
        this.rasterTourLkw[raster.id] = foundTour;
      }
      this.palletService.removeGrosspostenLkw(raster.id);
    }
  }

  public addRasterToTourExpress(tourId: number, raster: Raster): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      if (!foundTour.raster_express) {
        foundTour.raster_express = [];
      }
      if (!foundTour.raster_total) {
        foundTour.raster_total = [];
      }

      if (foundTour.raster_express.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_express.push(raster);
        this.rasterTourExpress[raster.id] = foundTour;
      }
      if (foundTour.raster_total.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_total.push(raster);
        this.rasterTourExpress[raster.id] = foundTour;
      }
    }
  }

  public addRasterToTourRegel(tourId: number, raster: Raster): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      if (!foundTour.raster_regel) {
        foundTour.raster_regel = [];
      }
      if (!foundTour.raster_total) {
        foundTour.raster_total = [];
      }
      if (foundTour.raster_regel.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_regel.push(raster);
        this.rasterTourRegel[raster.id] = foundTour;
      }
      if (foundTour.raster_total.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_total.push(raster);
        this.rasterTourRegel[raster.id] = foundTour;
      }
    }
  }

  public addRasterToTourSamstag(tourId: number, raster: Raster): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      if (!foundTour.raster_samstag) {
        foundTour.raster_samstag = [];
      }
      if (!foundTour.raster_total) {
        foundTour.raster_total = [];
      }
      if (foundTour.raster_samstag.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_samstag.push(raster);
        this.rasterTourSamstag[raster.id] = foundTour;
      }
      if (foundTour.raster_total.findIndex((r: Raster) => r.id === raster.id) === -1) {
        foundTour.raster_total.push(raster);
        this.rasterTourSamstag[raster.id] = foundTour;
      }
    }
  }

  public removeRasterFromLayer(tourId: number, rasterId: number, layer: string): void {
    switch (layer) {
      case 'sattel': {
        this.removeRasterFromTourSattel(tourId, rasterId);
        break;
      }
      case 'lkw': {
        this.removeRasterFromTourLkw(tourId, rasterId);
        break;
      }
      case 'express': {
        this.removeRasterFromTourExpress(tourId, rasterId);
        break;
      }
      case 'regel': {
        this.removeRasterFromTourRegel(tourId, rasterId);
        break;
      }
      case 'samstag': {
        this.removeRasterFromTourSamstag(tourId, rasterId);
        break;
      }
    }
  }

  public removeRasterFromTourSattel(tourId: number, rasterId: number): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      foundTour.raster_sattel = foundTour.raster_sattel.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourSattel[rasterId];
      foundTour.raster_total = foundTour.raster_total.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourSattel[rasterId];
      this.palletService.addGrosspostenSattel(rasterId);
    }
  }

  public removeRasterFromTourLkw(tourId: number, rasterId: number): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      foundTour.raster_lkw = foundTour.raster_lkw.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourLkw[rasterId];
      foundTour.raster_total = foundTour.raster_total.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourLkw[rasterId];
      this.palletService.addGrosspostenLkw(rasterId);
    }
  }

  public removeRasterFromTourExpress(tourId: number, rasterId: number): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      foundTour.raster_express = foundTour.raster_express.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourExpress[rasterId];
      foundTour.raster_total = foundTour.raster_total.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourExpress[rasterId];
    }
  }

  public removeRasterFromTourRegel(tourId: number, rasterId: number): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      foundTour.raster_regel = foundTour.raster_regel.filter((r: Raster) => r.id !== rasterId);
      foundTour.raster_total = foundTour.raster_total.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourRegel[rasterId];
    }
  }

  public removeRasterFromTourSamstag(tourId: number, rasterId: number): void {
    const foundTour = this.getTourById(tourId);

    if (foundTour) {
      foundTour.raster_samstag = foundTour.raster_samstag.filter((r: Raster) => r.id !== rasterId);
      foundTour.raster_total = foundTour.raster_total.filter((r: Raster) => r.id !== rasterId);
      delete this.rasterTourSamstag[rasterId];
    }
  }

  public setSelectedTour(tour: StrategicTour): void {
    this.selectedTour = tour;
  }

  public getSelectedTour(): StrategicTour {
    return this.selectedTour;
  }

  public getPlanung(): StrategicTour[] {
    return this.tours;
  }

}
