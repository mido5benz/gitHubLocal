import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-link',
  templateUrl: './filter-link.component.html',
  styleUrls: ['./filter-link.component.scss'],
})
export class FilterLinkComponent implements OnInit {
  @Input() mapFilterActive: boolean;

  @Output() openFilterClicked = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  iconClicked(): void {
    this.openFilterClicked.emit();
  }
}
