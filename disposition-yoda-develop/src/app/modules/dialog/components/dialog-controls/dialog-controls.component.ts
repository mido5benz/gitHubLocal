import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-controls',
  templateUrl: './dialog-controls.component.html',
  styleUrls: ['./dialog-controls.component.scss'],
})
export class DialogControlsComponent implements OnInit {
  @Input() title = '';

  @Output() closeButtonClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  closeClicked(): void {
    this.closeButtonClicked.emit();
  }
}
