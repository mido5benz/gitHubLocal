import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Consignment} from '@models/index';
import {icon} from 'leaflet';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit, OnChanges {

  @Input() delivery: Consignment[];
  @Input() collapsed: boolean;

  public dienste = [];

  icons: any = {};

  constructor() {
    this.icons['+8'] = {url: 'assets/img/icons/8.svg'};
    this.icons['+10'] = {url: 'assets/img/icons/10.svg'};
    this.icons['+12'] = {url: 'assets/img/icons/12.svg'};
    this.icons.Amb = {url: 'assets/img/icons/ambient_24dp.svg'};
    this.icons.Abe = {url: 'assets/img/icons/abend.svg'};
    this.icons.Gef = {url: 'assets/img/icons/gefahrgut.svg'};
    this.icons.Küh = {url: 'assets/img/icons/ambient_24dp.svg'};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.delivery?.length > 0) {
      this.dienste = this.getServices(this.delivery[0].dienste);
    }
  }

  ngOnInit(): void {
  }

  getServiceIcon(service: string): string {
    if (this.icons[service]) {
      return this.icons[service].url;
    }
    return '';
  }

  getServices(service: string): string[] {
    if (service === '') {
      return [];
    }
    return this.delivery[0].dienste.split(' ');
  }

  hasIcon(icn: string): boolean {
    return icn in this.icons;
  }
}
