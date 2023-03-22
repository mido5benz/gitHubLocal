import { Component, OnInit } from '@angular/core';
import { Anfrage } from '@models/on-tour/aenderungswunsch.model';
import { selectAllTours } from '@app/store/on-tour/selectors/on-tour.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchOnTourlistRequest } from '@app/store/on-tour/actions/on-tour.actions';

@Component({
  selector: 'app-on-tour-dashboard-view',
  templateUrl: './on-tour-dashboard-view.component.html',
  styleUrls: ['./on-tour-dashboard-view.component.scss'],
})
export class OnTourDashboardViewComponent implements OnInit {
  allTours$: Observable<Anfrage>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
  }

  refreshOnTour() {
    this.fetchData();
  }

  fetchData() {
    this.store.dispatch(fetchOnTourlistRequest());
    this.allTours$ = this.store.pipe(select(selectAllTours));
  }
}
