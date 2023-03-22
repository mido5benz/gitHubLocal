import {Zeitfenster} from "@models/recipient/recipient.models";

export interface Tour {
  tour: ManualDispoTour;
  istTourShuttlefaehig?: boolean;
  shuttle_tour_id?: number;
  shuttle_tour_nummer?: number;
  dispostopps: DispoStopp[];
  dispostoppssum: DispoSum[];
  nachladegrenze: number;
  planDistanz?: number;
  planFahrtdauer?: number;
  planAuslieferdauer?: number;
  planTourdauer?: number;
  sendungSum: number;
  colSum: number;
  palSum: number;
  gewichtSum: number;
  p8Sum: number;
  p9Sum: number;
  p10Sum: number;
  p12Sum: number;
  abendSum: number;
  tmSum: number;
  kl7Sum: number;
  ggPunkteSum: number;
  amb_sum: number;
  kennzeichenpflichtig?: boolean;
  abgefertigt: boolean;
  potentiell_gleiche_ziele?: boolean,
  ziele_bearbeitet?: boolean,

  istColSum: number,
  sollColSum: number,
  istPalSum: number,
  sollPalSum: number,
  istGewichtSum: number,
  sollGewichtSum: number
}

export interface TourSum {
  sendungSum: number;
  colSum: number;
  palSum: number;
  gewichtSum: number;
  p8Sum: number;
  p9Sum: number;
  p10Sum: number;
  p12Sum: number;
  abendSum: number;
  tmSum: number;
  kl7Sum: number;
  ggPunkteSum: number;
  amb_sum: number;

  istColSum: number;
  sollColSum: number;
  istPalSum: number;
  sollPalSum: number;
  istGewichtSum: number;
  sollGewichtSum: number;
}

export interface DispoSum {
  dispostopp_id: number;
  soll_stopp: number;
  sendung_sum: number;
  col_sum: number;
  pal_sum: number;
  gewicht_sum: number;
  p8_sum: number;
  p9_sum: number;
  p10_sum: number;
  p12_sum: number;
  abend_sum: number;
  tm_sum: number;
  kl7_sum: number;
  ggPunkteSum: number;
  amb_sum: number;

  soll_col_sum: number;
  soll_pal_sum: number
  soll_gewicht_sum: number;
}

export interface ExpressSums {
  'p8_sum': number;
  'p9_sum': number;
  'p10_sum': number;
  'kl7_sum': number;
  'p12_sum': number;
  'amb_sum': number;
  'abend_sum': number;
}

export interface AvailableTour {
  tour_id: number;
  tournr: string;
}

export interface ManualDispoTour {
  tour_id: number;
  tournr: string;
  frachtfuehrer_tour_id?: number;
  frachtfuehrer_id?: number;
  fahrzeugart_id?: number;
  fruehestertourstart?: string;
  laenge?: number;
  min_ladeflaeche?: number;
  min_ladeflaeche_laenge?: number;
  min_ladeflaeche_breite?: number;
  min_ladeflaechehoehe?: number;
  min_ladevolumen?: number;
  min_nutzlast?: number;
  virtuelletour?: string;
  tourstartoffset?: number;
  nutzlast?: number;
  max_paletten?: number;
  max_colli?: number;
  name_1?: string;
  name_2?: string;
  name_3?: string;
  kennzeichen?: string;
  ausweisnr?: string;
  fahrername?: string;
  fahrervorname?: string;
  ambientbox?: string;
  puffertour?: boolean;
  kennzeichenpflichtig?: boolean;
  abgefertigt: boolean;
  soll_abfahrtszeit?: string;
  soll_stellzeit?: string;
  potentiell_gleiche_ziele?: boolean,
  ziele_bearbeitet?: boolean
}

export interface DispoStopp {
  dispostopp_id: number;
  ausliefertag?: string;
  tour_id?: number;
  shuttle_tour_id?: number;
  soll_stopp?: number;
  nachladebereich?: string;
  ziel_name?: ZielName;
  raster_ebene_id?: number;
  ambient?: boolean;
  planAnkunft?: string;
  planStartBearbeitung?: string;
  planBearbeitungszeit?: number;
  planStrecke?: number;
  planZeitFenster?: string;
  sendungen?: Consignment[];
  uebernahmen?: Uebernahme[];
  tournr?: string;
  // Custom properties
  isReloadStopp?: boolean;
  palCount?: number;
  colCount?: number;
  sendungendCount?: number;
  weight?: number;
  sum?: DispoSum;
  kennzeichenpflichtig?: boolean;
  abgefertigt?: boolean;
  selected?: boolean;
  tourTyp?;
}

