import {Component, Input, OnInit} from '@angular/core';
import {Anfrage} from '@models/on-tour/aenderungswunsch.model';
import {setSelectedTour} from '@app/store/on-tour/actions/on-tour.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-tour-info-container',
  templateUrl: './tour-info-container.component.html',
  styleUrls: ['./tour-info-container.component.scss'],
})
export class TourInfoContainerComponent implements OnInit {
  @Input() tourInfo: Anfrage;
  public show: boolean;
  isCollapsed = false;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  showTourInfo(): void {
    this.isCollapsed = !this.isCollapsed;
    this.show = !this.show;
    this.store.dispatch(setSelectedTour({selectedTour: this.tourInfo}));
  }
}
