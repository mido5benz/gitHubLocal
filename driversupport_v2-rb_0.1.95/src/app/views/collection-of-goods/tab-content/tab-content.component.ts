import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { Functions } from "src/app/Global/functions";
import {
  VereinnahmungModel,
  TypeResponse,
  CollectionTypeModel,
} from "src/app/_services/api";
import { apiService } from "src/app/_services/api.service";
import { Swipe } from "./../../../../assets/libraries/collectionswipe";
var $ = require("jquery");

@Component({
  selector: "app-tab-content",
  templateUrl: "./tab-content.component.html",
  styleUrls: ["./tab-content.component.scss"],
  providers: [Swipe],
})
export class TabContentComponent implements OnInit {
  @Input() infoboxProperty;
  @Output() clearSearchText = new EventEmitter();
  @Output() newVereinnahmungEvent = new EventEmitter<any>();

  // to call Parent funktion from the child
  // @Output() parentFunktion: EventEmitter<any> = new EventEmitter();

  collectionTabs: any = [];
  temp: any;
  // contain all MainData for the Collection => VERBRINGPFLICHT', 'ZUSTELLHINDERNIS', 'STOERUNG_BELADUNG', 'TEMPERATURPRUEFUNG
  vereinnahmungtypList: any = [];

  collection: any = {
    loading: true,
    rows: [],
    // TODO you can change "Verbringpflicht" hier
    model: {
      type: "",
      text: "",
    },
    colapsedID: null,
  };

  // TODO  es ist eine List von VereinnahmungModel Objects
  vereinnahmungObjList: VereinnahmungModel []= [];

  public infobox = false;

  constructor(
    private Swipe: Swipe,
    private service: apiService,
    private functions: Functions,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.toggleInfobox();

    this.service
      .getMainDataBycollection()
      .subscribe((resp: CollectionTypeModel[]) => {
        // TODO Lade Animation
        // this.collectionTabs = resp;
        this.vereinnahmungtypList = [];

        for (let k = 0; k < resp.length; k++) {
          // if (resp[k].code != "SONSTIGE") {
          if (resp[k].satzStatus === "A") {
            if (resp[k].code == "VERBRINGPFLICHT") {
              this.collection.model.type = resp[k].bezeichung;
              this.collection.model.text = resp[k].beschreibung;
            }

            this.collectionTabs.push(resp[k]);
            this.collectionTabs[k]["iconClass"] = this.getIconOfCollectionType(
              resp[k].code
            );

            // Vereinnahmung Stammdaten List befüllen zum Beipsiel : VERBRINGPFLICHT,ZUSTELLHINDERNIS...
            this.vereinnahmungtypList.push(resp[k].code);
          }
        }

        console.log("Vereinnahmung  ", this.collectionTabs);
        // get count of elements for each Vereinnnahmung type !!!
        //  this.getTabsCount(this.vereinnahmungtypList);
        //this.getTabsCount(this.collectionTabs[0].code);
         this.aktualisierenVereinnahmungTabs(this.collectionTabs[0].code);


        // Vereinnahmung collection Data type für die Auf Richtige Tour Tab
        this.getInitialData();

        let tempvalue = this.functions.fetchRedirectFlag();
        this.functions.emitDashboardRed(true);
      });
  }

