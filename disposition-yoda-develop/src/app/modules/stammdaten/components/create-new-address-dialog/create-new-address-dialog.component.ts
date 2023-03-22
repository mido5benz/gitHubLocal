import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment*';
import {Address} from '@models/address/address.model';
import {map} from 'rxjs/internal/operators';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import * as L from 'leaflet';
import {LeafletEvent} from 'leaflet';
import {Location, MapConfig} from '@shared/models';
import {locations} from '@shared/data/liste-standorte.data';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {ToastrService} from 'ngx-toastr';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {Store} from '@ngrx/store';
import {saveUnassignedAddressRequest, saveUnassignedAddressSuccess} from '@store/stammdaten/actions/unassigned-adresses.actions';
import {xServerHost} from '@app/app.component';
import {AddressService} from '@app/core/services/address/address.service';

@Component({
  selector: 'app-create-new-address-dialog',
  templateUrl: './create-new-address-dialog.component.html',
  styleUrls: ['./create-new-address-dialog.component.scss']
})
export class CreateNewAddressDialogComponent implements OnInit {

  public loading: boolean;
  public success: boolean;
  public loadingAddresses: boolean;
  public notFound: boolean;
  public error: boolean;
  public addresses: Address[] = [];
  public showWarning = false;

  private map: L.Map;
  public latlng: L.LatLng;
  public currentMarker: L.Marker;

  public mapConfig: MapConfig = {
    xServerConfig: {
      xServerUrl: `${xServerHost}/services/rest/XMap/tile/{z}/{x}/{y}?storedProfile={profile}`,
      profile: 'silkysand',
      maxZoom: 18,
      minZoom: 5,
      pane: 'tilePane',
    },
    zoom: 13
  };

  constructor(
    private toastrService: ToastrService,
    private addressFacade: AddressFacade,
    private dialogRef: DialogRef,
    private httpClient: HttpClient,
    public dialogConfig: DialogConfig,
    private store: Store,
    private addressService: AddressService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.initMap();
  }

  runPTVSearch(): void {
    const givenAddress = this.dialogConfig.data.address;
    const sendungId = this.dialogConfig.data.sendung_id;

    const address: Address = {
      geoadresse_fehler_id: 0,
      sendung_id: sendungId,
      dispostopp_id: null,
      geoadresse_id: null,
      ziel_name_id: null,
      name1: givenAddress.name1,
      name2: givenAddress.name2,
      name3: givenAddress.name3,
      landCode: givenAddress.landCode,
      plz: givenAddress.plz,
      ort: givenAddress.ort,
      strasse: givenAddress.strasse,
      hausnr: givenAddress.hausnr,
    };

    this.httpClient.post<any>(`${environment.apiHost}/fehler/adressen`, address).pipe(
      map((result: any) => {
        this.loading = false;
        this.success = true;
      }),
      catchError((error: any) => {
        this.loading = false;
        // this.error = true;
        this.notFound = true;
        return of(null);
      })
    ).subscribe();
  }

  search($event): void {
    this.loadingAddresses = true;

    const requestBody: AddressSuggestion = {
      punkt: {
        x: this.latlng.lat,
        y: this.latlng.lng
      },
      radius: 500
    };

    this.httpClient.post(`${environment.apiHost}/geoadresse/geopositionen`, requestBody).subscribe((result: any) => {
      if (result) {
        this.addresses = result;

        this.addresses = result.filter((adressen) => adressen.strasse !== null && adressen.hausnr !== null);

        this.addresses.sort((a, b) => {
          if (a.strasse === b.strasse) {
            return a?.hausnr.localeCompare(b?.hausnr, undefined, {numeric: true, sensitivity: 'base'});
          }
          return a?.strasse.localeCompare(b?.strasse);
        });

      } else {
        this.addresses = [];
      }
      this.loadingAddresses = false;
    });

    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    const markerIcon = L.icon({
      iconUrl: 'assets/img/marker-icon.png',
      iconSize: [25, 41]
    });

    const latLng: L.LatLng = new L.LatLng($event.lat, $event.lng);
    // @ts-ignore
    this.currentMarker = L.marker(latLng, {icon: markerIcon}).addTo(this.map);
    this.map.flyTo(latLng);

    this.latlng = latLng;
  }

