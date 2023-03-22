import { TourSektorName } from "./../../../constants/tours";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Functions } from "src/app/Global/functions";
import { TourStatusModel, TypeResponse } from "src/app/_services/api";
import { apiService } from "src/app/_services/api.service";
import { ColorUtil } from "src/utils/color-utils";

@Component({
  selector: "app-tour-card",
  templateUrl: "./tour-card.component.html",
  styleUrls: ["./tour-card.component.scss"],
})
export class TourCardComponent implements OnInit, OnChanges {
  @Input() allTours: TourStatusModel[] = [];
  @Input() tourSektor: number;
  tourSektorNames = [
    TourSektorName.RED,
    TourSektorName.YELLOW,
    TourSektorName.GREEN,
    TourSektorName.GRAY,
  ];
  tourSektorColor = ["dotred", "dotyellow", "dotgreen", "dotgray"];

  tours: TourStatusModel[] = [];

  isAllOpen = true;
  grayColor = "rgb(218, 218, 218)";
  fmModalMessage: any = "";
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    public util: ColorUtil,
    private service: apiService,
    private modalService: BsModalService,
    private functions: Functions
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}
  routeToTourDetail(tour) {
    this.functions.showLoader();
    let _this = this;
    _this.functions.tourDetailOpen(tour);
    _this.router.navigate(["/dashboard/tourdetail"]);
  }

  phoneMethodFahrer(index: number, template) {
    this.allTours[index].ringing.ringingConfirm = true;
    this.service
      .setconfirmRingFahrer(this.allTours[index].ringing)
      .subscribe((response: TypeResponse) => {
        if (response.code == "200") {
          this.allTours[index].ringingFahrer = this.grayColor;
          this.fmModalMessage = response.text;
          this.modalRef = this.modalService.show(template, {
            class: "modal-dialog-centered tsPopup valid",
            backdrop: "static",
            keyboard: false,
          });
        }
        if (response.code == "400") {
          this.fmModalMessage = response.text;
          this.modalRef = this.modalService.show(template, {
            class: "modal-dialog-centered tsPopup invalid",
            backdrop: "static",
            keyboard: false,
          });
        }
      });
  }

  phoneMethodPresort(index: number, template) {
    this.allTours[index].ringing.ringingConfirm = false;

    this.service
      .setconfirmRingPresort(this.allTours[index].ringing)
      .subscribe((response: TypeResponse) => {
        if (response.code == "200") {
          this.allTours[index].ringingPresort = this.grayColor;

          this.fmModalMessage = response.text;
          this.modalRef = this.modalService.show(template, {
            class: "modal-dialog-centered tsPopup valid",
            backdrop: "static",
            keyboard: false,
          });
        }
        if (response.code == "400") {
          this.fmModalMessage = response.text;
          this.modalRef = this.modalService.show(template, {
            class: "modal-dialog-centered tsPopup invalid",
            backdrop: "static",
            keyboard: false,
          });
        }
      });
  }
}
