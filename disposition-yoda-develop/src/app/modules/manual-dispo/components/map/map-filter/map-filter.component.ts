import {
  Component, EventEmitter, OnChanges, OnInit,
  Output, SimpleChanges, ViewChild
} from '@angular/core';
import {FilterInputControlComponent} from '@app/shared/component/filter-input-control/filter-input-control.component';
import {TourFilterInputControlComponent} from '@app/shared/component/tour-filter-input-control/tour-filter-input-control.component';
import {Observable} from 'rxjs';
import {MapFilterFacade} from '@store/manual-dispo/map/facades/map-filter.facade';
import {ManualDispoUiFacade} from '@store/ui/facades/manual-dispo/manual-dispo-ui.facade';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
})
export class MapFilterComponent implements OnInit {
  @Output()
  applyFilter = new EventEmitter<any>();

  @ViewChild('tourFilter')
  tourFilterComponent: TourFilterInputControlComponent;

  @ViewChild('serviceFilter')
  serviceFilterComponent: FilterInputControlComponent;

  public tourFilters$: Observable<any>;
  public serviceFilter$: Observable<any>;

  public tours = [];
  public services = [];
  public vehicleType: string;
  public semitrailer: boolean;
  public truck: boolean;
  public combine: boolean;

  constructor(
    private filterFacade: MapFilterFacade,
    private uiDispoFacade: ManualDispoUiFacade) {
  }

  ngOnInit(): void {
    this.tourFilters$ = this.filterFacade.tourFilter$;
    this.serviceFilter$ = this.filterFacade.serviceFilter$;
    this.filterFacade.vehicleTypeFilter$
      .subscribe((vehicleType) => (this.vehicleType = vehicleType));
    this.filterFacade.semiTrailerFilter$
      .subscribe((semiTrailer: boolean) => (this.semitrailer = semiTrailer));
    this.filterFacade.truckFilter$
      .subscribe((truck: boolean) => (this.truck = truck));
    this.filterFacade.combineFilter$.subscribe((combine: boolean) => (this.combine = combine));

    if (this.combine) {
      this.semitrailer = true;
      this.truck = true;
    }
  }

  applyFilterClicked(): void {
    if (this.semitrailer && this.truck) {
      this.applyFilter.emit({
        toursFilter: this.tours,
        servicesFilter: this.services,
        vehicleType: this.vehicleType,
        semitrailer: false,
        truck: false,
        combine: true
      });
    } else {
      this.applyFilter.emit({
        toursFilter: this.tours,
        servicesFilter: this.services,
        vehicleType: this.vehicleType,
        semitrailer: this.semitrailer,
        truck: this.truck,
        combine: false
      });
    }
  }

  resetMapFilters(): void {
    this.tours = [];
    this.services = [];
    this.vehicleType = '0';
    this.semitrailer = false;
    this.truck = false;
    this.combine = false;

    this.filterFacade.resetFilter();
    this.tourFilterComponent.reset();
    this.serviceFilterComponent.reset();

    this.closePopUp();
  }

  closePopUp(): void {
    this.uiDispoFacade.toggleMapFilter();
  }
}
