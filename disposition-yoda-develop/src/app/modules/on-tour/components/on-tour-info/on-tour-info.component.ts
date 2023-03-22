import { Component, Input, OnInit } from '@angular/core';
import { Anfrage} from '@models/on-tour/aenderungswunsch.model';

@Component({
  selector: 'app-on-tour-info',
  templateUrl: './on-tour-info.component.html',
  styleUrls: ['./on-tour-info.component.scss']
})
export class OnTourInfoComponent implements OnInit {

 @Input() tourInfos: Anfrage;

  constructor() {
  }

  ngOnInit(): void {
  }
}
