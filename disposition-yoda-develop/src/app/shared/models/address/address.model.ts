export interface Address {
  geoadresse_fehler_id: number;
  sendung_id: number;
  dispostopp_id: number;
  geoadresse_id: number;
  ziel_name_id: number;
  name1: string;
  name2: string;
  name3: string;
  landCode: string;
  plz: string;
  ort: string;
  strasse: string;
  hausnr: string;
}

export interface Recipient {
  ziel_name_id: number;
  geoposition_id: number;
  anzahl_synonyme: number;
  anzahl_geopos_ziele: number;
  name1: string;
  name2: string;
  name3: string;
  name123: string;
  strasse: string;
  hausnr: string;
  plz: string;
  ort: string;
  land: string;
}

