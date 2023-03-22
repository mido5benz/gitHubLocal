import { TourType } from "./../../../constants/tours";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ColorUtil } from "../../../utils/color-utils";
import { apiService } from "./../../_services/api.service";
import { TourStatusModel } from "src/app/_services/api";
import { Functions } from "./../../Global/functions";
import { Subscription } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [ColorUtil],
})
export class DashboardComponent implements OnInit {
  grayColor = "rgb(218, 218, 218)";
  tours: TourStatusModel[] = [];
  loginName: any;
  subsVar: Subscription;
  isAllOpen = true;
  intervalAmount: any = 20000;
  intervalRef: any;
  apiSubscribtion: Subscription;
  fmModalMessage: any = "";
  fmmodalRef: BsModalRef;
  modalRef: BsModalRef;
  tourTypes = [TourType.RED, TourType.YELLOW, TourType.GREEN, TourType.GRAY];

  constructor(
    private router: Router,
    public util: ColorUtil,
    private service: apiService,
    private modalService: BsModalService,
    private functions: Functions
  ) {
    this.subsVar = this.functions.snackbaremitter.subscribe((key) => {
      if (key == "Dashboard") {
      }
    });
  }

  ngOnInit() {
    // this.tours = tours;
    this.loginName = window.sessionStorage.getItem("loginName");
    this.getDashboardData(this.loginName);
    this.functions.emitDashboardRed(true);
    window.sessionStorage.removeItem("tourNo");
    this.functions.resetTourDetails();
    this.functions.removeRedirectFlag();
  }

  routeToTourDetail(tour) {
    this.functions.showLoader();
    let _this = this;
    _this.functions.tourDetailOpen(tour);
    _this.router.navigate(["/dashboard/tourdetail"]);
  }

  getCards(tours: TourStatusModel[], type: TourType): TourStatusModel[] {
    return tours?.filter((tour) => tour.tourStatusSort == type);
  }

  /**
   * get Alle Touren, die der User ausgewählt hat.
   * @param loginName
   */
  getDashboardData(loginName) {
    this.apiSubscribtion = this.service.getTourDashboard(loginName).subscribe(
      (response: TourStatusModel[]) => {
        this.tours = response;

        for (let k = 0; k < this.tours.length; k++) {
          this.tours[k].countsarr = this.onlyUnique(
            this.tours[k].rearrangeTours
          );
        }

        this.functions.hideLoader();
        this.intervalAmount = window.sessionStorage.getItem("intervalAmount")
          ? JSON.parse(window.sessionStorage.getItem("intervalAmount"))
          : 5000;
        this.intervalRef = setTimeout(() => {
          this.getDashboardData(this.loginName);
        }, this.intervalAmount * (response.length ? response.length : 1));
      },
      (error) => {
        this.functions.hideLoader();
      }
    );
  }

  /**
   * return ein Formatierte Array {TourNummer-anzahlverbringpflicht }
   * countsarr (verbringpflichten) list wird in html gezeigt.
   * @param verbringpflichten
   * @returns
   */
  onlyUnique(verbringpflichten: string[]) {
    let counts = {};
    for (let i = 0; i < verbringpflichten.length; i++) {
      counts[verbringpflichten[i]] = 1 + (counts[verbringpflichten[i]] || 0);
    }

    let countsarr = [];
    let tourNummer = Object.keys(counts);
    let anzahlverbringpflicht = Object.values(counts);
    for (let i = 0; i < tourNummer.length; i++) {
      countsarr.push({
        name: tourNummer[i],
        count: anzahlverbringpflicht[i],
      });
    }

    return countsarr;
  }

  ngOnDestroy(): void {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
    this.apiSubscribtion.unsubscribe();
    clearTimeout(this.intervalRef);
  }
}
