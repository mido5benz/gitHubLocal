import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.scss']
})
export class LoadMoreButtonComponent implements OnInit {

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  @Input() weitereLadenButton;

  constructor() {
  }

  ngOnInit(): void {
  }

  loadMoreClicked(): void {
    this.buttonClicked.emit();
  }
}
