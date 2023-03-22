import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Consignment} from '@models/index';

@Component({
  selector: 'app-collapsed-icon',
  templateUrl: './collapse-icon.component.html',
  styleUrls: ['./collapse-icon.component.scss']
})
export class CollapseIconComponent implements OnInit {

  @Input() delivery: Consignment[];

  @Output() iconClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  collapsedClicked(): void {
    this.iconClicked.emit();
  }

  iconVisible(): boolean {
    if (!this.delivery) {
      return false;
    }

    if (this.delivery.length > 0) {
      return this.delivery[0].dienste !== '';
    }
    return false;
  }
}
