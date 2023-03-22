import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss'],
})
export class TagItemComponent implements OnInit {
  @Input() caption = '';
  @Input() index: number;
  @Output() tagRemoved = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  removeTag(): void {
    this.tagRemoved.emit(this.index);
  }
}
