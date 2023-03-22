import {Component, Input, OnInit} from '@angular/core';
import {DeliveryDay} from '@shared/models';

@Component({
  selector: 'app-navigation-delivery-item',
  templateUrl: './navigation-delivery-item.component.html',
  styleUrls: ['./navigation-delivery-item.component.scss']
})
export class NavigationDeliveryItemComponent implements OnInit {
  @Input() deliveryDay: DeliveryDay;

  constructor() { }

  ngOnInit(): void {
  }

}
