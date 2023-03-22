import {LadestelleAdresse} from '@models/spontaneous-takeovers/spontaneous-takeovers.model';

export interface RulePickup {
  dauerauftrag_id: number,
  versender_adresse_id: number,
  tornr: string,
  tournr: string,
  info: string,
  eurodiskz?: number,
  auftragsname: string,
  ambient: boolean,
  gueltigvon: string,
  gueltigbis: string,
  uebernahmen: Uebernahmen[],
  ladestelle_adresse: LadestelleAdresse,
}

export interface Uebernahmen {
  wochentag: string,
  ankunftZeit: string,
  anzahlUebernahmen: number,
  anzahlFahrzeuge: number
}
