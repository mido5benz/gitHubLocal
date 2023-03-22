import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RasterDetails } from '@models/strategic-dispo/raster.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DispoAktivieren, Planung, Planungen, RasterRahmenTour, RasterRahmenTourWork, RasterTourenPlan } from '@models/strategic-dispo/planungen.model';
import { StrategicTour } from '@models/strategic-dispo/strategic-tour.model';
import { RasterService } from '../raster/raster.service';
import { StrategicTourService } from '../strategic-tour/strategic-tour.service';


@Injectable({
  providedIn: 'root'
})
export class PlanungenService {

  private activePlanName: string;
  private activePlanId: number;
  private activePlanBeschreibung: string;
  private activeBearbeitet = false;
  private activeArt: string;
  private samstag = false;

  public planungen: Planungen[];
  public planung: Planung;

  constructor(
    private http: HttpClient,
    private alertService: ToastrService,
    private rasterService: RasterService,
    private tourService: StrategicTourService
  ) { }

  public getPlanungen(): Observable<Planungen[]> {
    const url = `${environment.apiHost}/planungen`;
    return this.http.get<Planungen[]>(url);
  }

  public getPlanung(id: number): Observable<Planung> {
    const url = `${environment.apiHost}/planungen`;
    return this.http.get<Planung>(url + `/${id}`);
  }

  public deletePlanung(id: number): Observable<{}> {
    return this.http.delete(`${environment.apiHost}/planungen/${id}`);
  }

  public getAktiviertePlanungen(): Observable<DispoAktivieren> {
    const url = `${environment.apiHost}/rasterrahmentour/wochentage`;
    return this.http.get<DispoAktivieren>(url);
  }

  public getAktiviertePlanungenZukunft(): Observable<DispoAktivieren> {
    const url = `${environment.apiHost}/rasterrahmentour/wochentage_zukunft`;
    return this.http.get<DispoAktivieren>(url);
  }

  public async nameVergeben(name: string): Promise<boolean> {
    const planungen = await this.getPlanungen().toPromise();
    const found = planungen.findIndex((planung: Planungen) => planung.name === name);
    return found > 0;
  }

