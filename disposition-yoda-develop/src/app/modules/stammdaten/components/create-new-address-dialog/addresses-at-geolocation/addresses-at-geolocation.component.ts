import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '@models/address/address.model';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {createSynonymRequest} from '@store/stammdaten/actions/create-synonyms.actions';

@Component({
  selector: 'app-addresses-at-geolocation',
  templateUrl: './addresses-at-geolocation.component.html',
  styleUrls: ['./addresses-at-geolocation.component.scss']
})
export class AddressesAtGeolocationComponent implements OnInit {

  @Input() loading: boolean;
  @Input() addresses: Address[];
  @Input() geoadresseFehlerId: any;
  @Input() sendungId: any;

  @Output() synonymCreatedClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private addressFacade: AddressFacade) {
  }

  ngOnInit(): void {
  }

  addAsSynonym(address: any): void {
    const synonym: any = {
      geoadresse_fehler_id: this.geoadresseFehlerId,
      sendung_id: this.sendungId,
      dispostopp_id: null,
      geoadresse_id: address.geoadresse_id,
      ziel_name_id: null,
      name1: null,
      name2: null,
      name3: null,
      landCode: 'DE',
      plz: address.plz,
      ort: address.ort,
      strasse: address.strasse,
      hausnr: address.hausnr
    };
    this.addressFacade.dispatch(createSynonymRequest({synonym}));
    this.synonymCreatedClicked.emit();
  }
}
