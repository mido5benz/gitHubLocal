export class TourSelectionModel {
  tourId: number;
  tourNr: string;
  niederlassungId: number;
  loginName: string;
  isSavedByLoginUser: boolean;
  isSavedByAnotherUser: string;
  selectionState: boolean;
}

export class TourStatusModel {
  tourId: number;
  tourNr: string;
  tourPlaceTime: string;
  tourStartTime: string;
  tourStartTimeInMinute: number;
  tourPlaceTimeInMinute: number;
  presortCountTotal: string;
  presortCountCurrent: number;
  presortCountCurrentPercent: number;
  presortStatus: string;
  loadingCountTotal: string;
  loadingCountCurrent: number;
  loadingCountCurrentPercent: number;
  loadingStatus: string;
  // currentDegreeVehicle: number;
  // degreeeStatus: string;
  cashReturn: number;
  cashReturnStatus: string;
  driverRegistration: boolean;
  driverName: string;
  driverRegistrationStatus: string;
  rearrangeCount: number;
  rearrangeTours: Array<string>;
  rearrangerStatus: string;
  requestDriverSupporter: boolean;
  requestDriverSupporterStatus: string;
  tourStatus: string;
  tourStatusSort: number;
  temperatur: TemperaturModel[];
  sollPalettenanzahl: number;
  sollCollanzahl: number;
  loadingCountCurrentColl: number;
  loadingCountCurrentPal: number;
  countsarr: any;
  labelingObligation: boolean;
  ringing: RingingModel;
  ringingPresort: string;
  ringingFahrer: string;
}

export class RingingModel {
  tourId: number;
  ringingPresort: boolean;
  ringingFahrer: boolean;
  ringingPresortName: string;
  ringingFahrerName: string;
  ringingConfirm: boolean;
}

export class TemperaturModel {
  currentDegreeVehicle: number;
  degreeeStatus: string;
}

export class TourShipmentModel {
  sendungId: number;
  icon: string;
  tourNr: string;
  colliBarcode: string;
  recipientAdress: string;
  eventColor: string;
  value: string;
  sort: number;
  showFM: boolean;
  langreferenz: string;
}

export class PackageModel {
  icon: string;
  tourNr: string;
  colliBarcode: string;
  recipientAdress: string;
  eventColor: string;
}

export class TypeResponse {
  code: string;
  text: string;
  serverzeit: string;
}

export class ScanHistoryModel {
  colliBarcode: string;
  scanEvent: string;
  scanDateTime: string;
  rutsche: string;
}

export class ShipmentModel {
  sendungId: number;
  bcv: string;
  name: string;
  recipient: string;
  street: string;
  zip: string;
  city: string;
  shipmentNumber: string;
  refNumber: string;
  registrationDate: string;
  weight: number;
  weightCurreny: string;
  amountPackages: number;
  amountPalettes: number;
  packageEvent: PackageEventModel[];
  dispo: DispoModel[];
  shipmentEvents: ShipmentEventModel[];
}
export class CollectionTypeModel {
  collectionTypeModelId: number;
  code: string;
  bezeichung: string;
  beschreibung: String;
  satzStatus: String;
}

export class StatustypModel {
  statusTypId: number;
  code: string;
  bezeichnung: string;
}

export class UmdispoGrundModel {
  umdispoGrundId: number;
  code: string;
  bezeichnung: string;
}

export class MessageModel {
  value: string;
}

export class ShipmentEventModel {
  eventId: number;
  bearbeiterShipment: string;
  eventText: string;
  eventDateTime: string;
}

export class PackageEventModel {
  eventId: number;
  bearbeiterPackage: string;
  eventText: string;
  eventDateTime: string;
  colliBarcode: string;
}
export class DispoModel {
  tourId: number;
  tourNr: string;
  targetStopp: number;
  time: string;
}

export class VereinnahmungModel {
  zeilenummer: number;
  packstueckId: number;
  icon: string;
  tournr: string;
  value: string;
  colliBarcode: string;
  sendungId: number;
  recipientName: string;
  recipientAdress: string;
  eventColor: string;
}

export class ImageModel {
  imageData: Array<String>;
  colliBarcode: Array<string>;
  isColl: boolean;
  // items:string;
}
export class ModifyAmountModel {
  sendungId: number;
  amountcolli: number;
  amountpaletten: number;
  amountcollimodified: number;
  amountpalettenmodified: number;
}

export class TransferObject {
  dokument: string;
  anzahlDruck: number;
  tourIdFk: string;
  ausliefertag: string;
  typ: string;
  tourNr: string;
  bytes: number;
}

