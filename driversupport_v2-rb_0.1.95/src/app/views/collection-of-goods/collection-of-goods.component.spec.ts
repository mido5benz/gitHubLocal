// import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
//
// import { CollectionOfGoodsComponent } from './collection-of-goods.component';
// import { CollapseModule } from 'ngx-bootstrap/collapse';
// import { ShipmentDetailsSharedComponent } from '../../views/shipment-details-shared/shipment-details-shared.component';
// import { FormsModule } from '@angular/forms';
// import { StaticTableComponent } from '../../shared/static-table/static-table.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ModalModule } from 'ngx-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { apiService } from 'src/app/_services/api.service';
// import { By } from '@angular/platform-browser';
//
//
// fdescribe('CollectionOfGoodsComponent', () => {
//   let component: CollectionOfGoodsComponent;
//   let fixture: ComponentFixture<CollectionOfGoodsComponent>;
//   let injector: TestBed;
//   let service: apiService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(async(() => {
//
//     TestBed.configureTestingModule({
//       declarations: [CollectionOfGoodsComponent,
//         ShipmentDetailsSharedComponent,
//         StaticTableComponent],
//       imports: [
//         CollapseModule,
//         FormsModule,
//         RouterTestingModule.withRoutes([]),
//         ModalModule.forRoot(),
//         ToastrModule.forRoot(),
//         HttpClientTestingModule
//       ],
//       providers: [apiService]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CollectionOfGoodsComponent);
//     component = fixture.componentInstance;
//     injector = getTestBed();
//     service = injector.get(apiService);
//     httpMock = injector.get(HttpTestingController);
//     fixture.detectChanges();
//   });
//
//
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should User click or default active Verbringpflicht tab', () => {
//     service.getCollectionData('VERBRINGPFLICHT')
//       .subscribe((data) => {
//         expect(data.length).toBeDefined();
//       });
//     let tab = {
//       code:'VERBRINGPFLICHT',
//       bezeichung:'VERBRINGPFLICHT'
//     }
//     component.handleTabChange(tab);
//     expect(component.collection.model.type).toEqual(tab.code);
//   });
//
//
//   it('should User click second tab ZUSTELLHINDERNIS tab', () => {
//     service.getCollectionData('ZUSTELLHINDERNIS')
//       .subscribe((data) => {
//         expect(data.length).toBeDefined();
//       });
//       const req = httpMock.match(service.env.baseUrl + '/collectionData/ZUSTELLHINDERNIS');
//       expect(req[0].request.method).toBe("GET");
//   });
//
//   it('should User click third tab STOERUNG_BELADUNG tab', () => {
//     service.getCollectionData('STOERUNG_BELADUNG')
//       .subscribe((data) => {
//         expect(data.length).toBeDefined();
//       });
//       const req = httpMock.match(service.env.baseUrl + '/collectionData/STOERUNG_BELADUNG');
//       expect(req[0].request.method).toBe("GET");
//   });
//
//   it('should User click fourth tab TEMPERATURPRUEFUNG tab', () => {
//     service.getCollectionData('TEMPERATURPRUEFUNG')
//       .subscribe((data) => {
//         expect(data.length).toBeDefined();
//       });
//       let tab = {
//         code:'TEMPERATURPRUEFUNG',
//         bezeichung:'TEMPERATURPRUEFUNG'
//       }
//       const req = httpMock.match(service.env.baseUrl + '/collectionData/TEMPERATURPRUEFUNG');
//       expect(req[0].request.method).toBe("GET");
//   });
//
//   it('should User click fifth tab SONSTIGE tab', () => {
//     service.getCollectionData('SONSTIGE')
//       .subscribe((data) => {
//         expect(data.length).toBeDefined();
//       });
//       let tab = {
//         code:'SONSTIGE',
//         bezeichung:'SONSTIGE'
//       }
//       const req = httpMock.match(service.env.baseUrl + '/collectionData/SONSTIGE');
//       expect(req[0].request.method).toBe("GET");
//   });
//
//   // it('should user click on the searchMethod(item) button then show the searchMethod of item name', async(() => {
//   //   spyOn(component, 'searchMethod').and.callThrough();
//   //   let item = { name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'far fa-money-bill-alt', iconText: '2-300' };
//   //   component.searchMethod(item);
//   //   return fixture.whenStable().then(() => {
//   //     expect(component.searchMethod).toHaveBeenCalled();
//   //   });
//   // }));
//
//   it('should check if the details section are shown after Entering Barcode into searchbar ', () => {
//     component.searchText = '12345-123456-000001-49-69469';
//     expect(fixture.debugElement.query(By.css('.SharedSections'))).toBeDefined();
//
//   });
//
//   it('should check if the shipmentEvents section have the data sets ', () => {
//     expect(component.shipmentEvents).toBeDefined();
//   });
//
//   it('should check if the packageEvents section have the data sets ', () => {
//     expect(component.packageEvents).toBeDefined();
//   });
//
//   it('should check if the dispoEvents section have the data sets ', () => {
//     expect(component.dispoEvents).toBeDefined();
//   });
//
//
//   it('should user click on the fmMethod(item) button then show the fmMethod of item name', async(() => {
//     spyOn(component, 'fmMethod').and.callThrough();
//     let item = { name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'fas fa-dolly', iconText: '2-300' };
//     component.fmMethod(item);
//     return fixture.whenStable().then(() => {
//       expect(component.fmMethod).toHaveBeenCalled();
//     });
//   }));
//
//   it('should user click on the bracodeMethod(item) button then show the bracodeMethod of item', async(() => {
//     let item = { name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'far fa-money-bill-alt', iconText: '2-300' };
//     spyOn(component, 'bracodeMethod');
//     component.bracodeMethod(item);
//     return fixture.whenStable().then(() => {
//       expect(component.bracodeMethod).toHaveBeenCalled();
//     });
//   }));
//
//   // it('should user click on the KorrekturMethod(item) button then show the KorrekturMethod of item', () => {
//   //   let template = { name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'far fa-money-bill-alt', iconText: '2-300' };
//   //   let message = 'Korrektur modal saved message'
//   //   spyOn(component, 'KorrekturMethod');
//   //   component.KorrekturMethod(template, message);
//   //   fixture.whenStable().then(() => {
//   //     expect(component.KorrekturMethod).toHaveBeenCalled();
//   //   });
//   // });
//
//   it('should user click on the KorrekturMethod(item) button then show the KorrekturMethod modal', () => {
//     let data = {
//       packstueckId: 123819641,
//       icon: '',
//       tournr: 2100,
//       value: 'Termin',
//       colliBarcode: 12345123450000014969469,
//       sendungId: 123456897,
//       recipientName: 'Musterman Drugs',
//       recipientAdress: 'Mainstreet 101, 90900 Mustertown',
//       eventColor: 'red'
//     }
//     service.putcollectcorrection(data)
//       .subscribe((data) => {
//         expect(data).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/collect/correction');
//     expect(req[0].request.method).toBe("PUT");
//   });
//
//   it('should user click on the bruchMethod(item) button then show the bruchMethod modal', () => {
//     let template = { name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'far fa-money-bill-alt', iconText: '2-300' };
//     let message = 'bruch modal saved message'
//     spyOn(component, 'bruchMethod');
//     component.bruchMethod(template, message);
//     return fixture.whenStable().then(() => {
//       expect(component.bruchMethod).toHaveBeenCalled();
//     });
//   });
//
//   it('should user click on the Method9999(item,template) button then show the Method9999 modal', () => {
//     let template = { name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'far fa-money-bill-alt', iconText: '2-300' };
//     let message = 'Method9999 modal saved message'
//     spyOn(component, 'Method9999');
//     component.Method9999(template, message);
//     return fixture.whenStable().then(() => {
//       expect(component.Method9999).toHaveBeenCalled();
//     });
//   });
//
//   it('should user click on the weMethod(item) button then show the weMethod popup', () => {
//     let data = {
//       packstueckId: 123819641,
//       icon: '',
//       tournr: 2100,
//       value: 'Termin',
//       colliBarcode: 12345123450000014969469,
//       sendungId: 123456897,
//       recipientName: 'Musterman Drugs',
//       recipientAdress: 'Mainstreet 101, 90900 Mustertown',
//       eventColor: 'red'
//     }
//     service.getCollectWE(data)
//       .subscribe((data) => {
//         expect(data).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/collectWE');
//     expect(req[0].request.method).toBe("PUT");
//   });
//
//   it('should user click on the vlMethod(item) button then show the collectVL popup', () => {
//     let data = {
//       packstueckId: 123819641,
//       icon: '',
//       tournr: 2100,
//       value: 'Termin',
//       colliBarcode: 12345123450000014969469,
//       sendungId: 123456897,
//       recipientName: 'Musterman Drugs',
//       recipientAdress: 'Mainstreet 101, 90900 Mustertown',
//       eventColor: 'red'
//     }
//     service.getcollectVL(data)
//       .subscribe((data) => {
//         expect(data).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/collectVL');
//     expect(req[0].request.method).toBe("PUT");
//   });
//
//   it('should save korrekturModalSave', () => {
//     let data = {
//       sendungId: 0,
//       amountcolli: 0,
//       amountpaletten: 0,
//       amountcollimodified: 0,
//       amountpalettenmodified: 0
//     }
//     service.putcollectcorrectionsave(data)
//       .subscribe((data) => {
//         expect(data).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/collect/correction/save');
//     expect(req[0].request.method).toBe("PUT");
//
//   });
//
//   it('should save rescheduleModalSave', () => {
//     let data;
//     let umdispoGrundId = {
//       packstueckId: 123819641,
//       icon: "dolly",
//       tournr: 2100,
//       value: "Termin",
//       colliBarcode: "12345123450000014969469",
//       sendungId: 123456897,
//       recipientName: "Musterman Drugs",
//       recipientAdress: "Mainstreet 101, 90900 Mustertown",
//       eventColor: "red"
//     };
//     service.getCollectbyUnknown(umdispoGrundId, data)
//       .subscribe((data) => {
//         expect(data).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/collect/UnknownReason/' + umdispoGrundId);
//     expect(req[0].request.method).toBe("PUT");
//   });
//
//   it('should user click on the bruchModalNewPhoto() function then calling the bruchModalNewPhoto()', () => {
//     spyOn(component, 'bruchModalNewPhoto');
//     component.bruchModalNewPhoto();
//     return fixture.whenStable().then(() => {
//       expect(component.bruchModalNewPhoto).toHaveBeenCalled();
//     });
//   });
//
//   it('should bruchModalConfirm', () => {
//     let data = {
//       packstueckId: 123819641,
//       icon: "dolly",
//       tournr: "2100",
//       value: "Termin",
//       colliBarcode: "12345123450000014969469",
//       sendungId: -89437902,
//       recipientName: "Musterman Drugs",
//       recipientAdress: "Mainstreet 101, 90900 Mustertown",
//       eventColor: "red",
//       imageData: "url"
//     }
//     service.getCollectbyDone(data)
//       .subscribe((data) => {
//         expect(data).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/collect/Photo/done');
//     expect(req[0].request.method).toBe("PUT");
//   });
//
//   it('should call the function initialize getMainDataforRearrange()', () => {
//     service.getMainDataByRearrange()
//       .subscribe((data) => {
//         expect(component.getMainDataforRearrange).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/mainData/rearrangeReason');
//     expect(req[0].request.method).toBe("GET");
//   });
//
//
//   it('should call the function initialize getInitialData()', () => {
//     service.getintialCollectView()
//       .subscribe((data) => {
//         expect(component.getInitialData).toBeDefined();
//       });
//     const req = httpMock.match(service.env.baseUrl + '/intialCollectView');
//     expect(req[0].request.method).toBe("GET");
//   });
//
//   it('should user enter text and enter key on search funnction ', () => {
//     expect(component.onSearch).toBeDefined();
//   });
//
//   it('should user click another tab then call the function refetchData(tab)', () => {
//
//     expect(component.refetchData).toBeDefined();
//   });
//
//   it('should user new phone uploaded then call the function selectFile()', () => {
//
//     expect(component.selectFile).toBeDefined();
//   });
//
//   it('should trigger the search method ', () => {
//     spyOn(component, 'onSearch')
//     let template = fixture.debugElement.query(By.css('#collectionShipmentCorrectionPopup'));
//     component.onSearch('Text',true,template)
//     expect(component.onSearch).toHaveBeenCalled();
//   });
//
//   it('should check the zustellhindernis container for swipe library ', () => {
//     let template = fixture.debugElement.query(By.css('#swipeableContainer-zustellhindernis'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the verbringpflicht container for swipe library ', () => {
//     let template = fixture.debugElement.query(By.css('#swipeableContainer-verbringpflicht'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the Störung Beladung container for swipe library ', () => {
//     let template = fixture.debugElement.query(By.css('#swipeableContainer-zustellhindernis'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the sonstiges container for swipe library ', () => {
//     let template = fixture.debugElement.query(By.css('#swipeableContainer-sonstiges'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the temperaturprüfung container for swipe library ', () => {
//     let template = fixture.debugElement.query(By.css('#swipeableContainer-temperaturprüfung'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the collectiongoodsDashboard container ', () => {
//     let template = fixture.debugElement.query(By.css('#collectiongoodsDashboard'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the nav-tabs ', () => {
//     let template = fixture.debugElement.query(By.css('.nav-tabs'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the collectiongoodsReceipt ', () => {
//     let template = fixture.debugElement.query(By.css('#collectiongoodsReceipt'));
//     expect(template).toBeDefined();
//   });
//
//   it('should check the accordianBody ', () => {
//     let template = fixture.debugElement.query(By.css('#accordianBody'));
//     expect(template).toBeDefined();
//   });
//
//
//   it('should check the popheader ', () => {
//     let template = fixture.debugElement.query(By.css('.popheader'));
//     expect(template).toBeDefined();
//   });
//
//
// });
