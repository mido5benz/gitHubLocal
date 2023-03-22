import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {Address} from '@models/address/address.model';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {AddressService} from '@app/core/services/address/address.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-synonym-suggestions-list',
  templateUrl: './synonym-suggestions-list.component.html',
  styleUrls: ['./synonym-suggestions-list.component.scss']
})
export class SynonymSuggestionsListComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  public sortedListItems: Address [] = [];

  @Input() set listItems(address: Address[]) {
    if (address) {
      this.sortedListItems = [];
      let listItem = [...address];
      // Einträge mit Hausnummer = null werden durch leeres String ersetzt
      for (let i = 0; i < listItem.length; i++) {
        if(listItem[i].hausnr !== null) {
          this.sortedListItems.push(listItem[i]);
        } else if (listItem[i].hausnr === null) {
          let newListItemObject = {...listItem[i]};
          newListItemObject.hausnr = '';
          this.sortedListItems.push(newListItemObject);
        }
      }

      this.sortedListItems.sort((a, b) => a.hausnr.localeCompare(b.hausnr, undefined, {numeric: true, sensitivity: 'base'}));
    } else {
      this.sortedListItems = [];
    }
  };

  @Input() originalItem: any;

  @Output() suggestedAddressSelected: EventEmitter<Address> = new EventEmitter<Address>();
  @Output() createSynonymClicked: EventEmitter<Address> = new EventEmitter<Address>();
  @Output() createNewAddressClicked: EventEmitter<Address> = new EventEmitter<Address>();

  public selectedItem: Address;
  public loading;

  constructor(
    private dialogService: DialogService,
    private addressFacade: AddressFacade,
    private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.loading = this.addressFacade.loading$;
    this.listItems = [];

    this.subscription.add(this.addressService.clearSynonymErgebisseObserv.subscribe((clearErgebnisse) => {
      if (clearErgebnisse) {
        this.sortedListItems = [];
      }
    }));

  }

  setSelectedItem(item: Address): void {
    this.selectedItem = item;
    this.suggestedAddressSelected.emit(item);
  }

  addSynonym(address: Address): void {
    this.sortedListItems = [];
    this.createSynonymClicked.emit(address);
  }

  createAddress(): void {
    this.createNewAddressClicked.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