export interface ZielName {
  ziel_name_id: number;
  geoposition?: GeoPosition;
  name1?: string;
  name2?: string;
  name3?: string;
  name123?: string;
  zeitfenster?: Zeitfenster[]
}

export interface GeoPosition {
  geoposition_id?: number;
  geo_x?: number;
  geo_y?: number;
  geoadresse: GeoAdress;
}

export interface GeoAdress {
  geoadresse_id?: number;
  land?: string;
  plz?: string;
  ort?: string;
  strasse?: string;
  hausnr?: string;
}

export interface Consignment {
  sendung_id: number;
  auftragart: string;
  sendungsNr: number;
  erfassungstag: string;
  versender_bcvsnr: string;
  versender_name: string;
  sdg_colli: number;
  sdg_paletten: number;
  dispo_colli?: number;
  dispo_paletten?: number;
  dienste?: string;
  zusatz?: string;
  gefahrgut?: string;
  gefahrgut_gewicht?: number;
  gewicht?: number;
  ist_gewicht?: number;
  volumen?: number;
  ist_volumen?: number;
  nn_betrag?: number;
  operativer_hinweis?: string;
  empfaenger_hinweis?: string;
  name1?: string;
  name2?: string;
  name3?: string;
  plz?: string;
  ort?: string;
  strasse?: string;
  hausnr?: string;
  wiedereinstreuung?: boolean;
  termin?: string;
  dispo_satzstatus?: string;
  soll_stopp?: number;
}

export interface Uebernahme {
  uebernahme_id: number;
  uebernahmeZeit?: string;
  versender_name?: string;
  versender_bcvsnr?: string;
}

export interface Stopp {
  tourNr: string;
  dispo_id: number;
  tour_id: number;
  sendung_id: number;
  uebernahme_id: number;
  stopp_nr: number;
  longitude: number;
  latitude: number;
  name1: string;
  name2: string;
  name3: string;
  strasse: string;
  hausnr: string;
  plz: string;
  ort: string;
  infodienstmaske: string;
  colli: number;
  paletten: number;
  pickup: boolean;
  delivery: boolean;
  shuttletour: boolean;
  plus8: boolean;
  plus9: boolean;
  frueh: boolean;
  vormittag: boolean;
  abend: boolean;
  amb: boolean;
  kuehl_raum: boolean;
  gefahrgut: boolean;
  gesamtgewicht: number;
  reload: boolean;
}

export enum ServiceType {
  UNKNWON,
  THERMO,
  AMBIENT,
  EXPRESS,
  RADIOACTIVE,
  DANGER,
}

export interface TourLineInformation {
  tourid: number;
  tournr: number;
}

export interface DeliveryItem {
  dispo_id: number;
  tour_id_fk: number;
  sendungen: Delivery[];
}

export interface Delivery {
  sendung_id: number;
  colli: number;
  paletten: number;
  gesamtgewicht: number;
  plus8: boolean;
  plus9: boolean;
  frueh: boolean;
  vormittag: boolean;
  abend: boolean;
  amb: boolean;
  kuehl_raum: boolean;
  gefahrgut: boolean;
  pickup: boolean;
  delivery: boolean;
  shuttletour: boolean;
  name1: string;
  name2: string;
  name3: null;
  strasse: string;
  hausnr: string;
  plz: string;
  ort: string;
}

export interface Service {
  name: string;
  type: ServiceType;
}

export interface SelectedTour {
  tourId: number;
  dispoStopps: DispoStopp[];
}

export interface Ziel {
  ziel_name_id: number;
  ziel_name_synonym_id?: any[];
  ziel_name?: string;
}

export interface UmdispoEvent {
  tour_id: number;
  tour_nr: string;
  zeitpunkt_umdispo: string;
}
