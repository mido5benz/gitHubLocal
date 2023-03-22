import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '@models/address/address.model';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {
  fetchUnassignedAddressesCountRequest,
  fetchUnassignedAddressesRequest
} from '@store/stammdaten/actions/fetch-unassigned-addresses.actions';

@Component({
  selector: 'app-unassigned-address-list',
  templateUrl: './unassigned-address-list.component.html',
  styleUrls: ['./unassigned-address-list.component.scss']
})
export class UnassignedAddressListComponent implements OnInit {

  @Input() unassignedAddresses: Address[];

  @Output() unassignedAddressClicked: EventEmitter<Address> = new EventEmitter<Address>();

  @Output() disabledButton: EventEmitter<any> = new EventEmitter<any>();

  public showButton: boolean = false;

  public unassignedSelectedAddress: Address;

  private currentRecordCount = 100;

  public tempUnassignedAddress = [];
  public anzahlButtonClicks = 0;

  constructor(private addressFacade: AddressFacade) {
  }

  ngOnInit(): void {
    this.isUnassignedAddressesEmpty();
  }

  isUnassignedAddressesEmpty() {
    this.unassignedAddresses.length === 0 ? this.showButton = false : this.showButton = true;
    this.disabledButton.emit(this.showButton);

  }

  itemSelected(item: Address): void {
    this.unassignedSelectedAddress = item;
    this.unassignedAddressClicked.emit(item);
  }

  loadNextEntries(): void {
    this.addressFacade.dispatch(fetchUnassignedAddressesRequest({days: null, records: this.currentRecordCount}));
    this.addressFacade.dispatch(fetchUnassignedAddressesCountRequest());
    this.currentRecordCount = this.currentRecordCount + 50;

    this.showWeitereLadenButton();
  }

  showWeitereLadenButton(): void {
    // Sobald keine neue Daten da sind, wird das Button ausgeblendet
    this.anzahlButtonClicks++;

    if (this.anzahlButtonClicks >= 1) {
      // wenn länge ungleich --> true; wenn länge gleich --> false
      this.showButton = this.tempUnassignedAddress.length !== this.unassignedAddresses.length;
      this.disabledButton.emit(this.showButton);
    }

     this.tempUnassignedAddress = this.unassignedAddresses;
  }

}
