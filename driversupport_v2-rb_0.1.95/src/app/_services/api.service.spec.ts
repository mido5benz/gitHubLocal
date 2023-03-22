import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { apiService } from './api.service';

fdescribe('ApiService', () => {
  let service: apiService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let username = 'DRIVES01';
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(apiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: apiService = TestBed.get(apiService);
    expect(service).toBeTruthy();
  });


  it('should Get app name', () => {
    service.getApplications().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/applications');
    expect(req[0].request.method).toBe("GET");
  });

  it('should Get app version', () => {
    service.getVersion().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/versions');
    expect(req[0].request.method).toBe("GET");
  });


  it('should Get app status', () => {
    service.getStatus().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/status');
    expect(req[0].request.method).toBe("GET");
  });

  it('should Get tourselection tours', () => {
    service.getTourSelection(username).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/tourSelection/');
    expect(req[0].request.method).toBe("PUT");
  });

  it('should save tourselection tours', () => {
    let obj = [{
      isSavedByAnotherUser: null,
      isSavedByLoginUser: false,
      loginName: "DRIVES01",
      niederlassungId: 31,
      tourId: 66000000000246,
      tourNr: "0700"
    }];
    service.saveTourSelections(obj).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/tourSelection/save');
    expect(req[0].request.method).toBe("POST");
  });


  it('should Get tours Dhasboard tours', () => {
    service.getTourDashboard(username).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/tourDashboard/');
    expect(req[0].request.method).toBe("PUT");
  });

  it('should Get tours details after for a Dhasboard tour', () => {
    let obj = {
      cashReturn: 0,
      cashReturnStatus: "rgb(218, 218, 218)",
      currentDegreeVehicle: null,
      degreeeStatus: "rgb(249, 66, 12)",
      driverName: null,
      driverRegistration: false,
      driverRegistrationStatus: "rgb(249, 66, 12)",
      loadingCountCurrent: 0,
      loadingCountCurrentPercent: 0,
      loadingCountTotal: "0 + 105",
      loadingStatus: "rgb(249, 66, 12)",
      presortCountCurrent: 0,
      presortCountCurrentPercent: 0,
      presortCountTotal: "0 + 105",
      presortStatus: "rgb(249, 66, 12)",
      rearrangeCount: 0,
      rearrangeTours: [],
      rearrangerStatus: "rgb(218, 218, 218)",
      requestDriverSupporter: null,
      requestDriverSupporterStatus: null,
      tourId: 99000000000543,
      tourNr: "2085",
      tourPlaceTime: "13:58",
      tourPlaceTimeInMinute: null,
      tourStartTime: "18:00",
      tourStartTimeInMinute: null,
      tourStatus: "rgb(249, 66, 12)",
      tourStatusSort: 1
    }
    service.getTourSelect(obj).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/tourSelect/');
    expect(req[0].request.method).toBe("PUT");
  });


  it('should send false report alarm', () => {
    let tourNr = '2085';
    let colliBarcode = '397001911662474274908525';
    let verify = true;
    service.getfalseReport(tourNr, colliBarcode, verify).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/falseReport/' + tourNr + '/' + colliBarcode + '/' + verify);
    expect(req[0].request.method).toBe("PUT");
  });

  it('should fetch the scan histories of the shipment', () => {
    let colliBarcode = '397001911662474274908525';
    service.getScanHistorybyBarcode(colliBarcode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/scanHistory/' + colliBarcode);
    expect(req[0].request.method).toBe("GET");
  });

  it('should search order using the id', () => {
    let colliBarcode = '397001911662474274908525';
    service.getSearchOrderbyId(colliBarcode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/searchOrder/' + colliBarcode);
    expect(req[0].request.method).toBe("PUT");
  });

  it('should fetch the shipment details of the shipment using barcode', () => {
    let colliBarcode = '397001911662474274908525';
    service.getShipmentDetailScanbyBarcode(colliBarcode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/shipmentDetail/scann/' + colliBarcode);
    expect(req[0].request.method).toBe("GET");
  });


  it('should fetch the initial Collection details', () => {
    service.getintialCollectView().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/intialCollectView');
    expect(req[0].request.method).toBe("GET");
  });


  it('should fetch the Collection details based on the section for VERBRINGPFLICHT', () => {
    let collectionTypeModelCode = 'VERBRINGPFLICHT';
    service.getCollectionData(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collectionData/' + collectionTypeModelCode);
    expect(req[0].request.method).toBe("GET");
  });

  it('should fetch the Collection details based on the section for ZUSTELLHINDERNIS', () => {
    let collectionTypeModelCode = 'ZUSTELLHINDERNIS';
    service.getCollectionData(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collectionData/' + collectionTypeModelCode);
    expect(req[0].request.method).toBe("GET");
  });

  it('should fetch the Collection details based on the section for STOERUNG_BELADUNG', () => {
    let collectionTypeModelCode = 'STOERUNG_BELADUNG';
    service.getCollectionData(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collectionData/' + collectionTypeModelCode);
    expect(req[0].request.method).toBe("GET");
  });

  it('should fetch the Collection details based on the section for TEMPERATURPRUEFUNG', () => {
    let collectionTypeModelCode = 'TEMPERATURPRUEFUNG';
    service.getCollectionData(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collectionData/' + collectionTypeModelCode);
    expect(req[0].request.method).toBe("GET");
  });

  it('should fetch the Collection details based on the section for SONSTIGE', () => {
    let collectionTypeModelCode = 'SONSTIGE';
    service.getCollectionData(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collectionData/' + collectionTypeModelCode);
    expect(req[0].request.method).toBe("GET");
  });


  it('should send the request for the collectWE', () => {
    let collectionTypeModelCode = {
      colliBarcode: "397000371272024914907545",
      eventColor: "red",
      icon: "Stoerung",
      packstueckId: 140625265,
      recipientAdress: "Heinrichstr. 46, 07545 Gera",
      recipientName: "Rossplatz-Apotheke",
      sendungId: 176509538,
      tournr: "1150",
      value: "Sendungstopp"
    }
    service.getCollectWE(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collectWE');
    expect(req[0].request.method).toBe("PUT");
  });


  it('should send the request for the collectVL', () => {
    let collectionTypeModelCode = {
      colliBarcode: "397000371272024914907545",
      eventColor: "red",
      icon: "Stoerung",
      packstueckId: 140625265,
      recipientAdress: "Heinrichstr. 46, 07545 Gera",
      recipientName: "Rossplatz-Apotheke",
      sendungId: 176509538,
      tournr: "1150",
      value: "Sendungstopp"
    }
    service.getcollectVL(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collectVL');
    expect(req[0].request.method).toBe("PUT");
  });

  it('should fetch the package data for shipment with ktl status', () => {
    let colliBarcode = '397001911662474274908525';
    service.getCollectbyInitial(colliBarcode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collect/Photo/initialize/' + colliBarcode);
    expect(req[0].request.method).toBe("GET");
  });


  it('should get the correction values for the collection', () => {
    let collectionTypeModelCode = {
      colliBarcode: "397000371272024914907545",
      eventColor: "red",
      icon: "Stoerung",
      packstueckId: 140625265,
      recipientAdress: "Heinrichstr. 46, 07545 Gera",
      recipientName: "Rossplatz-Apotheke",
      sendungId: 176509538,
      tournr: "1150",
      value: "Sendungstopp"
    }
    service.putcollectcorrection(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collect/correction');
    expect(req[0].request.method).toBe("PUT");
  });

  it('should save the correction values for the collection', () => {
    let collectionTypeModelCode = {
      sendungId: 176509538,
      amountcolli: 1,
      amountpaletten: 4,
      amountcollimodified: 2,
      amountpalettenmodified: 5
    }
    service.putcollectcorrectionsave(collectionTypeModelCode).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/collect/correction/save');
    expect(req[0].request.method).toBe("PUT");
  });


  it('should provide the collection type data', () => {
    service.getMainDataBycollection().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/mainData/collectioneType');
    expect(req[0].request.method).toBe("GET");
  });

  it('should provide the collection type data', () => {
    service.getMainDataByStatus().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/mainData/statusType');
    expect(req[0].request.method).toBe("GET");
  });

  it('should provides the rearange type data', () => {
    service.getMainDataByRearrange().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/mainData/rearrangeReason');
    expect(req[0].request.method).toBe("GET");
  });

  it('should get auto FM data', () => {
    let tourId = '8718637';
    service.getautoFmData(tourId).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/autoFmData/' + tourId);
    expect(req[0].request.method).toBe("GET");
  });

  it('should put auto FM data', () => {
    let tourId = '8718637';
    service.putautoFmData(tourId).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/autoFmData/toggleAutoFm/');
    expect(req[0].request.method).toBe("PUT");
  });

  it('should get max Tours data', () => {
    let tourId = '8718637';
    service.getmaxTours().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/MaxTourNumber/maxTours');
    expect(req[0].request.method).toBe("GET");
  });

  it('should get Refresh Interval data', () => {
    let tourId = '8718637';
    service.getRefreshInterval().subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/refreshingTimeInterval/timeInterval');
    expect(req[0].request.method).toBe("GET");
  });


  it('should get AutoFm Status data by id', () => {
    let tourId = '8718637';
    service.getAutoFmStatus(tourId).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/autoFmData/getAutoFmStatus/' + tourId);
    expect(req[0].request.method).toBe("GET");
  });


  it('should get NC data', () => {
    let tourId = '8718637';
    service.getNcValue(tourId).subscribe((data) => {
      expect(data).toBeDefined();
    });
    const req = httpMock.match(service.env.baseUrl + '/getNc/' + tourId);
    expect(req[0].request.method).toBe("GET");
  });



});
