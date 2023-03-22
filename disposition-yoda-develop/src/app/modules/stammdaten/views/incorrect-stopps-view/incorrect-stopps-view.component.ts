import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Address} from '@models/address/address.model';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {Store} from '@ngrx/store';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {getErrorStoppCount, getUnassignedStoppCount} from '@store/manual-dispo/tour/selectors/tourlist.selectors';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {CreateNewAddressDialogComponent} from '@modules/stammdaten/components';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {createSynonymRequest} from '@store/stammdaten/actions/create-synonyms.actions';
import {fetchSuggestions} from '@store/stammdaten/synonyms/actions/fetch-synonyms.actions';
import {AddressService} from '@app/core/services/address/address.service';

@Component({
  selector: 'app-incorrect-stopps-view',
  templateUrl: './incorrect-stopps-view.component.html',
  styleUrls: ['./incorrect-stopps-view.component.scss']
})
export class IncorrectStoppsViewComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  public currentAddress: Address;

  public unassignedStopCount$: Observable<number>;
  public errorCount$: Observable<number>;

  public suggestions: Address[] = [];
  public suggesstionsLoading: boolean;

  public selectedUnassignedAddress: Address;
  public selectedSuggestedAddress: Address;

  public unassignedAddresses$: Observable<Address[]>;
  public unassignedAddressesCount$: Observable<number>;

  constructor(
    private store: Store,
    private dialogService: DialogService,
    private addressFacade: AddressFacade,
    private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.unassignedAddressesCount$ = this.addressFacade.unassignedAddressesCount$;
    this.unassignedAddresses$ = this.addressFacade.unassignedAddresses$;

    this.subscription.add(this.addressFacade.suggestions$.subscribe((unassignedAddresses: Address[]) => {
      this.suggestions = unassignedAddresses;
    }));

    this.subscription.add(this.addressFacade.loading$.subscribe((loading: boolean) => {
      this.suggesstionsLoading = loading;
    }));

    this.unassignedStopCount$ = this.store.select(getUnassignedStoppCount);
    this.errorCount$ = this.store.select(getErrorStoppCount);
  }

  setSelectedUnassignedAddress(unassignedAddress: any): void {
    this.selectedUnassignedAddress = unassignedAddress;

    const query: any = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      geoadresse_fehler_id: unassignedAddress.geoadresse_fehler_id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ziel_name_id: null,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      dispostopp_id: null,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      sendung_id: unassignedAddress.sendung_id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      geoadresse_id: null,
      landCode: 'D',
      name1: '',
      name2: '',
      name3: '',
      plz: unassignedAddress.plz,
      ort: unassignedAddress.ort,
      strasse: unassignedAddress.strasse.replace('.', ''),
      hausnr: unassignedAddress.hausnr
    };

    this.addressFacade.dispatch(fetchSuggestions({address: query}));
  }

  suggestionSelected(suggestedAddress: Address): void {
    this.selectedSuggestedAddress = suggestedAddress;
  }

  confirmSynonym($event): void {
    const synonym: any = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      geoadresse_fehler_id: this.selectedUnassignedAddress.geoadresse_fehler_id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      sendung_id: this.selectedUnassignedAddress.sendung_id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      dispostopp_id: null,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      geoadresse_id: $event.geoadresse_id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ziel_name_id: null,
      name1: null,
      name2: null,
      name3: null,
      landCode: 'DE',
      plz: this.currentAddress.plz,
      ort: this.currentAddress.ort,
      strasse: this.currentAddress.strasse,
      hausnr: this.currentAddress.hausnr
    };

    const dialogRef =
      this.dialogService.openConfirmationDialog(
        'Es wird eine neue Schreibweise für die gewählte Adresse angelegt!',
        'Bitte bestätigen!');

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
        if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
          this.addressService.clearAdressForm(true);
          this.addressFacade.dispatch(createSynonymRequest({synonym}));
        }
      }
    );
  }

  onAddressChanged(address: Address): void {
    this.currentAddress = address;
  }

  createAddress(): void {
    const dialogRef = this.dialogService.open({
      title: 'Neue Adresse anlegen',
      modalType: DialogModalType.MODAL,
      data: {
        address: this.currentAddress,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        sendung_id: this.selectedUnassignedAddress.sendung_id,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        geoadresse_fehler_id: this.selectedUnassignedAddress.geoadresse_fehler_id
      },
      closeOnOutsideClicked: false
    }, CreateNewAddressDialogComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
        const data = dialogCloseEvent.data;
        if(data?.clearValues) {
          this.selectedUnassignedAddress = {
            sendung_id: null,
            dispostopp_id: null,
            geoadresse_fehler_id: null,
            geoadresse_id: null,
            hausnr: null,
            landCode: null,
            name1: null,
            name2: null,
            name3: null,
            ort: null,
            plz: null,
            strasse: null,
            ziel_name_id: null
          }
          this.suggestions = [];
        }
      }
    });
  }

  private buildRequestBody(addressData: any): any {
    const requestBody = {
      // ziel_name_id: this.currentRecipient.ziel_name_id,
      // geoposition_id: this.currentRecipient.geoposition_id,
      // name: this.currentRecipient.name,
      // name1: this.currentRecipient.name1,
      // name2: this.currentRecipient.name2,
      // name3: this.currentRecipient.name3,
      // name123: this.currentRecipient.name123,
      // fahrzeugklasse_id: +formValues.type,
      // eigenschaften: codes
    };

    return requestBody;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
