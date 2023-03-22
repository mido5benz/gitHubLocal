import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-static-table',
  templateUrl: './static-table.component.html',
  styleUrls: ['./static-table.component.scss']
})
export class StaticTableComponent implements OnInit {

  
  @Input() columns: any;
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
