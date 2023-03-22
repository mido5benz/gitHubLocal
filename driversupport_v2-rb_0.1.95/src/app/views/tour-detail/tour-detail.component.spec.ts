import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHeaderComponent, AppHeaderModule } from '@coreui/angular';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { StaticTableComponent } from 'src/app/shared/static-table/static-table.component';
import { apiService } from 'src/app/_services/api.service';
import { TourCardHeaderComponent } from './tour-card-header/tour-card-header.component';

import { TourDetailComponent } from './tour-detail.component';

fdescribe('TourDetailComponent', () => {
  let component: TourDetailComponent;
  let fixture: ComponentFixture<TourDetailComponent>;
  let data = {
    cashReturn: 0,
    cashReturnStatus: "rgb(218, 218, 218)",
    driverName: null,
    driverRegistration: false,
    driverRegistrationStatus: "rgb(249, 66, 12)",
    loadingCountCurrent: 0,
    loadingCountCurrentColl: 0,
    loadingCountCurrentPal: 0,
    loadingCountCurrentPercent: 0,
    loadingCountTotal: "0 + 28",
    loadingStatus: "rgb(249, 66, 12)",
    presortCountCurrent: 0,
    presortCountCurrentPercent: 0,
    presortCountTotal: "0 + 28",
    presortStatus: "rgb(249, 66, 12)",
    rearrangeCount: 0,
    rearrangeTours: [],
    rearrangerStatus: "rgb(218, 218, 218)",
    requestDriverSupporter: null,
    requestDriverSupporterStatus: null,
    sollCollanzahl: 28,
    sollPalettenanzahl: 0,
    temperatur: [{
      currentDegreeVehicle: null,
      degreeeStatus: "rgb(218, 218, 218)",
    },
    {
      currentDegreeVehicle: null,
      degreeeStatus: "rgb(218, 218, 218)",
    }],
    tourId: 99000000000556,
    tourNr: "2005",
    tourPlaceTime: "09:00",
    tourPlaceTimeInMinute: null,
    tourStartTime: "18:30",
    tourStartTimeInMinute: null,
    tourStatus: "rgb(249, 66, 12)",
    tourStatusSort: 1
  };
  window.sessionStorage.setItem('tourDetails', JSON.stringify(data));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourDetailComponent, TourCardHeaderComponent, StaticTableComponent],
      imports: [
        AppHeaderModule,
        CommonModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        FormsModule
      ],
      providers: [apiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailComponent);
    component = fixture.componentInstance;
    component.tourDetails = data;
    fixture.autoDetectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should user click on the shipmentDetails(item) then should navigate to the sendungsdetail', async(() => {
    spyOn(component, 'shipmentDetails');
    let shipmentDetails = fixture.debugElement.nativeElement.querySelector('.row-body-id');
    component.shipmentDetails('item');
    fixture.whenStable().then(() => {
      expect(component.shipmentDetails).toHaveBeenCalled();
    });
  }));

  it('should user click on the fmMethod(item) button then show the fmMethod of item name', async(() => {
    spyOn(component, 'fmMethod').and.callThrough();
    let temp = { name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'fas fa-dolly', iconText: '2-300' };
    let template = {
      code: 300,
      text: null,
      serverzeit: null,
    }
    component.fmMethod(temp, template);
    fixture.whenStable().then(() => {
      expect(component.fmMethod).toHaveBeenCalled();
    });
  }));

  it('should user click on the searchMethod(item) button then show the searchMethod of item name', async(() => {
    spyOn(component, 'searchMethod').and.callThrough();
    let temp = { colliBarcode: "212176043396600014907743" }
    //{ name: '12345-123456-000001-49-69469', address: 'Löwen Apotheke, Bahnhofstraße 101, 69469 Weinheim', icon: 'far fa-money-bill-alt', iconText: '2-300' };
    component.searchMethod(temp);
    fixture.whenStable().then(() => {
      expect(component.searchMethod).toHaveBeenCalled();
    });
  }));

  it('should user click on the bracodeMethod(item,scanHistoryTemplate) button then show the bracodeMethod of item,scanHistoryTemplate name', async(() => {
    // let barcode = '12345-123456-000001-49-69469';
    let temp = { name: '212176043396600014907743', address: 'Helmholtz-Institut Jena Helmholtz-Institut Jena / Fröbelstieg 3 / 07743 Jena', icon: 'far fa-money-bill-alt', iconText: '2-300' };
    spyOn(component, 'bracodeMethod');
    let temp1 = {
      colliBarcode: "212176043396600014907743",
      scanDateTime: "2020-10-09 15:08:41.0",
      scanEvent: "2S",
      tourNr: "2005"
    }
    component.bracodeMethod(temp, temp1);
    fixture.whenStable().then(() => {
      expect(component.bracodeMethod).toHaveBeenCalled();
    });
  }));

});
