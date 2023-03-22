export interface VersenderAdresse {
  adresse_id: number,
  adresse_nummer: number,
  adresse_typ: string,
  name1: string,
  name2: string,
  name3: string,
  landCode: string,
  plz: string,
  ort: string,
  strasse: string,
  hausnr: string
}

export interface SpontaneUebernahme {
  uebernahme_id: number,
  ueb_ladestelle_id: number,
  tour_nr: string,
  depot: string,
  ambient: boolean,
  ladestelle_adresse_id?: number,
  versender_adresse_id?: number,
  ladestelle?: LadestelleAdresse,
  ladestelle_adresse?: LadestelleAdresse,
  versender_adresse?: VersenderAdresse,
  name_1: string,
  name_2: string,
  name_3: string,
  strasse: string,
  hausnr: string,
  plz: string,
  ort: string,
  land: string,
  uebernahmeDatum: string,
  uebernahmeZeit: string
}

export interface KundenUebernahme {
  ueb_ladestelle_id: number,
  depot: string,
  typ_regel: boolean,
  typ_sporadisch: boolean,
  typ_adhoc: boolean,
  versender_adresse: VersenderAdresse,
  ladestelle_adresse: LadestelleAdresse

}

export interface LadestelleAdresse {
  adresse_id: number,
  adresse_nummer: number,
  adresse_typ: string,
  name1: string,
  name2: string,
  name3: string,
  landCode: string,
  plz: string,
  ort: string,
  strasse: string,
  hausnr: string
}

export interface DepotListe {
  depotId: number,
  code: string,
  depotNr: string,
  bezeichnung: string,
  partnerIdFk: number
}