// Shipment Details New changes
export class TypeSendung {
  sendungId: number;
  vorgaengerId: number;
  nachfolgerId: number;
  erfassungstag: string;
  auftragart: string;
  sendungsnr: string; //sendungsnr
  langreferenz: string; //referencenumber
  bcvsnr: string; //bcv
  absender: string; //name
  empfaengerName1: string; //empfaenger +
  empfaengerName2: string; //empfaenger +
  empfaengerName3: string; //empfaenger +
  empfaengerAnsprechpartner: string;
  empfaengerStrasse: string; //strabe
  empfaengerHausnr: string;
  empfaengerLand: string; // land
  empfaengerPlz: string; // ort + plz ort
  empfaengerOrt: string; // ort + plz ort
  colli: number; // icon col
  paletten: number; // icon pal
  gesamtgewicht: number;
  gewichteinheit: string;
  nachnahmeBetrag: number;
  inkassoart: string;
  hinweisEmpfaenger: string;
  hinweisOperativ: string;
  zustelltermin: string;
  uebernahmeDepotNr: number;
  zustellDepotNr: number;
  dienste: Array<TypeDienst>; // express
  packstuecke: Array<TypePackstueck>;
  gefahrgueter: Array<TypeGefahrgut>; // unnr
  dispoDetails: Array<TypeDispo>; // dispo
  scannungen: Array<TypeScannung>;
  seereignisse: Array<TypeSendungsereignis>;
  sendungskette: Array<number>;
  colliIST: any;
  palettenIST: any;
  expressServiceValue: string;
  radioActive: boolean;
}

export class TypeDienst {
  id: number;
  dienstart: string;
  maskenposition: number;
  code: string;
  bezeichnung: string;
  anzeigeKuerzel: string;
  uhrzeitErforderlich: boolean;
}

export class TypePackstueck {
  packstueckId: number;
  sendungId: number;
  packstueckreferenz: string;
  gewicht: number;
  art: string;
}

export class TypeGefahrgut {
  gefahrgutId: number;
  sendungId: number;
  unnr: string;
  lq: boolean;
  gewicht: number;
  faktor: number;
  stoffbezeichnung: string;
  verpackungsgruppe: string;
  klasse: number;
  gefahrzettel: number;
  kategorie: number;
  sondervorschrift: string;
  tunnelbeschraenkungscode: string;
  nebengefahren: Array<string>;
  radionuklid: string;
  radionuklidform: number;
  aktivitaet: number;
  masseinheit: string;
  versandstueckkategorie: number;
  transportkennzahl: number;
  genehmigungsnummer_stoffe: string;
  genehmigungsnummer_verpackung: string;
}

export class TypeDispo {
  dispoId: number;
  sendungId: number;
  ausliefertag: string;
  wiedereingestreut: number;
  tournr: string;
  stopp: number;
  tourSektor: number;
  colli: number;
  paletten: number;
  gewicht: number;
}

export class TypeScannung {
  id: number;
  sendungId: number;
  zeitpunkt: string;
  zeitpunkt_rutsche: string;
  barcode: string;
  scantyp: string;
  statustypId: number;
  statustyp: string;
  statusgrundtypId: number;
  statusgrundtyp: string;
  raumBarcode: string;
  bezugBarcode: string;
  storno: number;
  gewicht: number;
  taragewicht: number;
  laenge: number;
  breite: number;
  hoehe: number;
  volumen: number;
  volumenreferenz: string;
  geraettyp: string;
  geraetenummer: string;
  bearbeiter: string;
  sollRutsche: number;
  istRutsche: number;
  depotnr: number;
  tournr: string;
  stopp: number;
  text: string;
}

export class TypeSendungsereignis {
  id: number;
  sendungId: number;
  zeitpunkt: Date;
  statustypId: number;
  statustyp: string;
  statusgrundtypId: number;
  statusgrundtyp: string;
  abnehmer: string;
  termin: string;
  tournr: string;
  stopp: number;
  colli: number;
  paletten: number;
  raumbarcode: string;
  bearbeiter: string;
  text: string;
}

export class TypeDienstKorrektur {
  diensttypId: number;
  dienstGesetzt: boolean;
  datumUhrzeit: string;
}

export class TypeSendungskorrektur {
  sendungId: number;
  dienstkorrekturen: Array<TypeDienstKorrektur>;
  colli: number;
  paletten: number;
  gesamtgewicht: number;
}

export class ResponseCollectCollibarcode {
  barcodes: Array<ResponseCollectCollibarcode>;
  items: string;
}
