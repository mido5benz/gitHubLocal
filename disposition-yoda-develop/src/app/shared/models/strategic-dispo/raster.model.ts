export class Raster {
  constructor(
    public id: number = null,
    public latStart: number = null,
    public lngStart: number = null,
    public details: any = {}
  ) {}
}

export class RasterDetails {
  constructor(
    public georaster_menge_id: number = null,
    public georaster_id: number = null,
    public kerngebietnr: number = null,
    public wochentag_id_fk: number = null,
    public gesamtmenge: number = null, // consignments
    public teilmenge_normal: number = null,
    public teilmenge_plus8: number = null,
    public teilmenge_plus9: number = null,
    public teilmenge_plus10: number = null,
    public teilmenge_plus12: number = null,
    public teilmenge_abend: number = null,
    public teilmenge_ambient: number = null,
    public teilmenge_blau: number = null, // kühlgut
    public teilmenge_gefahrgut: number = null,
    public gesamtgewicht: number = null,
    public anzahl_stopps: number = null,
    public geo_x_bottom_left: number = null,
    public geo_y_bottom_left: number = null,
    public anzahl_col: number = null,
    public anzahl_pal: number = null,
    public anzahl_col_ambient: number = null,
    public anzahl_pal_ambient: number = null,
    public anzahl_col_blau: number = null,
    public anzahl_pal_blau: number = null,
  ) {}
}

export class RecipientDetails {
  constructor(
    public georaster_id: number = null,
    public geo_x: number = null,
    public geo_y: number = null,
    public empfaenger: EmpfaengerNamen[] = [],

  ) {}
}

export class EmpfaengerNamen {
  constructor(
    public name1: string = null,
    public name2: string = null,
    public name3: string = null,
  ) {}
}
