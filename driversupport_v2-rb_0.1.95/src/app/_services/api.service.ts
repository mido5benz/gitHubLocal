import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {
  TourSelectionModel, TourStatusModel, TourShipmentModel, PackageModel, TypeResponse, ScanHistoryModel, ShipmentModel
  , CollectionTypeModel, StatustypModel, UmdispoGrundModel, MessageModel, VereinnahmungModel, ModifyAmountModel, TransferObject, TypeSendung, TypeDienst, RingingModel
} from './api';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment/environment';
import { promise } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class apiService {
  public env = environment
  intervalTime: any;
  constructor(private http: HttpClient) { }

  /* Get Application Value of the Project */
  getApplications(): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(this.env.baseUrl + '/applications');
  }

  /* Get Version of the Project */
  getVersion(): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(this.env.baseUrl + '/versions');
  }

  /* Get Status of the Project */
  getStatus(): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(this.env.baseUrl + '/status',);
  }

  /* Put the Tour Selection Data based on User (/tourSelection/{loginName}) */
  getTourSelection(loginName): Observable<TourSelectionModel[]> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http.put<TourSelectionModel[]>(this.env.baseUrl + '/tourSelection/', loginName, { headers });
  }

  /* save selected tours Data based on User (/tourSelection/save/{loginName}) */
  saveTourSelections(data) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http.post<TypeResponse>(this.env.baseUrl + '/tourSelection/save', data);
  }

  /* Put Tour Dashboard Based on the User (tourDashboard/loginName) */
  getTourDashboard(loginName) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http.put<TourStatusModel[]>(this.env.baseUrl + '/tourDashboard/', loginName, { headers });
  }

  /* Put  tour shipment data for selected tour in dashboard (/tourSelect/{tourId}) */
  getTourSelect(savedData): Observable<TourShipmentModel[]> {
    let data = JSON.parse(JSON.stringify(savedData));
    delete data.countsarr;
    return this.http.put<TourShipmentModel[]>(this.env.baseUrl + '/tourSelect/', data);
  }

  /* Get  data for tour shipment details (/tourShipmentDetails/{colliBarcode}) */
  getTourShipmentDetails(colliBarcode): Observable<TypeSendung> {
    return this.http.get<TypeSendung>(this.env.baseUrl + '/tourShipmentDetails/' + colliBarcode);
  }

  /* write a falsealarm By using Id */ /* Need to Body yaml */
  getfalseReport(tourNr, colliBarcode, verify): Observable<TypeResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('content-length', '0');
    return this.http.put<TypeResponse>(this.env.baseUrl + '/falseReport/' + tourNr + '/' + colliBarcode + '/' + verify, '');
  }

  /*  Get scan data for package  (/scanHistory/{colliBarcode}) */
  getScanHistorybyBarcode(colliBarcode): Observable<ScanHistoryModel[]> {
    return this.http.get<ScanHistoryModel[]>(this.env.baseUrl + '/scanHistory/' + colliBarcode);
  }


  /* sends a serach order to driver mobile (/searchOrder/{sendungId}) */ /* Need to Body yaml */
  getSearchOrderbyId(sendungId): Observable<TypeResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('content-length', '0');
    return this.http.put<TypeResponse>(this.env.baseUrl + '/searchOrder/' + sendungId, '');
  }

  /* sends a serach order to driver mobile (/searchOrder/{colliBarcode}) */ /* Need to Body yaml */
  getSearchOrderbyBarcode(colliBarcode): Observable<TypeResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('content-length', '0');
    return this.http.put<TypeResponse>(this.env.baseUrl + '/searchOrder/' + colliBarcode, '');
  }



  //  /shipmentDetail/scann/{colliBarcode} /* provide data for shipment details */
  getShipmentDetailScanbyBarcode(colliBarcode): Observable<ShipmentModel> {
    return this.http.get<ShipmentModel>(this.env.baseUrl + '/shipmentDetail/scann/' + colliBarcode);
  }

  //    /intialCollectView /* provides the shipments collected by CollectionTypeModel 'VERBRINGPFLICHT' */
  getintialCollectView(): Observable<VereinnahmungModel[]> {
    return this.http.get<VereinnahmungModel[]>(this.env.baseUrl + '/intialCollectView');
  }

  // /collectionData/{collectionTypeModelCode} /* provides package data for selected collention type */
  // getCollectionData(collectionTypeModelCode): Observable<VereinnahmungModel[]> {
  //   return this.http.get<VereinnahmungModel[]>(this.env.baseUrl + '/collectionData/' + collectionTypeModelCode);
  // }


  // /collectionData/{collectionTypeModelCode}/{getAllData} /* provides package data for selected collention type for the update
  // if getAllData is true, it returns only the number of row for the not updated collectionType
  // */
  getCollectionDataForUpdate(collectionTypeModelCode,getAllData): Observable<VereinnahmungModel[]> {
    return this.http.get<VereinnahmungModel[]>(this.env.baseUrl + '/collectionData/' + collectionTypeModelCode+ '/' + getAllData);
  }

  // /collect/{collectionTypeModelCode} /* sends package data to persist for collection type */ /* Need to Body yaml */
  getCollect(savedData, collectionTypeModelCode) {
    let response = [{
      icon: savedData.icon,
      tourNr: savedData.tourNr,
      colliBarcode: savedData.colliBarcode,
      recipientAdress: savedData.recipientAdress,
      eventColor: savedData.recipientAdress
    }];
    return this.http.put<PackageModel[]>(this.env.baseUrl + '/collect/' + collectionTypeModelCode, '');
  }

  // /collectWE /* persist package for WE */
  getCollectWE(savedData) {
    let model = [];
    //for (var i = 0; i < savedData.length; i++) {
    model.push({
      packstueckId: savedData.packstueckId,
      icon: savedData.icon,
      tournr: savedData.tournr,
      value: savedData.value,
      colliBarcode: savedData.colliBarcode,
      sendungId: savedData.sendungId,
      recipientName: savedData.recipientName,
      recipientAdress: savedData.recipientAdress,
      eventColor: savedData.eventColor
    });
    //}
    return this.http.put<TypeResponse>(this.env.baseUrl + '/collectWE', model);
  }

  /* collectVL  persist package for VL */
  getcollectVL(savedData) {
    let model = [];
    //for (var i = 0; i < savedData.length; i++) {
    model.push({
      packstueckId: savedData.packstueckId,
      icon: savedData.icon,
      tournr: savedData.tournr,
      value: savedData.value,
      colliBarcode: savedData.colliBarcode,
      sendungId: savedData.sendungId,
      recipientName: savedData.recipientName,
      recipientAdress: savedData.recipientAdress,
      eventColor: savedData.eventColor
    });
    //}
    return this.http.put<TypeResponse>(this.env.baseUrl + '/collectVL', model);
  }

  //   /collectScan/{colliBarcode} /* provides package data for scanned colli barcode */
  getCollectScan(colliBarcode): Observable<PackageModel> {
    return this.http.get<PackageModel>(this.env.baseUrl + '/collectScan/' + colliBarcode);
  }

  //  /collect/Photo/initialize/{colliBarcode} /*provide package data for shipment with ktl status */
  getCollectbyInitial(colliBarcode): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.env.baseUrl + '/collect/Photo/initialize/' + colliBarcode);
  }

  //  /collect/Photo/done/{image} /* sends package data to backend */
  getCollectbyDone(data) {
    return this.http.put<TypeResponse>(this.env.baseUrl + '/collect/Photo/done', data);
  }

  // /collect/UnknownReason/{umdispoGrundId} /* sends packag data to rearange */
  getCollectbyUnknown(umdispoGrundId, data) {
    return this.http.put<TypeResponse>(this.env.baseUrl + '/collect/UnknownReason/' + umdispoGrundId, data);
  }
  /* collect/correction */ //provides package amount data to correct
  putcollectcorrection(data) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    let model = [];
    model.push({
      packstueckId: data.packstueckId,
      icon: data.icon,
      tournr: data.tournr,
      value: data.value,
      colliBarcode: data.colliBarcode,
      sendungId: data.sendungId,
      recipientName: data.recipientName,
      recipientAdress: data.recipientAdress,
      eventColor: data.eventColor
    });
    return this.http.put<ModifyAmountModel>(this.env.baseUrl + '/collect/correction', data, { headers });
  }

  /* collect/correction */ //package amount data to save
  putcollectcorrectionsave(savedData) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    let model = [];
    model.push({
      sendungId: savedData.sendungId,
      amountcolli: savedData.amountcolli,
      amountpaletten: savedData.amountpaletten,
      amountcollimodified: savedData.amountcollimodified,
      amountpalettenmodified: savedData.amountpalettenmodified
    });
    return this.http.put<TypeResponse>(this.env.baseUrl + '/collect/correction/save', savedData, { headers });
  }


  //  /mainData/collectioneType /* provides the collection type data */
  getMainDataBycollection(): Observable<CollectionTypeModel[]> {
    return this.http.get<CollectionTypeModel[]>(this.env.baseUrl + '/mainData/collectioneType');
  }

  //  /mainData/statusType /* provides the status type data */
  getMainDataByStatus(): Observable<StatustypModel[]> {
    return this.http.get<StatustypModel[]>(this.env.baseUrl + '/mainData/statusType');
  }

  //   /mainData/rearrangeReason /* provides the rearange type data */
  getMainDataByRearrange(): Observable<UmdispoGrundModel[]> {
    return this.http.get<UmdispoGrundModel[]>(this.env.baseUrl + '/mainData/rearrangeReason');
  }

  /* /autoFmData/{tourId} */ //liefert ein OK wenn ein Benutzer AutoFM aktiviert hat, sonst NOK
  getautoFmData(tourId): Observable<TypeResponse> {
    return this.http.get<TypeResponse>(this.env.baseUrl + '/autoFmData/' + tourId);
  }

  /* /autoFmData/toggleAutoFm */ //registers the AutoFM state
  putautoFmData(uniqueId): Observable<TypeResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http.put<TypeResponse>(this.env.baseUrl + '/autoFmData/toggleAutoFm/', uniqueId, { headers });
  }

  collectByColliBarcode(id): Observable<TypeResponse> {
    return this.http.put<TypeResponse>(this.env.baseUrl + '/collect/' + id, '');
  }

  getRefreshInterval(): Observable<TypeResponse> {
    return this.http.get<TypeResponse>(this.env.baseUrl + '/refreshingTimeInterval/timeInterval');
  }

  getFotoAnzahl(): Observable<TypeResponse> {
    return this.http.get<TypeResponse>(this.env.baseUrl + '/collect/getFotoAnzahl');
  }

  getmaxTours(): Observable<TypeResponse> {
    return this.http.get<TypeResponse>(this.env.baseUrl + '/MaxTourNumber/maxTours');
  }

  getAutoFmStatus(value): Observable<TypeResponse> {
    return this.http.get<TypeResponse>(this.env.baseUrl + '/autoFmData/getAutoFmStatus/' + 1000);
  }

  getNcValue(tourId):Observable<TypeResponse> {
    return this.http.get<TypeResponse>(this.env.baseUrl + '/getNc/' + tourId);
  }

  getTourPDF(tourId,date):Observable<TransferObject[]>{
    return this.http.get<TransferObject[]>(this.env.baseUrl + '/getTourPdf/' + tourId + '/' + date);
  }

  printPdf(tourId,gereatenummer,qrCode):Observable <TypeResponse>{
    return this.http.get<TypeResponse>(this.env.baseUrl + '/printPdf/'+ tourId + '/'+ gereatenummer + '/'+ qrCode);
  }

  getShipmentDetailsTypeSend(packstueckreferenz,avisDetails?,sendungskette?,dispoDetails?,scannungen?,seereignisse?): Observable<TypeSendung>{
    var params = new HttpParams();
    params = params.set('avisDetails', !avisDetails ? true : avisDetails );
    params = params.set('sendungskette', !sendungskette ? true : sendungskette);
    params = params.set('dispoDetails', !dispoDetails ? true : dispoDetails);
    params = params.set('scannungen', !scannungen ? true : scannungen);
    params = params.set('seereignisse', !seereignisse ? true : seereignisse);
    return this.http.get<TypeSendung>(this.env.baseUrl + '/process/sendungen/dispovolumen/'+ packstueckreferenz,{ params: params });
  }

  getProcessSendungen(colliBarcode,avisDetails?,sendungskette?,dispoDetails?,scannungen?,seereignisse?): Observable<TypeSendung>{
    var params = new HttpParams();
    params = params.set('avisDetails', avisDetails);
    params = params.set('sendungskette', sendungskette);
    params = params.set('dispoDetails', dispoDetails);
    params = params.set('scannungen', scannungen);
    params = params.set('seereignisse', seereignisse);
    return this.http.get<TypeSendung>(this.env.baseUrl + '/process/sendungen/'+colliBarcode,{ params: params });
  }

  getMultipleSendungen(rowData): Observable<any> {
    let resData = [];
    for (var i = 0; i < rowData.length; i++) {
      resData[i] = this.http.get<any>(this.env.baseUrl + '/process/sendungen/'+rowData[i]);
    }
    return forkJoin(resData);
  }

  getTypeDienstKorrektur():Observable<TypeDienst[]>{
    return this.http.get<TypeDienst[]>(this.env.baseUrl + '/process/masterdata/dienste/sendungskorrektur/zeit');
  }

  saveTypeSendungskorrektur(sendungId,body):Observable<TypeSendung>{
    return this.http.put<TypeSendung>(this.env.baseUrl + '/process/sendungen/' + sendungId + '/korrektur', body);
  }

  getRegEx() {
    return this.http.get<TypeResponse>(this.env.baseUrl + '/mainData/getRegExp');
  }


  getradioId(code):Observable<TypeDienst> {
    return this.http.get<TypeDienst>(this.env.baseUrl + '/process/masterdata/dienste/'+code);
  }


  getMultipleCountsForTabs(rowData): Observable<any> {
    let resData = [];
    for (var i = 0; i < rowData.length; i++) {
      resData[i] = this.http.get<any>(this.env.baseUrl + '/collectionData/' + rowData[i]);
    }
    return forkJoin(resData);
  }

  getCollectUnknownReasonByCollibarcode(collibarcode): Observable<VereinnahmungModel>{
    return this.http.get<VereinnahmungModel>(this.env.baseUrl + '/collect/UnknownReason/'+collibarcode);
  }

  setconfirmRingPresort(ringingModel: RingingModel){
    // ringingModel.ringingConfirm = false;
     return this.http.put<TypeResponse>(this.env.baseUrl + '/tourDashboard/confirmRingPresort/', ringingModel);

  }

  setconfirmRingFahrer(ringingModel: RingingModel){
    // ringingModel.ringingConfirm = true;
    return this.http.put<TypeResponse>(this.env.baseUrl + '/tourDashboard/confirmRingFahrer/', ringingModel);

 }

 public async getApplicationInfo(): Promise<any> {

  const applications = await this.http.get(this.env.baseUrl+'/applications').toPromise();
  const versions = await this.http.get(this.env.baseUrl+'/versions').toPromise();
  const status = await this.http.get(this.env.baseUrl+'/status').toPromise();

  return {
    applications,
    versions,
    status
  };
}

  async getSingleCountsForTabs(vereinnahmungTyp): Promise<any> {
    return  this.http.get<any>(this.env.baseUrl + '/collectionData/' + vereinnahmungTyp).toPromise();

  }


  // // /collectionData/{collectionTypeModelCode} /* provides package data for selected collention type */
  getCollectionData(collectionTypeModelCode,getAllData): Observable<VereinnahmungModel[]> {
    return this.http.get<VereinnahmungModel[]>(this.env.baseUrl + '/collectionData/' + collectionTypeModelCode+ '/' + getAllData);
  }

  async getSingleCountsForTabsForUpdate2(vereinnahmungTyp,getAllData): Promise<any> {
    console.log("call API ", vereinnahmungTyp);
    return this.http.get<VereinnahmungModel[]>(this.env.baseUrl + '/collectionData/' + vereinnahmungTyp+ '/' + getAllData).toPromise();
  }



}
