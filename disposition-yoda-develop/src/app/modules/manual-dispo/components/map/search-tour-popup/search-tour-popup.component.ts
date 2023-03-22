import {
  ChangeDetectorRef, Component,
  EventEmitter, Input, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {DispoStopp, SelectedTour, Tour} from '@models/index';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {noop, Observable, Observer, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {addStopps, setTargetTour, setTargetTourString, stoppClicked} from '@store/manual-dispo/reschedule/actions/reschedule.actions';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';

@Component({
  selector: 'app-search-tour-popup',
  templateUrl: './search-tour-popup.component.html',
  styleUrls: ['./search-tour-popup.component.scss'],
})
export class SearchTourPopupComponent implements OnInit, OnDestroy {

  @Input() stopps: DispoStopp[];

  @Output() moveStopp = new EventEmitter<number>();

  public selectedTour: any;

  public tourNr: string;
  public dataSource$: Observable<any[]>;
  public typeaheadLoading: boolean;


  constructor(
    private selectedTourFacade: SelectedTourFacade,
    private tourListFacade: TourlistFacade,
    private rescheduleFacade: RescheduleFacade,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataSource$ = new Observable((observer: Observer<string>) => {
      observer.next(this.tourNr);
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          return this.tourListFacade.searchTour(query).pipe(
            map((data: any) => data || []),
            tap(
              () => noop,
              (err) => {
                // in case of http error
              }
            )
          );
        }
        return of([]);
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedTour = event.item;

    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  moveStopps(): void {
    // this.rescheduleFacade.dispatch(setTargetTour({tour: selectedTour}));
    this.moveStopp.emit(this.selectedTour.tour_id);
    this.rescheduleFacade.dispatch(setTargetTourString({tournr: this.tourNr}));
    this.rescheduleFacade.dispatch(stoppClicked({stopps: this.stopps}));
  }

  moveStoppsToCurrentSelectedTour(): void {
    // this.moveStopp.emit({tourId: this.tourId, dispoStopps: this.stopps});
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }
}



