import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-reload-data-button',
  templateUrl: './reload-data-button.component.html',
  styleUrls: ['./reload-data-button.component.scss']
})
export class ReloadDataButtonComponent implements OnInit {

  @Output() onButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  buttonClicked(): void {
    this.onButtonClicked.emit();
  }
}
