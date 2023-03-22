import { Component, OnInit } from '@angular/core';
import { Swipe } from './../../../assets/libraries/swipe';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { apiService } from './../../_services/api.service';
import { RingingModel, TourShipmentModel, TypeResponse } from 'src/app/_services/api';
import { Functions } from './../../Global/functions';
import { Subscription } from 'rxjs';
import tours from 'src/constants/tours';
import tourdetails from '../../../constants/tourdetail';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

var $ = require("jquery");

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss'],
  providers: [Swipe]
})
export class TourDetailComponent implements OnInit {
  tourDetails: any = {
    cashReturn: 0,
    cashReturnStatus: "",
    driverName: null,
    driverRegistration: false,
    driverRegistrationStatus: "",
    loadingCountCurrent: 0,
    loadingCountCurrentColl: 0,
    loadingCountCurrentPal: 0,
    loadingCountCurrentPercent: 0,
    loadingCountTotal: "",
    loadingStatus: "",
    presortCountCurrent: 0,
    presortCountCurrentPercent: 0,
    presortCountTotal: "",
    presortStatus: "",
    rearrangeCount: 0,
    rearrangeTours: [],
    rearrangerStatus: "",
    requestDriverSupporter: null,
    requestDriverSupporterStatus: null,
    sollCollanzahl: 28,
    sollPalettenanzahl: 0,
    temperatur: [{
      currentDegreeVehicle: null,
      degreeeStatus: "",
    }],
    tourId: 0,
    tourNr: "",
    tourPlaceTime: "",
    tourPlaceTimeInMinute: null,
    tourStartTime: "",
    tourStartTimeInMinute: null,
    tourStatus: "",
    tourStatusSort: 1,
    ringingPresort: "",
    ringingFahrer: "",
    ringing: RingingModel,
  };

  // Swipe Logic
  flag: any = 'No method';
  tourarray: any = [];
  modalRef: BsModalRef;
  fmmodalRef: BsModalRef;
  scanHistory: any = {
    columns: ['Collibarcode', 'Scanevent', 'Zeitpunkt', 'Rutsche'],
    data: []
  }
  fmModalMessage: any = '';
  fmRow: any;
  subsVar: Subscription;
  temp: any;
  ellipsis: any = -1;
  langreferenz: any = '';
  apiActive: boolean = false;
  fmcountVar: any = 0;
  targetElement: Element;
  fbbActiveArray: Array<any> = []

  constructor(
    private Swipe: Swipe,
    public router: Router,
    private modalService: BsModalService,
    private service: apiService,
    private functions: Functions,
    private toastr: ToastrService
  ) {
    this.subsVar = this.functions.snackbaremitter.subscribe((key) => {
      if (key == 'TourDetails') {
        this.arrowClick(-1);
        this.onEllipsis(-1);
        this.getTourData();
        this.toastr.clear();

      }
    })
  }

  ngOnInit() {
    this.tourDetails = this.functions.getTourDetails();
    this.getTourData();
  }

  bracodeMethod(item, template) {
    this.flag = "bracodeMethod of " + item.name;
    this.service.getScanHistorybyBarcode(item.colliBarcode).subscribe(Response => {
      this.scanHistory.data = [];
      for (var i = 0; i < Response.length; i++) {
        this.scanHistory.data.push([Response[i].colliBarcode, Response[i].scanEvent, Response[i].scanDateTime, Response[i].rutsche]);
      }

      this.modalRef = this.modalService.show(template, {
        class: 'modal-dialog-centered scanHistoryModal',
        backdrop: 'static',
        keyboard: false
      });

    });

  }

  searchMethod(item) {
    this.flag = "searchMethod of " + item.name;
    this.service.getSearchOrderbyId(item.colliBarcode).subscribe((response: TypeResponse) => {
      if (response.code == '200') {
        if (response && response.text)
          this.functions.showSnackBar(response.text, 0, 'TourDetails');
      }
    });
  }

  fmMethod(item, template) {
    let insertVar = item.colliBarcode + item.sendungId;
    if(this.fbbActiveArray.indexOf(insertVar) === -1){
      this.fbbActiveArray.push(insertVar);
    }
    this.fmRow = item;
    this.flag = "fmMethod of " + item.name;
    this.apiActive = true;

    this.service.getfalseReport(item.tourNr, item.colliBarcode, true).subscribe((response: TypeResponse) => {
      if (response.code == '300') {
        this.fmModalMessage = response.text;
        this.fmmodalRef = this.modalService.show(template, {
          class: 'modal-dialog-centered fmPopup',
          backdrop: 'static',
          keyboard: false
        });
      }
      if (response.code == '200') {

        this.getTourData();
        this.functions.showSnackBar(response.text, 3000, 'TourDetails');

      }
      if (response.code == '400') {
        this.functions.showErrorSnackBar(response.text, 3000, 'TourDetails');
        let insertVar = item.colliBarcode + item.sendungId;
        if(this.fbbActiveArray.indexOf(insertVar) !== -1){
          this.fbbActiveArray.splice(this.fbbActiveArray.indexOf(insertVar),1);
        }
      }

    });



  }

  fmConfirm() {
    this.apiActive = true;

    this.service.getfalseReport(this.fmRow.tourNr, this.fmRow.colliBarcode, false).subscribe((response: TypeResponse) => {
      if (response.code == '200') {
        this.getTourData();
        this.fmmodalRef.hide();

        this.functions.showSnackBar(response.text, 3000, 'TourDetails');
      }
      if (response.code == '400') {
        this.functions.showErrorSnackBar(response.text, 3000, 'TourDetails');
      }

    });
  }

  fmCancel() {
    this.fmmodalRef.hide();
  }

  shipmentDetails(item) {
    this.functions.showLoader();
    let _this = this;
    // setTimeout(function () {
      _this.flag = "shipmentDetails of " + item.name;
      item.collectionRedirect = false;
      _this.functions.setShipmentDetail(item, true);
      _this.router.navigate(['sendungslib']);
    // }, 500);
  }

  getTourData() {
    this.service.getTourSelect(this.tourDetails).subscribe((response: TourShipmentModel[]) => {
      this.tourarray = response;

      this.fmcountVar = 0;
      let tempFMActive = [];
      for (var i = 0; i < response.length; i++) {
        if (response[i].showFM){
          this.fmcountVar++
        }
        let compareVar = response[i].colliBarcode + response[i].sendungId;
        if(this.fbbActiveArray.includes(compareVar)){
          tempFMActive.push(compareVar);
        }
      }
      this.fbbActiveArray = tempFMActive;
      this.ellipsis = -1;
      // setTimeout(() => {
        this.Swipe.listSwipe({ itemActionWidth: '195' }, $('#swipeableContainer'));
      // }, 100);
      this.arrowClick(-1);
      this.onEllipsis(-1);
      this.functions.hideLoader();
      this.apiActive = false;
    })

  }

  ngOnDestroy(): void {
    if (this.subsVar) {
      this.subsVar.unsubscribe()
    }
  }

  iconClick(item) {
    //Perform action based on icon logic.
  }

  arrowClick(val) {
    this.temp = val;
  }

  onSwipe(val, event) {
    this.temp = val;
  }

  onEllipsis(val) {
    this.ellipsis = val;

  }

  myRefreshEvent(event: Subject<any>, message: string) {
    // setTimeout(() => {
      event.next();
    // }, 3000);
  }

  test(value){
    let flag = false;
    let concatVar = value.colliBarcode + value.sendungId;
    flag = this.fbbActiveArray.includes(concatVar);
    return flag;


  }



}
