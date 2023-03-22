import { BsModalRef } from 'ngx-bootstrap/modal';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {UmdispoGrundModel, VereinnahmungModel} from 'src/app/_services/api';
import {apiService} from "../../../_services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Functions} from "../../../Global/functions";
import { SendungsDetailsLibService } from '../../lib/service/sendungs-details-lib.service';


var $ = require("jquery");

@Component({
  selector: 'app-umdispo-modal',
  templateUrl: './umdispo-modal.component.html',
  styleUrls: ['./umdispo-modal.component.scss']
})
export class UmdispoModalComponent implements OnInit {

  reArrangeList: any = [];

  @Input() searchText;
  @Output() clearSearchTextUmdispo = new EventEmitter();

  public umdisTourNo: any = '';
  public umdispoObject: VereinnahmungModel;
  public umdispoReasonObject: string = '';
  public umdispoModal: BsModalRef;
  public sendungId: number;
  public shipmentInfo = [];
  public dienste;

  constructor(public modalService: BsModalService,
              private service: apiService,
              private router: Router,
              private functions: Functions,
              private route: ActivatedRoute,
              private sendungsDetailsLibService: SendungsDetailsLibService) {
  }

  ngOnInit(): void {

    this.service.getMainDataByRearrange().subscribe((resp: UmdispoGrundModel[]) => {
      this.reArrangeList = resp;
      for (var i = 0; i < resp.length; i++) {
        this.reArrangeList[i].active = false;
      }
    });



    this.service.getCollectUnknownReasonByCollibarcode(this.searchText).subscribe((resp) => {
      this.umdispoObject = resp;
      this.umdisTourNo = '';
    })

    // neu imp 13.07.2021
    this.route.queryParams.subscribe((params) => {
      if(params && (Object.keys(params).length === 0)) {
      }else {
        this.umdispoModal = params.umdispoModal;
       // this.getShipmentInfoForModal(this.searchText);
        // this.infobox = true;
      }
    })
  }

    // neu imp 13.07.2021
  getShipmentInfoForModal(searchtext) {
    this.sendungsDetailsLibService.getShipmentDetailsForModal(searchtext).subscribe((result) => {
      this.sendungId = result?.sendungId;
      this.shipmentInfo.push(result);
      this.sendungsDetailsLibService.getSendungskorrekturDienste().subscribe((allowedDienste) => {
        this.dienste = allowedDienste;
      })
    });
  }

  acceptNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  umdispoSave() {
    $("html").addClass("loaderActive")
    $('.UMDispoSelectionLoader').fadeIn();
    let data = this.umdispoObject;
    data.tournr = this.umdisTourNo;
    this.service.getCollectbyUnknown(this.umdispoReasonObject, data).subscribe(
      resp => {
        if (resp.code == '200') {
          this.functions.showSnackBar(resp.text, 3000, 'Collection');
        }
        if (resp.code == '400') {
          this.functions.showErrorSnackBar(resp.text, 3000, 'Collection');
        }
        let _this = this;
        // setTimeout(function () {
        $("html").removeClass("loaderActive");
        $('.UMDispoSelectionLoader').fadeOut();
        // }, 1000);
      },
      err => {
        // if(err.status == 500){
        this.functions.showErrorSnackBar('Umdispo nicht erfolgreich!', 3000, 'Collection');
        let _this = this;
        // setTimeout(function () {
        $("html").removeClass("loaderActive");
        $('.UMDispoSelectionLoader').fadeOut();
        // }, 1000);
        // }
      }
    )
    this.clearSearchTextUmdispo.emit();
    this.umdispoModal.hide();
  }

  redirectToShipment() {
    let data = {
      colliBarcode: this.searchText,
      sendungId: this.searchText
    };
    this.functions.setShipmentDetail(data);
    this.router.navigate(['/sendungslib']);
    this.umdispoModal.hide();

  }
  clearUmdispo() {
    this.umdisTourNo = '';
    // this.reArrangeList = [];
    this.umdispoModal.hide();
  }

  umdispoMethod(value) {
    this.umdispoModal=this.modalService.show(value, {
      class: 'modal-dialog-centered shipmentCorrection',
      backdrop: 'static',
      keyboard: false
    });
  }
}
