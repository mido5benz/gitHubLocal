export interface RequestToursResponse {
  tours: TourDetail[];
}

export interface TourDetail {
  tour: Tour;
  shuttleTourId?: any;
  shuttleTourNummer?: any;
  istTourShuttlefaehig: boolean;
  nachladegrenze?: any;
  planDistanz?: any;
  planFahrtdauer?: any;
  planAuslieferdauer?: any;
  planTourdauer?: any;
  dispostopps: Dispostopp[];
  dispostoppssum: Dispostoppssum[];
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
  ambSum: number;
}

export interface Tour {
  tourId: number;
  tournr: string;
  frachtfuehrerTourId?: any;
  frachtfuehrerId?: any;
  fahrzeugartId: number;
  fruehestertourstart?: any;
  laenge: number;
  minLadeflaeche: number;
  minLadeflaecheLaenge: number;
  minLadeflaecheBreite: number;
  minLadeflaechehoehe: number;
  minLadevolumen: number;
  minNutzlast: number;
  virtuelletour: string;
  tourstartoffset?: any;
  nutzlast?: any;
  maxPaletten?: any;
  maxColli?: any;
  name1?: any;
  name2?: any;
  name3?: any;
  kennzeichen?: any;
  ausweisnr?: any;
  fahrername?: any;
  fahrervorname?: any;
  ambientbox?: any;
  puffertour: boolean;
}

export interface Geoadresse {
  geoadresseId: number;
  land: string;
  plz: string;
  ort: string;
  strasse: string;
  hausnr: string;
}

export interface Geoposition {
  geopositionId: number;
  geoX: number;
  geoY: number;
  geoadresse: Geoadresse;
}

export interface ZielName {
  zielNameId: number;
  geoposition: Geoposition;
  name1: string;
  name2: string;
  name3: string;
  name123?: any;
}

export interface Sendungen {
  sendungId: number;
  auftragart: string;
  sendungsNr: string;
  erfassungstag: string;
  versenderBcvsnr: string;
  versenderName: string;
  sdgColli: number;
  sdgPaletten: number;
  dispoColli: number;
  dispoPaletten: number;
  dienste: string;
  zusatz?: any;
  gefahrgut?: any;
  gefahrgutGewicht?: any;
  gewicht: number;
  istGewicht: number;
  volumen?: any;
  istVolumen: number;
  nnBetrag?: any;
  operativerHinweis?: any;
  empfaengerHinweis?: any;
  name1: string;
  name2: string;
  name3?: any;
  plz: string;
  ort: string;
  strasse: string;
  hausnr: string;
  wiedereinstreuung: boolean;
  termin?: any;
  dispoSatzstatus: string;
}

export interface Dispostopp {
  dispostoppId: number;
  ausliefertag: string;
  tourId: number;
  shuttleTourId?: any;
  sollStopp?: any;
  nachladebereich?: any;
  zielName: ZielName;
  rasterEbeneId: number;
  ambient: boolean;
  planAnkunft?: any;
  planStartBearbeitung?: any;
  planBearbeitungszeit?: any;
  planStrecke?: any;
  planZeitFenster?: any;
  sendungen: Sendungen[];
  uebernahmen?: any;
  tournr?: string;
}

export interface Dispostoppssum {
  dispostoppId: number;
  sollStopp: number;
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
  ambSum: number;
}
