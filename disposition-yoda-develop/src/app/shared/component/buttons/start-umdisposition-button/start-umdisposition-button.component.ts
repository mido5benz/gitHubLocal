import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DispoStopp} from '@models/index';

@Component({
  selector: 'app-start-umdisposition-button',
  templateUrl: './start-umdisposition-button.component.html',
  styleUrls: ['./start-umdisposition-button.component.scss']
})
export class StartUmdispositionButtonComponent implements OnInit {

  @Input() selectedStopps: DispoStopp[];

  @Output() openDialogClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.openDialogClicked.emit();
  }
}
