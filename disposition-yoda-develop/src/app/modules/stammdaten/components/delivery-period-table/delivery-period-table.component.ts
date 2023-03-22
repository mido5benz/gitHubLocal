import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delivery-period-table',
  templateUrl: './delivery-period-table.component.html',
  styleUrls: ['./delivery-period-table.component.scss']
})
export class DeliveryPeriodTableComponent implements OnInit {

  @Input() deliveryTimeFramePeriods: any;
  @Input() deliveryTimeFramePeriodCount: number;

  @Output() removeDeliveryTimeFramePeriod: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteDeliveryPeriod(deliveryItem): void {
    this.removeDeliveryTimeFramePeriod.emit(deliveryItem);
  }
}
