import {Injectable} from '@angular/core';
import {ICombinedSimpleModel, TextFilterModel} from 'ag-grid-community';
import {Params} from '@angular/router';

// represents the object type for the grid filter model
export interface UserGridFilters {
  name1?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  name2?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  name3?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  strasse?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  hausnr?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  plz?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  ort?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  land?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  restriktion?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  anzahl_synonyme?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  anzahl_geopos_ziele?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  fahrzeugklasse?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  timeStamp?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
}

//  represents the object type for the URL query parameters
export interface UserGridFiltersParams {
  name1: string;
  name2: string;
  name3: string;
  strasse: string;
  hausnr: string;
  plz: string;
  ort: string;
  land: string;
  restriktion: string;
  anzahl_synonyme: string;
  anzahl_geopos_ziele: string;
  fahrzeugklasse: string
  timeStamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserGridFilterService {
  filters: UserGridFilters;

  constructor() { }

  persistFilters(filters: UserGridFilters) {
    this.filters = filters;
  }

  getFiltersFromQueryParams(params: Params): UserGridFilters {
    if (!params || !Object.keys(params).length) {
      return null;
    }

    return {
      name1: JSON.parse(decodeURIComponent(params.name1 || null)),
      name2: JSON.parse(decodeURIComponent(params.name2 || null)),
      name3: JSON.parse(decodeURIComponent(params.name3 || null)),
      strasse: JSON.parse(decodeURIComponent(params.strasse || null)),
      hausnr: JSON.parse(decodeURIComponent(params.hausnr || null)),
      plz: JSON.parse(decodeURIComponent(params.plz || null)),
      ort: JSON.parse(decodeURIComponent(params.ort || null)),
      land: JSON.parse(decodeURIComponent(params.land || null)),
      restriktion: JSON.parse(decodeURIComponent(params.restriktion || false)),
      anzahl_synonyme: JSON.parse(decodeURIComponent(params.anzahl_synonyme || null)),
      anzahl_geopos_ziele: JSON.parse(decodeURIComponent(params.anzahl_geopos_ziele || null)),
      fahrzeugklasse: JSON.parse(decodeURIComponent(params.fahrzeugklasse || null)),
      timeStamp: JSON.parse(decodeURIComponent(params.timeStamp || null)),
    }
  }

  getQueryParamsFromFilters(): UserGridFiltersParams {
    if (!this.filters || !Object.keys(this.filters).length) {
      return {
        name1: null,
        name2: null,
        name3: null,
        strasse: null,
        hausnr: null,
        plz: null,
        ort: null,
        land: null,
        restriktion: null,
        anzahl_synonyme: null,
        anzahl_geopos_ziele: null,
        fahrzeugklasse: null,
        timeStamp: null
      };
    }

    return  <UserGridFiltersParams> {
      name1: encodeURIComponent(JSON.stringify(this.filters.name1 || null)),
      name2: encodeURIComponent(JSON.stringify(this.filters.name2 || null)),
      name3: encodeURIComponent(JSON.stringify(this.filters.name3 || null)),
      strasse: encodeURIComponent(JSON.stringify(this.filters.strasse || null)),
      hausnr: encodeURIComponent(JSON.stringify(this.filters.hausnr || null)),
      plz: encodeURIComponent(JSON.stringify(this.filters.plz || null)),
      ort: encodeURIComponent(JSON.stringify(this.filters.ort || null)),
      land: encodeURIComponent(JSON.stringify(this.filters.land || null)),
      restriktion: encodeURIComponent(JSON.stringify(this.filters.restriktion || null)),
      anzahl_synonyme: encodeURIComponent(JSON.stringify(this.filters.anzahl_synonyme || null)),
      anzahl_geopos_ziele: encodeURIComponent(JSON.stringify(this.filters.anzahl_geopos_ziele || null)),
      fahrzeugklasse: encodeURIComponent(JSON.stringify(this.filters.fahrzeugklasse || null)),
      timeStamp: encodeURIComponent(JSON.stringify(this.filters.timeStamp || null)),
    }
  }

}
