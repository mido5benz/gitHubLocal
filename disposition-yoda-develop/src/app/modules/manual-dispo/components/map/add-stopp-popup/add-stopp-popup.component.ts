import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DispoStopp } from '@models/index';

@Component({
  selector: 'app-add-stopp-popup',
  templateUrl: './add-stopp-popup.component.html',
  styleUrls: ['./add-stopp-popup.component.scss'],
})
export class AddStoppPopupComponent implements OnInit {
  @Input() stopps: DispoStopp[];

  @Output() moveStopp = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  addStop(): void {
    this.moveStopp.emit(this.stopps);
  }
}
