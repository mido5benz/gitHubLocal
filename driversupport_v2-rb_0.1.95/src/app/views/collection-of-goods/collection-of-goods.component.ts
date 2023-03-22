import { SpinnerService } from "./../spinner/spinner.service";
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Swipe } from "./../../../assets/libraries/collectionswipe";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

var $ = require("jquery");
import { ToastrService } from "ngx-toastr";
import { Functions } from "./../../Global/functions";
import { apiService } from "src/app/_services/api.service";
import {
  VereinnahmungModel,
  TypeResponse,
  CollectionTypeModel,
  UmdispoGrundModel,
  TypeSendung,
  TypeDienst,
} from "./../../_services/api";
import { Observable, Subject, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  ignoreElements,
  isEmpty,
} from "rxjs/operators";
import { Lightbox } from "ngx-lightbox";
import { DatePipe } from "@angular/common";

import {} from "src/app/_services/api";
import { NgxSpinnerService } from "ngx-spinner";
import { SendungsDetailsLibService } from "../lib/service/sendungs-details-lib.service";
import { Console } from "console";
import { TabContentComponent } from "./tab-content/tab-content.component";

@Component({
  selector: "app-collection-of-goods",
  templateUrl: "./collection-of-goods.component.html",
  styleUrls: ["./collection-of-goods.component.scss"],
  providers: [Swipe, DatePipe],
})
export class CollectionOfGoodsComponent implements OnInit {
  public infobox = false;
  public shipmentInfo = [];
  public dienste;
  public sendungId: number;
  public packstueckreferenz;

  fotoAnzahl: any;

  showIndicator = false;

  flag: any = "No method";
  vereinnahmungObjList: VereinnahmungModel [] = [];
  isCollapsed: boolean = true;

  collection: any = {
    loading: true,
    rows: [],
    model: { type: "VERBRINGPFLICHT", text: "Verbringpflicht" },
    colapsedID: null,
  };

  collectionTabs: any = [];

  reArrangeList: any = [];

  url: any = "assets/img/brand/container_truck.jpg";
  modelChanged: Subject<any> = new Subject<any>();
  searchText: any = "";
  subsVar: Subscription;
  VereinnahmungModalRef: BsModalRef;

  vereinnahmungtypList: any = [];

  numval: number;
  colliActive: boolean = true;
  reuseSearch: any = "";
  tab: any = {
    code: "VERBRINGPFLICHT",
    bezeichung: "Verbringpflicht",
  };

  @ViewChild("searchBar") searchBarField: ElementRef;
  @ViewChild("VereinnahmungModaltemplate")
  VereinnahmungModaltemplateField: ElementRef;
  @ViewChild("VereUmdispoModaltemplate")
  vereUmdispoModaltemplateField: ElementRef;
  @ViewChild("searchBarBruch") searchBarBruchField: ElementRef;

  @ViewChild(TabContentComponent, { static: false }) child: TabContentComponent;

  constructor(
    private Swipe: Swipe,
    private router: Router,
    private modalService: BsModalService,
    public toastr: ToastrService,
    private functions: Functions,
    private service: apiService,
    private _lightbox: Lightbox,
    private spinnerService: SpinnerService,
    private spinner: NgxSpinnerService,
    private sendungsDetailsLibService: SendungsDetailsLibService,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {
    this.modelChanged
      .pipe(debounceTime(1700), distinctUntilChanged())
      .subscribe((model) => {

        if (model.enterPressed) {
          this.packstueckreferenz = model.text;
          this.searchText = model.text;
          this.reuseSearch = model.text;

          if (this.searchText.length > 0) {
            this.getShipmentInfoForModal(this.searchText);
          }

          if (this.searchText.length > 0) {
            this.service.collectByColliBarcode(this.searchText).subscribe(
              (resp) => {

                if (resp.code == "200") {
                  this.functions.showSnackBar(resp.text, 3000, "Collection");


                  // TODO Das muss geprüft werden !!!!!

                  // this.tab.bezeichung = this.collection.model.text;
                  // this.tab.code = this.collection.model.type;

                  // this.refetchData(this.collection.model.type);
                  // this.child.callMe(this.tab);
                  this.child.handleTabChange(this.tab);
                  this.searchText = "";
                }
                if (resp.code == "300") {
                  this.infobox = true;

                 // this.VereinnahmungModal(this.VereinnahmungModaltemplateField);
                  this.refetchData(this.collection.model.type);
                }
                if (resp.code == "301") {

                  this.functions.showErrorSnackBar(resp.text, 0, "Collection");
                  this.searchText = "";
                }
                if (
                  this.vereinnahmungtypList &&
                  this.vereinnahmungtypList.length
                )
                  this.child.handleTabChange(this.tab);
              },
              (error) => {

                this.refetchData(this.collection.model.type);
              }
            );
          } else {

            this.functions.showErrorSnackBar(
              "Bitte geben Sie einen gültigen Packstückbarcode ein"
            );
          }
        }
      });

    this.subsVar = this.functions.snackbaremitter.subscribe((key) => {
      if (key == "Collection") {
        // this.refetchData(this.collection.model.type);
        this.searchBarField.nativeElement.focus();
        this.refetchData(this.collection.model.type);
      }
    });
  }

  // parentFunktion(data) {
  //   console.log("Hallo Son !!!!", data);
  // }

  changeInfoBox(event: any) {
    this.infobox = false;
    this.searchText = "";
    this.searchBarField.nativeElement.focus();
    this.cd.detectChanges();
  }

  /**
   * nach der scan des Barcodes in der Vereinnahmung wird Tab Object befüllt
   * damit das geöffnete Tab in Frontend offen bleibt nach der Update
   * @param $event
   */
  fillTabValuesToUpdate($event) {
    this.tab = $event;
    console.log("Message from child", this.tab.code);
    console.log("Message from child", this.tab.bezeichung);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {

      if (params && Object.keys(params).length === 0) {

      } else {
        this.searchText = params.searchText;
        this.getShipmentInfoForModal(this.searchText);
        this.infobox = true;

      this.functions.hideLoader();
      }
    });

    this.fotoAnzahl = window.sessionStorage.getItem("fotoAnzahl");


  }

