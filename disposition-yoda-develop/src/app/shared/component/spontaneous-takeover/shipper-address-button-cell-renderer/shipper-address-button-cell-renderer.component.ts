import { Component } from '@angular/core';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {ICellRendererParams} from 'ag-grid-community';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {ShipperAddressModalComponent} from '@shared/component/spontaneous-takeover/shipper-address-button-cell-renderer/shipper-address-modal/shipper-address-modal.component';

@Component({
  selector: 'app-shipper-address-button-cell-renderer',
  templateUrl: './shipper-address-button-cell-renderer.component.html',
  styleUrls: ['./shipper-address-button-cell-renderer.component.scss']
})
export class ShipperAddressButtonCellRendererComponent implements ICellRendererAngularComp {

  public params: any;

  constructor(private dialogService: DialogService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  showDialog(): void {
    this.dialogService.open({
      modalType: DialogModalType.MODAL,
      width: 500,
      closeOnOutsideClicked: false,
      showTitle: true,
      title: 'Versenderdetails',
      data: this.params.data.versender_adresse

    }, ShipperAddressModalComponent);
  }

}