  initMap(): void {
    this.mapConfig.standort = locations.find(
      (s: Location) => s.relnr.toString() === localStorage.getItem('userDepot')
    );

    this.map = L.map('map');

    this.map.setView(
      [this.mapConfig.standort.lat, this.mapConfig.standort.lon],
      this.mapConfig.zoom
    );

    // @ts-ignore
    this.map.on('click', (event: LeafletEvent) => {
        if (this.currentMarker) {
          this.map.removeLayer(this.currentMarker);
        }

        const markerIcon = L.icon({
          iconUrl: 'assets/img/marker-icon.png',
          iconSize: [25, 41]
        });

        // @ts-ignore
        this.currentMarker = L.marker(event.latlng, {icon: markerIcon}).addTo(this.map);
        // @ts-ignore
        this.latlng = event.latlng;
        this.loadingAddresses = true;

        const requestBody: AddressSuggestion = {
          punkt: {
            // @ts-ignore
            x: event.latlng.lat,
            // @ts-ignore
            y: event.latlng.lng
          },
          radius: 500
        };

        this.httpClient.post(`${environment.apiHost}/geoadresse/geopositionen`, requestBody).subscribe((result: any) => {
          if (result) {
            // Kann die Strasse von PTV als null zurückkommen?
            this.addresses = result.filter((adressen) => adressen.strasse !== null && adressen.hausnr !== null);
            /*
              Sortierung nach Straße + Hausnummer
              numeric: Zahlen im String werden erkannt
              sensitivity: Groß- und Kleinschreibung wird ignoriert
             */
            this.addresses.sort((a, b) => {
              if (a.strasse === b.strasse) {
                return a.hausnr.localeCompare(b.hausnr, undefined, {numeric: true, sensitivity: 'base'});
              }
              return a.strasse.localeCompare(b.strasse);
            });

          } else {
            this.addresses = [];
          }
          this.loadingAddresses = false;
        });
      }
    )
    ;

    // prettier-ignore
    // PTV background layer
    // @ts-ignore
    L.tileLayer.xserver(this.mapConfig.xServerConfig.xServerUrl, {
      profile: this.mapConfig.xServerConfig.profile,
      maxZoom: this.mapConfig.xServerConfig.maxZoom,
      minZoom: this.mapConfig.xServerConfig.minZoom,
      pane: this.mapConfig.xServerConfig.pane,
    }).addTo(this.map);
  }

  closeCancel(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL
    });
  }

  closeOk(): void {
    this.dialogRef.close({
      data: {clearValues: true},
      result: DialogCloseResultType.CLOSEOK
    });
  }

  closeOkNewAddressSaved(): void {
    this.dialogRef.close({
      data: {clearValues: true},
      result: DialogCloseResultType.CLOSEOK
    });
  }

  latLngChanged(event): void {
    this.latlng = event;
  }

  createNew(): void {
    if (this.latlng) {
      const givenAddress = this.dialogConfig.data.address;
      const geoadresse_fehler_id = this.dialogConfig.data.geoadresse_fehler_id;

      const requestBody = {
        sendung_id: this.dialogConfig.data.sendung_id,
        dispostopp_id: null,
        geoadresse_id: null,
        ziel_name_id: null,
        geoadresse_fehler_id: geoadresse_fehler_id,
        name1: givenAddress.name1,
        name2: givenAddress.name2,
        name3: givenAddress.name3,
        landCode: givenAddress.landCode,
        plz: givenAddress.plz,
        ort: givenAddress.ort,
        strasse: givenAddress.strasse,
        hausnr: givenAddress.hausnr,
        geo_x: this.latlng.lat,
        geo_y: this.latlng.lng
      };

      this.store.dispatch(saveUnassignedAddressRequest({address: requestBody}));
      this.closeOkNewAddressSaved();
      this.addressService.clearSynonymErgebnisse(true);
    } else {
      this.showWarning = true;
    }
  }
}

export interface AddressSuggestion {
  punkt: {
    x: number;
    y: number;
  };
  radius: 500;
}


export interface Zeitfenster {
  wochentag: number;
  von: string;
  bis: string;
  bemerkung: string;
  status: string;
}

export interface CreateAddressRequestDTO {
  ziel_name_id: number;
  geoposition_id: number;
  name: string;
  name1: string;
  name2: string;
  name3: string;
  name123: string;
  fahrzeugklasse_id: number;
  eigenschaften: string[];
  zeitfenster: Zeitfenster[];
}
