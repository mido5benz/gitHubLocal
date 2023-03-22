import {Component, OnInit} from '@angular/core';
import {Address} from "@shared/models";
import {Router} from "@angular/router";
import {AddressService} from "@app/core/services/address/address.service";
import {Observable} from "rxjs";
import {
  fetchArchivedAddressesCountRequest, fetchUnassignedAddressesCountRequest,
  fetchUnassignedAddressesRequest
} from "@store/stammdaten/actions/fetch-unassigned-addresses.actions";
import {AddressFacade} from "@store/stammdaten/facades/address.facade";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-address-list-archived',
  templateUrl: './address-list-archived.component.html',
  styleUrls: ['./address-list-archived.component.scss']
})
export class AddressListArchivedComponent implements OnInit {

  public selectedAddresses = [];
  public archivedAddress: Address[];

  constructor(
    private router: Router,
    private alertService: ToastrService,
    private addressService: AddressService,
    private addressFacade: AddressFacade) {
  }

  ngOnInit(): void {
    this.addressService.getArchivedAddresses().subscribe((archivedAddress: Address[]) => {
      this.archivedAddress = archivedAddress;
    });
  }

  selectedCheckbox(event, item) {
    !this.selectedAddresses.includes(item) ? this.selectedAddresses.push(item) : this.unselectedCheckbox(item);
  }

  unselectedCheckbox(unassignedAddresse) {
    const index: number = this.selectedAddresses.indexOf(unassignedAddresse);
    this.selectedAddresses.splice(index, 1);
  }


  removeAddressFromArchive() {
    const requestObject: number[] = [];

    this.selectedAddresses.map((selectedAddress) => {
      requestObject.push(selectedAddress.geoadresse_fehler_id);
    });

    this.addressService.reactivateArchivedAddress(requestObject).subscribe((isAddressesReactivate) => {

      this.alertService.success('Adresse erfolgreich reaktiviert');
      this.router.navigate(['/stammdaten/fehlerhaft']);

      this.addressFacade.dispatch(fetchUnassignedAddressesRequest({days: 1, records: 50}));
      this.addressFacade.dispatch(fetchArchivedAddressesCountRequest());
      this.addressFacade.dispatch(fetchUnassignedAddressesCountRequest());

    });
  }
}
