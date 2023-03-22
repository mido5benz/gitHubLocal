import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Pallet} from '@models/strategic-dispo/pallet.model';
import {environment} from '@environment*';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalletService {

  public dataChanged: Subject<string> = new Subject();
  public currentEmpfaenger: Subject<Pallet> = new Subject();
  public rasterClickedLkw: Subject<number> = new Subject();
  public rasterClickedSattel: Subject<number> = new Subject();

  public grosspostenLkw: Pallet[] = [];
  public grosspostenSattel: Pallet[] = [];
  private grosspostenSattelOriginal: Pallet[] = [];
  private grosspostenLkwOriginal: Pallet[] = [];

  constructor(private http: HttpClient) {
    // this.http.get<Pallet[]>(`${environment.apiHost}/raster/mengen/empfaenger/SATTEL`).subscribe((result: Pallet[]) => {
    //   this.grosspostenSattelOriginal = result;
    // });
    // this.http.get<Pallet[]>(`${environment.apiHost}/raster/mengen/empfaenger/LKW`).subscribe((result: Pallet[]) => {
    //   this.grosspostenLkwOriginal = result;
    // });
  }

  public getGrossposten(layer: string): Observable<Pallet[]> {
    const url = `${environment.apiHost}/raster/mengen/empfaenger/${layer}`;
    return this.http.get<Pallet[]>(url);
  }

  public async getGrosspostenLkw(): Promise<void> {
    const url = `${environment.apiHost}/raster/mengen/empfaenger/LKW`;
    this.grosspostenLkw = await this.http.get<Pallet[]>(url).toPromise();
    this.grosspostenLkwOriginal = await this.http.get<Pallet[]>(url).toPromise();
  }

  public async getGrosspostenSattel(): Promise<void> {
    const url = `${environment.apiHost}/raster/mengen/empfaenger/SATTEL`;
    this.grosspostenSattel = await this.http.get<Pallet[]>(url).toPromise();
    this.grosspostenSattelOriginal = await this.http.get<Pallet[]>(url).toPromise();
  }

  public removeGrosspostenLkw(rasterId: number): void {
    this.grosspostenLkw = this.grosspostenLkw.filter((pallet: Pallet) => pallet.georaster_id !== rasterId);
    this.dataChanged.next('lkw');
  }

  public removeGrosspostenSattel(rasterId: number): void {
    this.grosspostenSattel = this.grosspostenSattel.filter((pallet: Pallet) => pallet.georaster_id !== rasterId);
    this.dataChanged.next('sattel');
  }

  public addGrosspostenSattel(rasterId: number): void {
    const newPallet: any = this.grosspostenSattelOriginal.find((pallet: Pallet) => pallet.georaster_id === rasterId);
    if (this.grosspostenSattel.length !== this.grosspostenSattelOriginal.length){
      this.grosspostenSattel.push(newPallet);
    }
  }

  public addGrosspostenLkw(rasterId: number): void {
    const newPallet: any = this.grosspostenLkwOriginal.find((pallet: Pallet) => pallet.georaster_id === rasterId);
    if (this.grosspostenLkw.length !== this.grosspostenLkwOriginal.length) {
      this.grosspostenLkw.push(newPallet);
    }
  }

}
