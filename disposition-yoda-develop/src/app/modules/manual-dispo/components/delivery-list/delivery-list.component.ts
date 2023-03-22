import { Component, Input, OnInit } from '@angular/core';
import { Consignment } from '@models/index';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  @Input() delivery: Consignment[] = [];

  constructor() { }

  ngOnInit(): void {

  }
}
