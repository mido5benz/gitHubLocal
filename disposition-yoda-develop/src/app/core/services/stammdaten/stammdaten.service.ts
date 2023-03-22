import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Dienste, Fahrzeugtypen, GeoaddressDto, Stammdaten, Ziel} from '@models/index';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, share, tap} from 'rxjs/internal/operators';
import {environment} from '@environment*';
import {SendungAvisTyp} from '@modules/stammdaten/views';

@Injectable({
  providedIn: 'root',
})
export class StammdatenService {
  private stammdaten: Stammdaten;
  private stammdatenObservable: Observable<Stammdaten>;

  private dienste: Dienste[];
  private fahrzeugtypen: Fahrzeugtypen[];

  private storedPageNumber: number = 0;

  public wochentag = new BehaviorSubject(null);
  wochentag$ = this.wochentag.asObservable();

  public refreshZiele = new BehaviorSubject(false);
  refreshZieleObserv = this.refreshZiele.asObservable();


  constructor(private http: HttpClient) {
  }

  isZieleUpdated(aktualisieren) {
    this.refreshZiele.next(aktualisieren);
  }

  public fetchStammdaten(): Observable<Stammdaten> {
    return this.http.get<Stammdaten>(`${environment.apiHost}/stammdaten`);
  }

  public getStammdaten(): Observable<Stammdaten> {
    if (this.stammdaten) {
      return of(this.stammdaten);
    } else if (this.stammdatenObservable) {
      return this.stammdatenObservable;
    } else {
      const url = `${environment.apiHost}/stammdaten`;
      return (this.stammdatenObservable = this.http.get<Stammdaten>(url).pipe(
        tap((stammdaten: Stammdaten) => {
          this.stammdaten = stammdaten;
          this.stammdatenObservable = null;
          return stammdaten;
        }),
        share()
      ));
    }
  }

  public getDienste(): Observable<Dienste[]> {
    if (this.dienste) {
      return of(this.dienste);
    } else {
      return this.getStammdaten().pipe(
        map((stammdaten: Stammdaten) => (this.dienste = stammdaten.dienste))
      );
    }
  }

  public getDienstNames(): Observable<string[]> {
    if (this.dienste) {

      //TODO: Es gibt keine Unterscheidung mehr zwischen Radioaktiv schwach und stark. Daher nur ein Service unter dem Namen 'Radioaktiv' anzeigen

      // Radioaktiv stark herausfiltern
      let filteredDienste = this.dienste.filter((dienst) => dienst.diensttyp_id !== 247);

      // Radioaktiv schwach unbenennen auf Radioaktiv
      filteredDienste.map((dienst) => {
        if(dienst.diensttyp_id === 246) {
          dienst.bezeichnung = 'Radioaktiv';
        }
      });

      return of(filteredDienste.map((dienst) => dienst.bezeichnung));
    } else {
      return this.getStammdaten().pipe(
        map((stammdaten: Stammdaten) => (this.dienste = stammdaten.dienste).map(
          (dienst) => dienst.bezeichnung
        ))
      );
    }
  }

  public getFahrzeugtypen(): Observable<Fahrzeugtypen[]> {
    if (this.fahrzeugtypen) {
      return of(this.fahrzeugtypen);
    } else {
      return this.getStammdaten().pipe(
        map((stammdaten: Stammdaten) => (this.fahrzeugtypen = stammdaten.fahrzeugtypen))
      );
    }
  }

  public fetchZiele(): Observable<Ziel[]> {
    return this.http.get<Ziel[]>(`${environment.apiHost}/ziele`);
  }

  public fetchGeoaddressSuggestions(requestDetails: any): Observable<GeoaddressDto[]> {
    const requestBody = {
      geoadresse_id: null,
      sendung_id: requestDetails.address.sendung_id,
      land: 'D',
      plz: requestDetails.address.plz ? requestDetails.address.plz : '',
      ort: requestDetails.address.ort ? requestDetails.address.ort : '',
      strasse: requestDetails.address.strasse ? requestDetails.address.strasse : '',
      hausnr: requestDetails.address.hausnr ? requestDetails.address.hausnr : ''
    };

    return this.http.post<GeoaddressDto[]>(`${environment.apiHost}/geoadresse/STRASSE`, requestBody);
  }

  public getSendungAvisTypen() {
    return this.http.get<SendungAvisTyp>(`${environment.apiHost}/stammdaten/sendungavistypen`);
  }

  public storePaginationPageNumber(page: number): void {
    this.storedPageNumber = page;
  }

  public getStoredPaginationPageNumber(): number {
    return this.storedPageNumber;
  }

  public getZieleDetail(geoposition_id): Observable<any> {
     return this.http.get<any>(`${environment.apiHost}/ziele/geopositionen/${geoposition_id}`);
  }

}