  getIconOfCollectionType(value) {
    let temp = "";
    switch (value) {
      case "VERBRINGPFLICHT":
        // temp = "fa fa-dolly";
        temp = "packTausch";
        break;
      case "ZUSTELLHINDERNIS":
        temp = "truck";
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

  callMe(value: string) {
    console.log("Called : " + value);
  }

  /**
   * Füllen die Auf-Richtige Tour Daten + Anzahl
   */
  getInitialData() {
    this.service.getintialCollectView().subscribe(
      (resp: VereinnahmungModel[]) => {
        if (resp.length > 0) {
          this.vereinnahmungObjList = resp;
          this.collectionTabs[0]["count"] =   this.vereinnahmungObjList && this.vereinnahmungObjList.length ?  this.vereinnahmungObjList.length : 0;
        }
        this.functions.hideLoader();
      },
      (error) => {
        this.functions.hideLoader();
      }
    );
  }

  handleCollapse(index, item) {
    if (this.collection.colapsedID == index) {
      this.collection.colapsedID = null;
    } else {
      // this.Shipmentinfofun(item.colliBarcode, index);
    }
  }

  onSwipe(val, event) {
    this.temp = val;
  }

  /**
   * return die Vereinnahmung elements als list in tourarray
   * @param tab
   */
  handleTabChange(tab) {
    this.temp = null;
    console.log(
      "+++++++++++++++++++++++++++++++++++click update +++++++++++++++++++++++",
      tab
    );

    this.newVereinnahmungEvent.emit(tab);
    // this.parentFunktion.emit("Mohamed !!!!!");
    this.vereinnahmungObjList = [];
    this.service
      .getCollectionData(tab.code,true)
      // .getSingleCountsForTabsForUpdate2(tab.code,true)
      .subscribe((response: VereinnahmungModel[]) => {
        console.log("Vereinnahmung types :", this.vereinnahmungtypList);

        // es kann sein diese Method aktualisiert alle Tabs
        //this.getTabsCount(this.tabsCountServiceArray);
        this.aktualisierenVereinnahmungTabs(tab.code);

        this.collection.colapsedID = null;
        this.collection = {
          loading: true,
          rows: [],
          model: { type: tab.code, text: tab.beschreibung },
          colapsedID: null,
        };

        console.log("collection ", this.collection);
        if (response && response.length > 0) {
          this.vereinnahmungObjList = response;
          console.log("Ausgewählte Vereinnahmung List   ", this.vereinnahmungObjList);

          console.log(
            "index of:  " +
              tab.code +
              "  is " +
              this.vereinnahmungtypList.indexOf(tab.code)
          );

          // update the Tab Vereinnahmung Anzahl
        } else {
            // for (var i = 0; i < 5; i++) {
            //   this.vereinnahmungObjList.push({zeilenummer: i, packstueckId: 123819641, icon: this.getIconOfCollectionType(this.collection.model.type), tournr: '2100', value: 'Termin', colliBarcode: '12345123450000014969469', sendungId: 123456897, recipientName: 'Musterman Drugs', recipientAdress: 'Mainstreet 101, 90900 Mustertown', eventColor: 'red' });
            // }
        }

        // aktualisieren die Anzahl des ausgewählten Tabs
        this.collectionTabs[this.vereinnahmungtypList.indexOf(tab.code)][
          "count"
        ] = response && response.length ? response.length : 0;
        // TODO
        //this.searchBarField.nativeElement.focus();
      });
  }


  weMethod(item,vereinnahmungType: any) {
    this.service.getCollectWE(item).subscribe((Response: TypeResponse) => {
      if (Response !== null) {
        let message = Response.text;
        if(Response.code ==='200'){
          this.functions.showSnackBar(message, 2000, "Collection");
          this.getTabsCount(vereinnahmungType);
        }else{
          this.functions.showErrorSnackBar(message, 3000, 'Collection');
        }
      }
    });
  }

  vlMethod(item,vereinnahmungType: any) {
    this.temp = null;
    this.service.getcollectVL(item).subscribe((response: TypeResponse) => {
      if (response !== null) {
        let message = response.text;
        if(response.code ==='200'){
          this.functions.showSnackBar(message, 2000, "Collection");
          this.getTabsCount(vereinnahmungType);
        }else{
          this.functions.showErrorSnackBar(message, 3000, 'Collection');
        }
      }
    });
  }

  async getTabsCount(vereinnahmungSelectedType: String) {


    this.vereinnahmungObjList = [];

    let result = await this.service.getSingleCountsForTabsForUpdate2(
      vereinnahmungSelectedType, true
    );

    this.collectionTabs[this.vereinnahmungtypList.indexOf(vereinnahmungSelectedType)][
      "count"
      ] = result && result.length ? result.length : 0;

    this.vereinnahmungObjList = result;
    this.aktualisierenVereinnahmungTabs(vereinnahmungSelectedType);

    this.clearSearchText.emit();
  }

  async aktualisierenVereinnahmungTabs(vereinnahmungSelectedType: String) {
    console.log("Vereinnahmung Aktualisierung Methode ++++++", vereinnahmungSelectedType);
    for (var i = 0; i < this.vereinnahmungtypList.length; i++) {
      if (this.vereinnahmungtypList[i] !== vereinnahmungSelectedType) {
       console.log("this.vereinnahmungtypList[i]   -->   ", this.vereinnahmungtypList[i])

       let result = await this.service.getSingleCountsForTabsForUpdate2(
          this.vereinnahmungtypList[i], false
        );
        console.log("update this.vereinnahmungtypList[i]  ",this.vereinnahmungtypList[i]);
       console.log("result after update  ",result[0].zeilenummer);
       this.collectionTabs[i]["count"] =  result && result.length ? result[0].zeilenummer : 0;

      }
    }
    this.clearSearchText.emit();
  }

  toggleInfobox() {
    this.infobox = this.infoboxProperty;
    this.cd.detectChanges();
  }

  /**
   * return true if the Vereinnahmung Tab name is Verbringpflicht or Tourwechsel
   * used to change and adjust the CSS in Tab-Content.component.html for the Verbringpflicht
   */
  isVerbringpflicht(value: any) {
    switch (value) {
      case "VERBRINGPFLICHT": {
        return true;
      }
      case "Auf richtige Tour": {
        return true;
      }
      default: {
        return false;
      }
    }
  }

  isButtonAktion(value: any){
    switch (value) {
      case "VERBRINGPFLICHT": {
        return false;
      }
      case "Auf richtige Tour": {
        return false;
      }
      case "TEMPERATURPRUEFUNG": {
        return true;
      }
      case "STOERUNG_BELADUNG": {
        return true;
      }
      case "ZUSTELLHINDERNIS": {
        return true;
      }
      default: {
        return false;
      }
    }
  }
}
