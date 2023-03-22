import {Raster} from './raster.model';

export class StrategicTour {
  constructor(
    public tour_id: number = null,
    public tournr: string = null,
    public fahrzeugart_id: number = null,
    public niederlassung_id: number = null,
    public min_ladeflaeche: number = null,
    public min_ladeflaeche_laenge: number = null,
    public min_ladeflaeche_breite: number = null,
    public min_ladeflaechehoehe: number = null,
    public min_ladevolumen: number = null,
    public min_nutzlast: number = null,
    public laenge: number = null,
    public max_colli: number = null,
    public max_paletten: number = null,
    public nutzlast: number = null,
    public puffertour: boolean = false,
    public raster_total: Raster[] = [],
    public raster_sattel: Raster[] = [],
    public raster_lkw: Raster[] = [],
    public raster_express: Raster[] = [],
    public raster_regel: Raster[] = [],
    public raster_samstag: Raster[] = [],
    public name_1: string = null,
    public name_2: string = null,
    public name_3: string = null
  ) { }
}

export interface Table {
  tourNr?: string;
  frachtfuehrer?: string;
  fahrzeugArt?: string;
  plus8?: number;
  plus9?: number;
  plus10?: number;
  plus12?: number;
  abend?: number;
  ambient?: number;
  thermomed?: number;
  klasse7?: number;
  stopps?: number;
  sendungen?: number;
  colli?: number;
  paletten?: number;
  gewicht?: number;
}
