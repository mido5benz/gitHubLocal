import {SendungsDetailsLibService} from './../service/sendungs-details-lib.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {forkJoin, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Functions} from '../../../Global/functions';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-sendungs-details-lib',
  templateUrl: './sendungs-details-lib.component.html',
  styleUrls: ['./sendungs-details-lib.component.scss']
})
export class SendungsDetailsLibComponent implements OnInit {
  public sendungId: number;
  searchText: any = '';
  public temp = false;
  @ViewChild('searchBarInput') searchBarField: ElementRef;
  colliBarcode: any = 0;
  collectionRedirect: boolean = false;

  public seereignisse;
  public gefahrgueter;
  public dispoDetails;
  public colliereignisse;
  public shipmentInfo = [];
  public dienste;
  public sendungsketteArray = [];
  public sendungsketteAnzeigeArray = [];

  public scannung: boolean = true;

  modelChanged: Subject<any> = new Subject<any>();

  constructor(private service: SendungsDetailsLibService, private functions: Functions, private router: Router) {
    this.functions.hideLoader();
    this.modelChanged.pipe(
      debounceTime(2000),
      distinctUntilChanged()).subscribe(model => {
      let isNumber= this.isANumber(model.text);

      if(model.text.length ===24 && isNumber) {


      this.temp = false;
      if (model.enterPressed) {
        this.searchText = model.text;

        this.getSendungsDetailData(this.searchText);
      }
    }else{

      this.searchText ='';
      this.functions.showErrorSnackBar('Bitte geben Sie einen gültigen Packstückbarcode ein!',3000,'sendungDetailsLib');
      this.searchBarField.nativeElement.focus();
    }
    });
  }

  public isANumber(str){
    return !/\D/.test(str);
  }

  ngOnInit(): void {

    let temp = this.functions.getShipmentDetail();
    this.colliBarcode = temp.colliBarcode;
    this.sendungId = temp.sendungId;
    this.collectionRedirect = temp.collectionRedirect

    // ueber Vereinnahmung an die Lib
    this.functions.emitDashboardRed(true);
    this.searchBarField.nativeElement.focus();

    let redirectValue = this.functions.fetchRedirectFlag();
    if (redirectValue && redirectValue.length > 0) {
      this.searchText = this.colliBarcode;
      this.getSendungsDetailData(this.colliBarcode);
    } else {
      // ueber Dashboard an die Lib
      if (this.colliBarcode) {
        this.searchText = this.colliBarcode;
        this.getSendungsDetailData(this.colliBarcode);
      }
    }
    this.functions.hideLoader();
  }


  getSendungsDetailData(searchText) {
    forkJoin([
      this.service.getShipmentDetailsTypeSend(searchText),
      this.service.getSendungskorrekturDienste()
    ]).subscribe(([allTableData, dienste]) => {
        if(allTableData !== null && dienste !==null){
        this.sendungId = allTableData.sendungId;
        this.seereignisse = allTableData.seereignisse;
        this.gefahrgueter = allTableData.gefahrgueter;
        this.dispoDetails = allTableData.dispoDetails;
        this.colliereignisse = allTableData.scannungen;
        this.shipmentInfo.push(allTableData);
        this.sendungsketteArray.push(allTableData.sendungskette);

        this.sendungsketteArray[0].forEach((sendungenId) => {
          this.getSendungskette(sendungenId);
        });

        this.dienste = dienste;

        this.functions.hideLoader();
        this.temp = true;
        this.searchBarField.nativeElement.focus();
        this.searchText = '';
      }else{

        this.searchText ='';
        this.functions.showErrorSnackBar('Bitte geben Sie einen gültigen Packstückbarcode ein!',3000,'sendungDetailsLib');
        this.searchBarField.nativeElement.focus();
      }
    });
    this.shipmentInfo = [];
  }


  onkeypress(text: string, enter) {
    let object = {
      text: text,
      enterPressed: enter ? true : false
    };

    this.modelChanged.next(object);
  }

  putCorrectedValues(values) {
    if (values !== null) {
      let correctedForm = values;
      if (correctedForm.sendungId === null) {
        correctedForm.sendungId = this.sendungId;
      }

      this.service.sendCorrectedValues(correctedForm, this.sendungId).subscribe((nachfolger: any) => {
        if (nachfolger.status === 200) {
          this.service.getCorrectedValues(nachfolger.body.sendungId).subscribe((nachfolgerObject: any) => {
            this.shipmentInfo = [];
            this.shipmentInfo.push(nachfolgerObject);
            this.sendungId = nachfolgerObject.sendungId;
            this.functions.showSnackBar('Die Änderung wurde erfolgreich gespeichert',3000);
            this.getSendungskette(nachfolger.body.sendungId);
          });
        }
      }, (error => {
        if (error.status <= 400) {
          this.shipmentInfo = [...this.shipmentInfo];
          this.functions.showErrorSnackBar('Die Änderung konnte nicht gespeichert werden',3000);
        }
      }));
    }
  }

  getSendungskette(sendungenId) {
    this.service.getSendungsDaten(sendungenId, this.scannung).subscribe((sendungsdaten) => {
      this.sendungsketteAnzeigeArray.push(sendungsdaten);
    });
  }

  redirectToCollection() {
    // let _this = this;
    this.functions.showLoader();
    let navigationExtras: NavigationExtras = {
      queryParams: {
        searchText: this.colliBarcode,
      }
    };
    if(this.collectionRedirect) {
      this.router.navigate(['/vereinnahmung'], navigationExtras);
    } else {
      this.router.navigate(['/vereinnahmung']);
    }
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this.functions.resetShipmentDetail();
    this.collectionRedirect = false;
  }

}
