import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Observable} from 'rxjs';
import {SpontaneousTakeoversService} from '@app/core/services/spontaneous-takeovers/spontaneous-takeovers.service';
import {DepotListe} from '@models/spontaneous-takeovers/spontaneous-takeovers.model';

@Component({
  selector: 'app-depot-selection-list',
  templateUrl: './depot-selection-list.component.html',
  styleUrls: ['./depot-selection-list.component.scss']
})
export class DepotSelectionListComponent implements OnInit {

  public modalRef: BsModalRef;
  public depots: DepotListe[]

  public selectedDepotNr: string;
  public selectedDepotBezeichnung: string;

  constructor(private spontaneousTakeoverService: SpontaneousTakeoversService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.spontaneousTakeoverService.getDepotList().subscribe((depot: DepotListe[]) => {
      this.depots = this.sortDepoNr(depot);
    })
  }

  depotSelected(depot: DepotListe) {

    this.selectedDepotNr = depot.depotNr;
    this.selectedDepotBezeichnung = depot.bezeichnung;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitNewDepotNr() {
    this.spontaneousTakeoverService.getDataForNewDepotNr(this.selectedDepotNr);
  }

  sortDepoNr(depot: DepotListe[]) {
    return depot.sort((a,b) => (a.depotNr> b.depotNr) ? 1 : ((b.depotNr > a.depotNr) ? -1 : 0))
  }
}
