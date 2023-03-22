import {Injectable} from '@angular/core';
import {DispoStopp, Location} from '@models/index';
import * as L from 'leaflet';
import {StoppType, TourType} from '@shared/enums/tour_stopp.enums';
import {PointMarker} from '@models/map/marker.model';
import {
  assignedMarkerColor,
  iconAnchorX,
  iconAnchorY,
  iconHeight,
  iconWidth,
  selectedMarkerColor,
  unAssignedMarkerColor
} from '@app/core/services/marker/marke.constants';
import {createMarkerIcon} from '@shared/utils/marker.utils';
import {Zeitfenster} from "@models/recipient/recipient.models";

@Injectable({
  providedIn: 'root',
})
export class MarkerService {

  constructor() {
  }

  public getDisplayValue(value): string {
    return value ? value : 'nicht gesetzt';
  }

  public getTourTypeIconClass(rasterEbeneId: number): string {
    switch (rasterEbeneId) {
      // SATTEL
      case TourType.SATTEL:
        return 'fas fa-pallet';
      // LKW
      case TourType.LKW:
        return 'fa fa-truck';
      // EXPRESS
      case TourType.EXPRESS:
        return 'fas fa-shipping-fast';
      // NORMAL
      case TourType.NORMAL:
        return 'fa fa-cubes';
      // SAMSTAG
      case TourType.SAMSTAG:
        return 'fab fa-stripe-s';
      // UNKNOWN
      default:
        return 'fas fa-question';
    }
  }

  public getDisplayIcon(stopp: any): string {
    const ebeneId: TourType = stopp.raster_ebene_id;
    return this.getIconForRasterEbene(ebeneId);
  }

  // public createIcon(className: string, stoppNr: number): L.DivIcon {
  //   return L.divIcon({
  //     className,
  //     html: stoppNr ? stoppNr.toString() : '',
  //   });
  // }

  public createMarker(lng: number, lat: number, properties: any): PointMarker {
    return {
      type: 'Point',
      coordinates: [lng, lat],
      properties,
    };
  }

  public createSitesMarkerArray(collection: Location[]): PointMarker[] {
    const standortPositions = [];

    collection.forEach((site: Location) => {
      const marker = this.createMarker(site.lon, site.lat, {
        site,
      });
      standortPositions.push(marker);
    });

    return standortPositions;
  }

  public getIconForRasterEbene(rasterEbeneId: number): string {
    switch (rasterEbeneId) {
      // SATTEL
      case TourType.SATTEL:
        return '<i class="fas fa-pallet"></i>';
      // LKW
      case TourType.LKW:
        return '<i class="fa fa-truck"></i>';
      // EXPRESS
      case TourType.EXPRESS:
        return '<i class="fas fa-shipping-fast"></i>';
      // NORMAL
      case TourType.NORMAL:
        return '<i class="fa fa-cubes"></i>';
      // SAMSTAG
      case TourType.SAMSTAG:
        return '<i class="fab fa-stripe-s"></i>';
      // UNKNOWN
      default:
        return '<i class="fas fa-question"></i>';
    }
  }

  createUnassignedMarkers(stopp: DispoStopp, latlng: L.LatLng): L.Marker {
    const displayIcon = this.getDisplayIcon(stopp);
    const bgColor = stopp.selected ? selectedMarkerColor : unAssignedMarkerColor;
    const icn = L.divIcon({
      className: 'custom-div-icon',
      html: createMarkerIcon(bgColor, displayIcon),
      iconSize: [iconWidth, iconHeight],
      iconAnchor: [iconAnchorX, iconAnchorY]
    });
    const markerOptions = {
      icon: icn,
      stopp,
      stoppType: StoppType.UNASSIGNED,
    };
    const marker = new L.Marker(latlng, markerOptions);
    marker.bindTooltip(this.getTooltipContent(stopp));
    return marker;
  }

  createSelectedTourMarker(stopp: any, latlng: L.LatLng): L.Marker {
    let icon = '<div class="\stopp-icon\">' + stopp.soll_stopp + '</div>';
    if (!stopp.soll_stopp) {
      icon = this.getIconForRasterEbene(-1);
    }

    const icn = L.divIcon({
      className: 'custom-div-icon',
      html: '<div style=\'background-color:#2882C8;\' class=\'marker-pin\'></div><i class=\'material-icons\'>' +
        icon +
        '</i>',
      iconSize: [iconWidth, iconHeight],
      iconAnchor: [iconAnchorX, iconAnchorY]
    });

    const markerOptions = {
      icon: icn,
      stopp,
      stoppType: StoppType.CURRENT_TOUR,
    };
    const marker = new L.Marker(latlng, markerOptions);
    marker.bindTooltip(this.getTooltipContent(stopp));
    return marker;
  }