  public async putPlanungUpdate(id: number, name: string, beschreibung: string, planung: StrategicTour[]): Promise<any> {
    this.resetBearbeitung();
    const rasterPlan = new RasterTourenPlan(beschreibung, name, id, this.samstag);
    const rasterTour: RasterRahmenTour[] = [];
    const rasterTourWorkSattel: RasterRahmenTourWork[] = [];
    const rasterTourWorkLkw: RasterRahmenTourWork[] = [];
    const rasterTourWorkExpress: RasterRahmenTourWork[] = [];
    const rasterTourWorkRegel: RasterRahmenTourWork[] = [];
    const rasterTourWorkSamstag: RasterRahmenTourWork[] = [];

    for (const tour of planung) {
      if (tour.raster_sattel) {
        for (const raster of tour.raster_sattel) {
          rasterTourWorkSattel.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 1));
        }
      }
      if (tour.raster_lkw) {
        for (const raster of tour.raster_lkw) {
          rasterTourWorkLkw.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 2));
        }
      }
      if (tour.raster_express) {
        for (const raster of tour.raster_express) {
          rasterTourWorkExpress.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 3));
        }
      }
      if (tour.raster_regel) {
        for (const raster of tour.raster_regel) {
          rasterTourWorkRegel.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 4));
        }
      }
      if (tour.raster_samstag) {
        for (const raster of tour.raster_samstag) {
          rasterTourWorkRegel.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 5));
        }
      }
    }

    rasterTour.push(new RasterRahmenTour(1, 'SATTEL', rasterTourWorkSattel));
    rasterTour.push(new RasterRahmenTour(2, 'LKW', rasterTourWorkLkw));
    rasterTour.push(new RasterRahmenTour(3, 'EXPRESS', rasterTourWorkExpress));
    rasterTour.push(new RasterRahmenTour(4, 'REGEL', rasterTourWorkRegel));
    rasterTour.push(new RasterRahmenTour(5, 'SAMSTAG', rasterTourWorkSamstag));


    const neuePlanung = new Planung(rasterPlan, rasterTour);
    const url = `${environment.apiHost}/planungen`;


    this.alertService.success(
      'Planung bearbeitet'
    );

    return this.http.put(url, neuePlanung).subscribe((result) => { });
  }

  public async putPlanungNeu(name: string, beschreibung: string, planung: StrategicTour[]): Promise<any> {
    const istVergeben = await this.nameVergeben(name);
    if (istVergeben === false) {

      this.resetBearbeitung();
      this.setActiveArt('Update');
      this.setActivePlanName(name);
      this.setActivePlanBeschreibung(beschreibung);

      const rasterPlan = new RasterTourenPlan(beschreibung, name, 0, this.samstag);
      const rasterTour: RasterRahmenTour[] = [];
      const rasterTourWorkSattel: RasterRahmenTourWork[] = [];
      const rasterTourWorkLkw: RasterRahmenTourWork[] = [];
      const rasterTourWorkExpress: RasterRahmenTourWork[] = [];
      const rasterTourWorkRegel: RasterRahmenTourWork[] = [];
      const rasterTourWorkSamstag: RasterRahmenTourWork[] = [];

      for (const tour of planung) {
        if (tour.raster_sattel) {
          for (const raster of tour.raster_sattel) {
            rasterTourWorkSattel.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 1));
          }
        }
        if (tour.raster_lkw) {
          for (const raster of tour.raster_lkw) {
            rasterTourWorkLkw.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 2));
          }
        }
        if (tour.raster_express) {
          for (const raster of tour.raster_express) {
            rasterTourWorkExpress.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 3));
          }
        }
        if (tour.raster_regel) {
          for (const raster of tour.raster_regel) {
            rasterTourWorkRegel.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 4));
          }
        }
        if (tour.raster_samstag) {
          for (const raster of tour.raster_samstag) {
            rasterTourWorkSamstag.push(new RasterRahmenTourWork(0, 0, raster.id, tour.tour_id, 5));
          }
        }
      }

      rasterTour.push(new RasterRahmenTour(1, 'SATTEL', rasterTourWorkSattel));
      rasterTour.push(new RasterRahmenTour(2, 'LKW', rasterTourWorkLkw));
      rasterTour.push(new RasterRahmenTour(3, 'EXPRESS', rasterTourWorkExpress));
      rasterTour.push(new RasterRahmenTour(4, 'REGEL', rasterTourWorkRegel));
      rasterTour.push(new RasterRahmenTour(5, 'SAMSTAG', rasterTourWorkSamstag));


      const neuePlanung = new Planung(rasterPlan, rasterTour);
      const url = `${environment.apiHost}/planungen`;


      this.alertService.success(
        'Planung gespeichert: ' + name + ' / ' + beschreibung
      );

      return this.http.put(url, neuePlanung).subscribe((result: any) => {
        this.setActivePlan(name, result.value, beschreibung);
      });
    } else {
      this.alertService.error(
        'Name: ' + name + ' schon vergeben!'
      );
    }
  }

  public postDispoAktivieren(aktiviertePlanungen: DispoAktivieren): Observable<any> {
    const url = `${environment.apiHost}/rasterrahmentour`;
    return this.http.post(url, aktiviertePlanungen);
  }

  public getActivePlanName(): string {
    return this.activePlanName;
  }

  public getActivePlanBeschreibung(): string {
    return this.activePlanBeschreibung;
  }

  public getActivePlanId(): number {
    return this.activePlanId;
  }

  public getActiveArt(): string {
    return this.activeArt;
  }

  public getSamstag(): boolean {
    return this.samstag;
  }

  public setSamstag(value: boolean): void {
    this.samstag = value;
  }

  public getBearbeitung(): boolean {
    return this.activeBearbeitet;
  }

  public setBearbeitung(): void {
    this.activeBearbeitet = true;
  }

  public resetBearbeitung(): void {
    this.activeBearbeitet = false;
  }

  public setActiveArt(art: string): void {
    this.activeArt = art;
  }

  public setActivePlanId(id: number): void {
    this.activePlanId = id;
  }

  public setActivePlanName(name: string): void {
    this.activePlanName = name;
  }

  public setActivePlanBeschreibung(beschreibung: string): void {
    this.activePlanBeschreibung = beschreibung;
  }

  public setActivePlan(name: string, id: number, beschreibung: string): void {
    this.activePlanName = name;
    this.activePlanId = id;
    this.activePlanBeschreibung = beschreibung;
  }

  public setLayerPlanung(layerPlanung: RasterRahmenTour[]): void {
    const [sattel, lkw, express, regel, samstag] = layerPlanung;
    this.rasterService.getRastersSattel().subscribe((rasterDetails: RasterDetails[]) => {
      sattel.raster_rahmentour_work.forEach((rasterRahmenTourWork) => {
        const rasterDetail = rasterDetails.find((x) => x.georaster_id === rasterRahmenTourWork.georaster_id);
        if (rasterDetail) {
          const raster = this.rasterService.getRasterByCoordinate(
            new L.LatLng(rasterDetail.geo_x_bottom_left, rasterDetail.geo_y_bottom_left),
            'sattel'
          );
          this.tourService.addRasterToTourSattel(rasterRahmenTourWork.tour_id, raster);
        }
      });
    });
    this.rasterService.getRastersLkw().subscribe((rasterDetails: RasterDetails[]) => {
      lkw.raster_rahmentour_work.forEach((rasterRahmenTourWork) => {
        const rasterDetail = rasterDetails.find((x) => x.georaster_id === rasterRahmenTourWork.georaster_id);
        if (rasterDetail) {
          const raster = this.rasterService.getRasterByCoordinate(
            new L.LatLng(rasterDetail.geo_x_bottom_left, rasterDetail.geo_y_bottom_left),
            'lkw'
          );
          this.tourService.addRasterToTourLkw(rasterRahmenTourWork.tour_id, raster);
        }
      });
    });
    this.rasterService.getRastersExpress().subscribe((rasterDetails: RasterDetails[]) => {
      express.raster_rahmentour_work.forEach((rasterRahmenTourWork) => {
        const rasterDetail = rasterDetails.find((x) => x.georaster_id === rasterRahmenTourWork.georaster_id);
        if (rasterDetail) {
          const raster = this.rasterService.getRasterByCoordinate(
            new L.LatLng(rasterDetail.geo_x_bottom_left, rasterDetail.geo_y_bottom_left),
            'express'
          );
          this.tourService.addRasterToTourExpress(rasterRahmenTourWork.tour_id, raster);
        }
      });
    });
    this.rasterService.getRastersRegel().subscribe((rasterDetails: RasterDetails[]) => {
      regel.raster_rahmentour_work.forEach((rasterRahmenTourWork) => {
        const rasterDetail = rasterDetails.find((x) => x.georaster_id === rasterRahmenTourWork.georaster_id);
        if (rasterDetail) {
          const raster = this.rasterService.getRasterByCoordinate(
            new L.LatLng(rasterDetail.geo_x_bottom_left, rasterDetail.geo_y_bottom_left),
            'regel'
          );
          this.tourService.addRasterToTourRegel(rasterRahmenTourWork.tour_id, raster);
        }
      });
    });
    this.rasterService.getRastersSamstag().subscribe((rasterDetails: RasterDetails[]) => {
      samstag.raster_rahmentour_work.forEach((rasterRahmenTourWork) => {
        const rasterDetail = rasterDetails.find((x) => x.georaster_id === rasterRahmenTourWork.georaster_id);
        if (rasterDetail) {
          const raster = this.rasterService.getRasterByCoordinate(
            new L.LatLng(rasterDetail.geo_x_bottom_left, rasterDetail.geo_y_bottom_left),
            'samstag'
          );
          this.tourService.addRasterToTourSamstag(rasterRahmenTourWork.tour_id, raster);
        }
      });
    });
  }
}
