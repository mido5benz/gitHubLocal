import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stammdaten-navbar',
  templateUrl: './stammdaten-navbar.component.html',
  styleUrls: ['./stammdaten-navbar.component.scss']
})
export class StammdatenNavbarComponent implements OnInit {

  @Input() unassignedAddressesCount: number;
  @Input() unassignedStopCount: number;
  @Input() archivedAddressCount: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
