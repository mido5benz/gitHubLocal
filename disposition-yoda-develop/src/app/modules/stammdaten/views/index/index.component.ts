import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {Address} from '@models/address/address.model';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {CreateNewAddressDialogComponent} from '@modules/stammdaten/components/create-new-address-dialog/create-new-address-dialog.component';
import {StoppsFacade} from '@store/manual-dispo/stopps/facades/stopps.facade';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {
  fetchArchivedAddressesCountRequest,
  fetchUnassignedAddressesCountRequest,
  fetchUnassignedAddressesRequest
} from '@store/stammdaten/actions/fetch-unassigned-addresses.actions';
import {AddressService} from "@app/core/services/address/address.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  public unassignedStopCount$: Observable<number>;
  public unassignedAddressesCount$: Observable<number>;
  public getArchivedAddressCount$: Observable<number>;

  public suggestions: Address[] = [];
  public suggesstionsLoading: boolean;

  public selectedUnassignedAddress: Address;
  public selectedSuggestedAddress: Address;

  constructor(
    private dialogService: DialogService,
    private tourListFacade: TourlistFacade,
    private stoppsFacade: StoppsFacade,
    private addressFacade: AddressFacade) {
    // this.tourListFacade.dispatch(fetchTourlistStart());
    this.addressFacade.dispatch(fetchUnassignedAddressesRequest({days: 1, records: 50}));
    this.addressFacade.dispatch(fetchUnassignedAddressesCountRequest());
    this.addressFacade.dispatch(fetchArchivedAddressesCountRequest());
  }

  ngOnInit(): void {
    this.unassignedStopCount$ = this.stoppsFacade.unassignedStoppsCount$;

    this.getArchivedAddressCount$ = this.addressFacade.archivedAddressCount$;

    this.unassignedAddressesCount$ = this.addressFacade.unassignedAddressesCount$;

    this.subscription.add(this.addressFacade.suggestions$.subscribe((unassignedAddresses: Address[]) => {
      this.suggestions = unassignedAddresses;
    }));

    this.subscription.add(this.addressFacade.loading$.subscribe((loading: boolean) => {
      this.suggesstionsLoading = loading;
    }));
  }

  suggestionSelected(suggestedAddress: Address): void {
    this.selectedSuggestedAddress = suggestedAddress;
  }

  createAddress(address: Address): void {
    const dialogRef = this.dialogService.open({
      title: 'Neue Adresse anlegen',
      modalType: DialogModalType.MODAL,
      data: {
        address,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        sendung_id: this.selectedUnassignedAddress.sendung_id,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        geoadresse_fehler_id: this.selectedUnassignedAddress.geoadresse_fehler_id
      },
      closeOnOutsideClicked: false
    }, CreateNewAddressDialogComponent);

    dialogRef.afterClosed.subscribe(() => {
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
