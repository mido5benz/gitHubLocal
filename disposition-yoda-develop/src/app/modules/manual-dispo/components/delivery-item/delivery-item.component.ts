import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Delivery } from '@models/index';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss']
})
export class DeliveryItemComponent implements OnInit {

  @Input() delivery: Delivery;

  @HostBinding('attr.title')
  get title(): string {
    if (this.delivery) {
      return this.delivery.name1;
    }
    return 'Unbekannt';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
