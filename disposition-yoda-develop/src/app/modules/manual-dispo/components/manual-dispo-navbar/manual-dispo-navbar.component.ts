import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MapService} from '@app/core/services/map/map.service';
import {DeliveryDay} from '@shared/models';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {RescheduleService} from '@app/core/services/reschedule/reschedule.service';
import {fetchCounterSuccess} from '@store/on-tour/actions/on-tour.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {MapFilterFacade} from '@store/manual-dispo/map/facades/map-filter.facade';

@Component({
  selector: 'app-manual-dispo-navbar',
  templateUrl: './manual-dispo-navbar.component.html',
  styleUrls: ['./manual-dispo-navbar.component.scss']
})
export class ManualDispoNavbarComponent implements OnInit, OnChanges {

  @Input() mapFilterCollapsed: boolean;
  @Input() unassignedAddressesCount: number;
  @Input() unassignedStopCount: number;
  @Input() tagesAbschlussDone: boolean;

  @Output() toggleMapFilterClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() filterMapClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() tagesAbschlussClicked: EventEmitter<any> = new EventEmitter<any>();

  public hasEmergencyButtonRole;
  public deliveryDayToCheck: DeliveryDay;
  public deliveryDayToDisplay: DeliveryDay;

  public activatedMapFilter: boolean;
  public selectedTour: boolean;
  public serviceFilter: boolean;
  public sattel: boolean;
  public truck: boolean;
  public combine: boolean;


  constructor(
    private router: Router,
    private rescheduleService: RescheduleService,
    private mapService: MapService,
    private store: Store,
    private tourListFacade: TourlistFacade,
    private filterFacade: MapFilterFacade) {
  }

  ngOnInit(): void {
    this.mapService.ausliefertagObserv.subscribe((res) => {
      if (res) {
       this.deliveryDayToDisplay = res
        this.deliveryDayToCheck = res

            let dateToCheck = this.deliveryDayToCheck.value.split('.');
            let deliveryDay = new Date();
            let today = new Date();


            deliveryDay.setDate(+dateToCheck[0]);
            deliveryDay.setMonth(+dateToCheck[1] - 1);
            deliveryDay.setFullYear(+dateToCheck[2], (+dateToCheck[1] - 1), +dateToCheck[0]);

            if (deliveryDay < today) {
              this.router.navigate(['error']);
            }
          }
    });
    this.reloadTourList();

    this.hasEmergencyButtonRole = sessionStorage.getItem('hasEmergencyButtonRight');

    this.filterFacade.tourFilter$.subscribe((tour) => {
      tour.length > 0 ? this.selectedTour = true : this.selectedTour = false;
    });

    this.filterFacade.serviceFilter$.subscribe((usedMapFilter: string[]) => {
      usedMapFilter.length > 0 ? this.serviceFilter = true : this.serviceFilter = false;
    });
    this.filterFacade.semiTrailerFilter$.subscribe((sattel) => {
      this.sattel = sattel;
    });
    this.filterFacade.truckFilter$.subscribe((truck) => {
      this.truck = truck;
    });
    this.filterFacade.combineFilter$.subscribe((combine) => {
      this.combine = combine;
    });
  }

  toggleMapFilter(): void {
    this.toggleMapFilterClicked.emit();
  }

  applyMapFilter(event): void {
    this.filterMapClicked.emit(event);
  }

  showTagedAbschluss(): void {
    this.tagesAbschlussClicked.emit();
  }

  goToMap(): void {
    this.router.navigate(['manual-dispo']);
  }

  goToSpontaneousTakeover() {
    this.router.navigate(['spontane-uebernahme']);
  }

  reloadTourList(): void {
    this.tourListFacade.dispatch(fetchTourListRequest());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedTour || this.serviceFilter || this.sattel || this.truck || this.combine) {
      this.activatedMapFilter = true;
    } else {
      this.activatedMapFilter = false;
    }
  }

}
