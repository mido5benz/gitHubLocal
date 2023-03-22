import { Component, OnInit } from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {VersenderAdresse} from '@models/spontaneous-takeovers/spontaneous-takeovers.model';

@Component({
  selector: 'app-shipper-address-modal',
  templateUrl: './shipper-address-modal.component.html',
  styleUrls: ['./shipper-address-modal.component.scss']
})
export class ShipperAddressModalComponent implements OnInit {

  public versenderAdresse: VersenderAdresse;

  constructor(private dialogConfig: DialogConfig) { }

  ngOnInit(): void {
    this.versenderAdresse = this.dialogConfig.data;
  }

}
