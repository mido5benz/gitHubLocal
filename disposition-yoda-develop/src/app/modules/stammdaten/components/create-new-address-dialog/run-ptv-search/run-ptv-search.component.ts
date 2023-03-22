import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '@models/address/address.model';

@Component({
  selector: 'app-run-ptv-search',
  templateUrl: './run-ptv-search.component.html',
  styleUrls: ['./run-ptv-search.component.scss']
})
export class RunPtvSearchComponent implements OnInit {

  @Input() address: any;

  @Output() searchClicked = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  runPTVSearch(): void {
    this.searchClicked.emit();
  }
}
