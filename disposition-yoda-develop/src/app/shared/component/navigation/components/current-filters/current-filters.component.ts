import { Component, Input, OnInit } from '@angular/core';
import { resetMapFilter } from '@store/manual-dispo/map/actions/map-filter.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-current-filters',
  templateUrl: './current-filters.component.html',
  styleUrls: ['./current-filters.component.scss'],
})
export class CurrentFiltersComponent implements OnInit {
  @Input() tourFilters;
  @Input() serviceFilters;
  @Input() vehicleType: string;
  @Input() semitrailer: boolean;
  @Input() truck: boolean;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  filterInactive(): boolean {
    return (
      !this.truck &&
      !this.semitrailer &&
      this.vehicleType === '0' &&
      this.serviceFilters.length === 0 &&
      this.tourFilters.length === 0
    );
  }

  resetFilters(): void {
    this.store.dispatch(resetMapFilter());
  }
}
