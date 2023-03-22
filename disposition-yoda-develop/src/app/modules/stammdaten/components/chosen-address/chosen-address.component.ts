import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Address} from '@models/address/address.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {fetchSuggestions} from '@store/stammdaten/synonyms/actions/fetch-synonyms.actions';
import {AddressService} from '@app/core/services/address/address.service';
import {Subscription} from 'rxjs';
import {
  fetchArchivedAddressesCountRequest, fetchUnassignedAddressesCountRequest,
  fetchUnassignedAddressesRequest
} from "@store/stammdaten/actions/fetch-unassigned-addresses.actions";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-chosen-address',
  templateUrl: './chosen-address.component.html',
  styleUrls: ['./chosen-address.component.scss']
})
export class ChosenAddressComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() set address(address: any) {
    this.sendungId = address?.sendung_id;
    this.geoadresseFehlerId = address?.geoadresse_fehler_id;

    let strasse = this.removePointFromStreet(address?.strasse);

    this.chosenAddressForm.patchValue({
      name1: address?.name1,
      strasse: strasse,
      hausnr: address?.hausnr,
      plz: address?.plz,
      ort: address?.ort,
    });
  }

  @Output() adressChanged: EventEmitter<Address> = new EventEmitter<Address>();

  chosenAddressForm: FormGroup = this.fb.group({
    name1: [{value: '', disabled: true}],
    strasse: [{value: '', disabled: false}, Validators.required],
    hausnr: [{value: '', disabled: true}, Validators.required],
    plz: [{value: '', disabled: true}],
    ort: [{value: '', disabled: true}],
  });

  private sendungId;
  private geoadresseFehlerId;

  constructor(private addressFacade: AddressFacade, private fb: FormBuilder, private addressService: AddressService, private alertService: ToastrService) {
  }

  ngOnInit(): void {
    this.chosenAddressForm.valueChanges.subscribe(() => {
      this.adressChanged.emit(this.chosenAddressForm.getRawValue());
    });

    this.subscription.add(this.addressService.clearAdressFormObserv.subscribe((clearAddressForm) => {
      if (clearAddressForm) {
        this.sendungId = null;
        this.geoadresseFehlerId = null;
        this.chosenAddressForm.patchValue({
          name1: '',
          strasse: '',
          hausnr: '',
          plz: '',
          ort: '',
        });
      }
    }));
  }

  createAddress(): void {
  }

  runSearch(): void {
    const rawValues = this.chosenAddressForm.getRawValue();


    const query: Address = {
      geoadresse_fehler_id: this.geoadresseFehlerId,
      ziel_name_id: null,
      dispostopp_id: null,
      sendung_id: this.sendungId,
      geoadresse_id: null,
      landCode: 'D',
      name1: '',
      name2: '',
      name3: '',
      plz: rawValues.plz,
      ort: rawValues.ort,
      //strasse: rawValues.strasse,
      strasse: this.removePointFromStreet(rawValues.strasse),
      hausnr: rawValues.hausnr
    };

    this.addressFacade.dispatch(fetchSuggestions({address: query}));
  }

  removePointFromStreet(strasse) {
    let removePoint: string = strasse?.replace('.', '');
    return removePoint;
  }

  archiveAddress() {
    let array: any[] = [];
    array.push(this.geoadresseFehlerId);
    this.addressService.archiveAddress(array).subscribe((isAddressArchived) => {
        this.alertService.success('Adresse erfolgreich archiviert!');
        this.addressFacade.dispatch(fetchUnassignedAddressesRequest({days: 1, records: 50}));
        this.addressFacade.dispatch(fetchArchivedAddressesCountRequest());
        this.addressFacade.dispatch(fetchUnassignedAddressesCountRequest());
    });
  }

  onSubmit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