  getShipmentInfoForModal(searchtext) {
    this.sendungsDetailsLibService
      .getShipmentDetailsForModal(searchtext)
      .subscribe((result) => {

        this.sendungId = result?.sendungId;
        this.shipmentInfo.push(result);
        this.sendungsDetailsLibService
          .getSendungskorrekturDienste()
          .subscribe((allowedDienste) => {
            this.dienste = allowedDienste;

          });
      });
  }

  bracodeMethod(item) {
    this.flag = "bracodeMethod of " + item.name;
  }

  searchMethod(item) {
    this.flag = "searchMethod of " + item.name;
  }

  fmMethod(item) {
    this.flag = "fmMethod of " + item.name;
  }

  handleCollapse(index, item) {
    if (this.collection.colapsedID == index) {
      this.collection.colapsedID = null;
    } else {
      // this.Shipmentinfofun(item.colliBarcode, index);
    }
  }

  getIconOfCollectionType(value) {
    let temp = "";
    switch (value) {
      case "VERBRINGPFLICHT":
        temp = "fa fa-dolly";
        // temp = "packTausch";
        break;
      case "ZUSTELLHINDERNIS":
        // temp = "fa fa-truck";
        temp = "";
        break;
      case "STOERUNG_BELADUNG":
        temp = "fa fa-exclamation-triangle";
        break;
      case "TEMPERATURPRUEFUNG":
        temp = "fa fa-thermometer-half";
        break;
      case "SONSTIGE":
        temp = "fa fa-question";
        break;
    }
    return temp;
  }

  onSearch(text: string, enterkey) {
    let object = {
      text: text.replace(/\s+/g, ""),
      enterPressed: enterkey ? true : false,
    };
    this.modelChanged.next(object);
  }

  refetchData(tab) {
    this.vereinnahmungObjList = [];
    this.service
      .getCollectionData(tab,true)
      .subscribe((response: VereinnahmungModel[]) => {
        this.collection.colapsedID = null;

        if (response && response.length > 0) {
          this.vereinnahmungObjList = response;
        } else {
          // for (var i = 0; i < 5; i++) {
          //   this.tourarray.push({ packstueckId: 123819641, icon: this.getIconOfCollectionType(this.collection.model.type), tournr: '2100', value: 'Termin', colliBarcode: '12345123450000014969469', sendungId: '123456897', recipientName: 'Musterman Drugs', recipientAdress: 'Mainstreet 101, 90900 Mustertown', eventColor: 'red' });
          // }
        }
        // this.getTabsCount(this.tabsCountServiceArray);
      });
  }

  ngOnDestroy(): void {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
  }

  VereinnahmungModal(value) {
    this.VereinnahmungModalRef = this.modalService.show(value, {
      class: "modal-dialog-centered shipmentCorrection",
      backdrop: "static",
      keyboard: false,
    });
  }

  // zum löschen
  findLargestDate(array) {
    let arrayValue = JSON.parse(JSON.stringify(array));

    let tempvalue = arrayValue.sort((a, b) => {
      let atemp = Number(
        a.ausliefertag.split(".")[2] +
          a.ausliefertag.split(".")[1] +
          a.ausliefertag.split(".")[0]
      );
      let btemp = Number(
        b.ausliefertag.split(".")[2] +
          b.ausliefertag.split(".")[1] +
          b.ausliefertag.split(".")[0]
      );
      return btemp - atemp;
    })[0];

    return tempvalue.tournr;
  }

  toggleColli(flag) {
    this.colliActive = flag;
  }

  closeVerinnahmungModal() {
    this.searchText = "";
    if (this.VereinnahmungModalRef) this.VereinnahmungModalRef.hide();
    this.searchBarField.nativeElement.focus();
  }

  putCorrectedValues(event: any) {
    if (event !== null) {
      this.infobox = false;
      let correctedForm = event;
      if (correctedForm.sendungId === null) {
        correctedForm.sendungId = this.sendungId;
      }
      this.sendungsDetailsLibService
        .sendCorrectedValues(correctedForm, this.sendungId)
        .subscribe((correctedValues) => {
          this.closeVerinnahmungModal();
        });
    }
  }

  OnfocusSearchText(event: any) {
    this.searchBarField.nativeElement.focus();
    // this.searchText = "";
    // console.log("tab aktuell ", this.tab);
  }

  clearSearchText(event: any) {
    this.infobox = false;
    this.searchBarField.nativeElement.focus();
    this.searchText = "";
  }
  confirmBruch() {
    this.infobox = false;
    this.searchBarField.nativeElement.focus();
    setTimeout(() => {
      this.searchText = "";
    }, 2000);
  }
  clearUmdispoSearch() {
    this.infobox = false;
    this.searchBarField.nativeElement.focus();
    this.searchText = "";
  }
}
