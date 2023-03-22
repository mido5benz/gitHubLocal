import { Component, Input, OnInit } from '@angular/core';
import { Anfrage } from '@models/on-tour/aenderungswunsch.model';

@Component({
  selector: 'app-tour-info-container-detail',
  templateUrl: './tour-info-container-detail.component.html',
  styleUrls: ['./tour-info-container-detail.component.scss']
})
export class TourInfoContainerDetailComponent implements OnInit {

@Input() details: Anfrage;

  constructor() { }

  ngOnInit(): void {
  }

}
