import {Router} from '@angular/router';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SendungsDetailsLibService} from "../../lib/service/sendungs-details-lib.service";
import {Functions} from "../../../Global/functions";

@Component({
  selector: 'app-navigation-modal',
  templateUrl: './navigation-modal.component.html',
  styleUrls: ['./navigation-modal.component.scss']
})
export class NavigationModalComponent implements OnInit {

  @Input() shipmentInfo;
  @Input() dienste;
  @Input() sendungId;
  @Input() reArrangeList;
  @Input() searchText;


  constructor(private sendungsDetailsLibService: SendungsDetailsLibService,
              private router: Router,
              private functions: Functions) {
  }

  ngOnInit(): void {
  }

  @Output() goHome = new EventEmitter();
  @Output() clearSearchText = new EventEmitter();
  @Output() confirmBruch = new EventEmitter();
  @Output() clearUmdispoSearchField = new EventEmitter();

  closeVerinnahmungModal() {
    this.clearSearchText.emit();
    this.goHome.emit(false);
  };

  clearBruchSearchText(){
    this.confirmBruch.emit();
  }
  clearUmdispoSearchText() {
    this.clearUmdispoSearchField.emit();
  }


  putCorrectedValues(event: any) {
    if (event !== null) {
      let correctedForm = event;
      if (correctedForm.sendungId === null) {
        correctedForm.sendungId = this.sendungId;
      }
      this.sendungsDetailsLibService.sendCorrectedValues(correctedForm, this.sendungId).subscribe((correctedValues) => {
        this.functions.showSnackBar('Erfolgreich geändert!', 3000);
        this.clearSearchText.emit();
        this.closeVerinnahmungModal();
      });
    }
  }

  redirectToShipment() {
    let data = {
      colliBarcode: this.searchText,
      sendungId: this.searchText
    };

    // this.functions.setRedirectFlag(this.searchText);
    this.functions.setShipmentDetail(data);
    this.router.navigate(['/sendungslib']);
  };


}
