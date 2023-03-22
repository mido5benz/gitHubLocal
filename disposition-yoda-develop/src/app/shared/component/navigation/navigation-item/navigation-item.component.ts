import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent implements OnInit {
  @Input() caption: string;
  @Input() layer: string;
  @Input() isDisabled: boolean;
  @Input() activeLayer: string;
  @Input() isActive: boolean;
  @Input() iconClasses: string[];
  @Input() isHighlighted: boolean;
  @Input() toolTip: string;
  @Output() itemClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onItemClicked(): void {
    if (!this.isDisabled) {
      this.itemClicked.emit(this.layer);
    }
  }

}
