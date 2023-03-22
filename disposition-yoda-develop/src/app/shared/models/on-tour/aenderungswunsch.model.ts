export interface Aenderungswunsch {
  anzahl: number;
  anfragen: Anfrage[];
}

export interface Anfrage {
  tournr: string;
  anfrage_stoppplanung_id?: number;
  tour_id?: number;
  ausliefertag?: Date;
  anfrage_zeit?: Date;
  anfrage_nr?: number;
  stoppnr_alt_von?: number;
  stoppnr_alt_bis?: number;
  stoppnr_neu?: number;
  antwort?: boolean;
}

export interface DetailAnsicht {
  ff_name_1: string;
  ff_name_2: string;
  ff_name_3: string;
  fahrer_vorname: string;
  fahrer_nachname: string;
  mobil_telefon: string;
}

export interface StoppplanungTableData {
  soll_nr: number;
  empfaenger: string;
  strasse: string;
  hausnr: string;
  plz: string;
  ort: string;
  planAnkunft: string;
  dienste: Dienste;
}

export interface Dienste {
  p8: number;
  p9: number;
  p10: number;
  p12: number;
  abend: number;
}


export interface StoppReihenfolgeResponse {
  anfrage_stoppplanung_id: number;
  antwort: boolean;
}
