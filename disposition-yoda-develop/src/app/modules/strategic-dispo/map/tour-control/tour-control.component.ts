import {ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {StrategicTour} from '@models/strategic-dispo/strategic-tour.model';
import {StrategicTourService} from '@app/core/services/strategic-tour/strategic-tour.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MapService} from '../map.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  templateUrl: 'tour-control.component.html',
  styleUrls: ['./tour-control.component.scss']
})
export class TourControlComponent implements DoCheck, OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public offeneTouren: StrategicTour[] = [];
  public alleTouren: StrategicTour[] = [];

  public showList: Observable<boolean>;
  public show: boolean;
  public loading = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public tourService: StrategicTourService,
    private spinner: NgxSpinnerService,
    public mapService: MapService
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.mapService.showTourControl.subscribe((result: boolean) => {
        this.show = result;
        this.changeDetectorRef.detectChanges();
      })
    );
    this.showList = this.mapService.showTourControl;
    this.spinner.show();
  }

  ngDoCheck(): void {
    this.updateOffeneTouren();
  }

  public updateOffeneTouren(): void {
    this.loading = true;
    this.subscription.add(
      this.tourService.getTours().subscribe((touren: StrategicTour[]) => {
        this.alleTouren = touren.filter((tour: StrategicTour) => tour.fahrzeugart_id !== 2345);
        this.offeneTouren = this.alleTouren.filter((tour: StrategicTour) => !tour.raster_total || tour.raster_total.length === 0);
        this.offeneTouren.sort((a: StrategicTour, b: StrategicTour) => a.tournr < b.tournr ? -1 : 1);
        this.loading = false;
      })
    );

  }

  public open(): void {
    this.mapService.showTourControl.next(true);
  }

  public close(): void {
    this.mapService.showTourControl.next(false);
  }

  public convertTourNr(tourNr: string): string {
    let convertedTourNr = tourNr;

    if (convertedTourNr) {
      convertedTourNr = convertedTourNr.slice(0, 1) + '-' + convertedTourNr.slice(1);
    }

    return convertedTourNr;
  }

  public selectTour(tourid): void {
    this.tourService.selectTourControl.next(tourid);
  }

  ngOnDestroy(): void {
    this.changeDetectorRef.detach();
    this.subscription.unsubscribe();
  }

}
