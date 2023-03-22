import { Component, Input, OnInit } from '@angular/core';
import {DispoStopp} from '@shared/models';

@Component({
  selector: 'app-soll-stopp-nr',
  templateUrl: './soll-stopp-nr.component.html',
  styleUrls: ['./soll-stopp-nr.component.scss']
})
export class SollStoppNrComponent implements OnInit {

  @Input() stopp: DispoStopp;

  constructor() { }

  ngOnInit(): void {
  }

}