  createAssignedMarkers(stopp: DispoStopp, latlng: L.LatLng): L.Marker {
    const displayIcon = this.getDisplayIcon(stopp);
    const bgColor = stopp.selected ? selectedMarkerColor : assignedMarkerColor;
    const icn = L.divIcon({
      className: 'custom-div-icon',
      html: createMarkerIcon(bgColor, displayIcon),
      iconSize: [iconWidth, iconHeight],
      iconAnchor: [iconAnchorX, iconAnchorY]
    });

    const markerOptions = {
      icon: icn,
      stopp,
      stoppType: StoppType.ASSIGNED
    };
    const marker = new L.Marker(latlng, markerOptions);
    marker.bindTooltip(this.getTooltipContent(stopp));
    return marker;
  }

  private getTooltipContent(stopp: DispoStopp): string {
    const sum = stopp.sum;
    const nr = stopp.tournr ? stopp.tournr.slice(0, 1) + '-' + stopp.tournr.slice(1) : '';

    const ziel_name = stopp.ziel_name;

    let anlieferzeitMontag = [];
    let anlieferzeitDienstag = [];
    let anlieferzeitMittwoch = [];
    let anlieferzeitDonnerstag = [];
    let anlieferzeitFreitag = [];
    let anlieferzeitSamstag = [];
    let wochentag;
    let stringVon;
    let stringBis;

    ziel_name.zeitfenster.map((anlieferzeiten: Zeitfenster) => {
      wochentag = this.convertWochentag(anlieferzeiten.wochentag);
      stringVon = anlieferzeiten.von;
      stringBis = anlieferzeiten.bis;

      // Uhrzeit und Datum werden voneinander getrennt
      const [dateComponentsVon, timeComponentsVon] = stringVon.split(' ');
      const [dateComponentsBis, timeComponentsBis] = stringBis.split(' ');

      // Stunden und Minuten werden gesplittet und auf Variablen zugewießen
      const [hoursVon, minutesVon, secondsVon] = timeComponentsVon.split(':');
      const [hoursBis, minutesBis, secondsBis] = timeComponentsBis.split(':');

      let resultVon = hoursVon + ':' + minutesVon;
      let resultBis = hoursBis + ':' + minutesBis;

      let result = wochentag + ' ' + resultVon + ' - ' + resultBis;

      switch (wochentag) {
        case 'MO':
          return anlieferzeitMontag.push(result);
        case 'DI':
          return anlieferzeitDienstag.push(result);
        case 'MI':
          return anlieferzeitMittwoch.push(result);
        case 'DO':
          return anlieferzeitDonnerstag.push(result);
        case 'FR':
          return anlieferzeitFreitag.push(result);
        case 'SA':
          return anlieferzeitSamstag.push(result);
      }
    });

    return `
      Stoppnr.: ${this.getDisplayValue(stopp.soll_stopp)}<br />
       <span *ngIf="stopp.tournr">Tour: ${nr}</span> <span>${this.getFahrzeugTyp(ziel_name)}</span> <br />
      <ul class="fa-ul mb-0">
        <li *ngIf="stopp?.ziel_name">
           <i class="fa-li fas fa-people-carry fa-lg"></i><span>Empfänger: ${stopp?.ziel_name?.name1}</span>
        </li>
        <li>
            <i class="fa-li fa fa-balance-scale fa-lg"></i><span> Gewicht: ${sum ? sum?.soll_gewicht_sum : '0'} kg</span>
        </li>
        <li>
          <i class="fa-li fa fa-archive fa-lg"></i> Colli: ${sum ? sum?.soll_col_sum : 'Keine'} Paletten: ${sum ? sum?.soll_pal_sum : 'Keine'}
        </li>
         <li>
           <i class="fa-li far fa-clock fa-lg"></i>
                                                    ${anlieferzeitMontag.length > 0 ? anlieferzeitMontag + '<br/>' : ''}
                                                    ${anlieferzeitDienstag.length > 0 ? anlieferzeitDienstag + '<br/>' : ''}
                                                    ${anlieferzeitMittwoch.length > 0 ? anlieferzeitMittwoch + '<br/>' : ''}
                                                    ${anlieferzeitDonnerstag.length > 0 ? anlieferzeitDonnerstag + '<br/>' : ''}
                                                    ${anlieferzeitFreitag.length > 0 ? anlieferzeitFreitag + '<br/>' : ''}
                                                    ${anlieferzeitSamstag.length > 0 ? anlieferzeitSamstag + '<br/>' : ''}
         <br/>
         </li>
      </ul>`;
  }

  public getFahrzeugTyp(data) {
    let fahrzeugTyp: string;
    if (data.fahrzeugklasse_id === 1) {
      fahrzeugTyp = 'BUS';
    } else if (data.fahrzeugklasse_id === 2) {
      fahrzeugTyp = 'LKW';
    } else if (data.fahrzeugklasse_id === 3) {
      fahrzeugTyp = 'SATTEL';
    } else {
      fahrzeugTyp = '';
    }

    return fahrzeugTyp;
  }

  convertWochentag(wochentag) {
    switch (wochentag) {
      case 1:
        return 'MO';
      case 2:
        return 'DI';
      case 3:
        return 'MI';
      case 4:
        return 'DO';
      case 5:
        return 'FR';
      case 6:
        return 'SA';
      default:
        return '';
    }

  }

}
