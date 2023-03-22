import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '@shared/models';

@Component({
  selector: 'app-synonym-suggestion-list-item',
  templateUrl: './synonym-suggestion-list-item.component.html',
  styleUrls: ['./synonym-suggestion-list-item.component.scss']
})
export class SynonymSuggestionListItemComponent implements OnInit {

  @Input() item: Address;
  @Input() originalClickedItem: Address;

  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() addSynonymClicked: EventEmitter<any> = new EventEmitter<any>();

  selected: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  selectItem(item: any): void {
    this.selected = !this.selected;
    this.itemSelected.emit(item);
  }

  addSynonym(address): void {
    this.addSynonymClicked.emit(address);
  }
}
