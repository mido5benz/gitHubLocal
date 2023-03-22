import {Component, Input, OnInit} from '@angular/core';
import {Consignment} from '@shared/models';

@Component({
  selector: 'app-versender-info',
  templateUrl: './versender-info.component.html',
  styleUrls: ['./versender-info.component.scss']
})
export class VersenderInfoComponent implements OnInit {
  @Input() sendung: Consignment;
  @Input() index: number;

  public isCollapsed = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
