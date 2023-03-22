import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-selection-count-button',
  templateUrl: './selection-count-button.component.html',
  styleUrls: ['./selection-count-button.component.scss']
})
export class SelectionCountButtonComponent implements OnInit {

  @Input() count: number;

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  clicked(): void {
    this.buttonClicked.emit();
  }
}
