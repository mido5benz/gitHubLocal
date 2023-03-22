import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {RescheduleService} from '@app/core/services/reschedule/reschedule.service';
import {DispoStopp, UmdispoEvent} from '@shared/models';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {MapService} from '@app/core/services/map/map.service';


@Component({
  selector: 'app-update-tours',
  templateUrl: './update-tours.component.html',
  styleUrls: ['./update-tours.component.scss']
})
export class UpdateToursComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  targetTourNr: string;
  selectedStopps: string [] = [];
  jsonValue;

  public tourList: UmdispoEvent[] = [];

  constructor(private tourListFacade: TourlistFacade,
              private cd: ChangeDetectorRef,
              private rescheduleService: RescheduleService,
              private umdispoFacade: RescheduleFacade,
              private alertService: ToastrService,
              private mapService: MapService) {
  }


  ngOnInit(): void {
    this.triggerUmdispoSSEevent();
    this.checkTourlistIsSynchronized();
  }

  triggerUmdispoSSEevent() {
    this.subscription.add(this.mapService.umdispoEventInfo.subscribe((umdispoEvent: any) => {
      if (umdispoEvent !== null) {
        this.tourList.push(umdispoEvent);
        this.tourList = this.tourList.filter((v, i, a) => a.findIndex(t => (t.tour_nr === v.tour_nr)) === i);
        this.tourList.sort((a, b) => a.tour_nr < b.tour_nr ? -1 : a.tour_nr > b.tour_nr ? 1 : 0);

        this.selectedStopps.map((stopps) => {
          if (this.targetTourNr === umdispoEvent.tour_nr || stopps === umdispoEvent.tour_nr) {
            this.tourList = this.tourList.filter(tour => tour.tour_nr !== umdispoEvent.tour_nr);
          }
        });
        this.checkCount();
      }
    }));
  }

  show: boolean = false;

  checkTourlistIsSynchronized() {
    this.subscription.add(this.umdispoFacade.targetTourString$.subscribe((targetTourString: string) => {
      if (targetTourString !== null && targetTourString !== undefined) {
        this.targetTourNr = targetTourString;
        if (this.tourList.some(tour => tour.tour_nr === targetTourString)) {
          this.alertService.info('Die Touren sind nicht Synchron! Bitte Touren aktualisieren.');
          return;
        }
      }
    }));

    this.subscription.add(this.umdispoFacade.targetTour$.subscribe((targetTour: any) => {
      if (targetTour !== null && targetTour !== undefined) {
        this.targetTourNr = targetTour.tournr;
        if (this.tourList.some(tour => tour.tour_nr === targetTour.tournr)) {
          this.alertService.info('Die Touren sind nicht Synchron! Bitte Touren aktualisieren.');
          return;
        }
      }
    }));

    this.subscription.add(this.umdispoFacade.allSelectedStopps$.subscribe((selectedCluster) => {
      if (selectedCluster.length !== 0) {
        selectedCluster.map((cluster: DispoStopp) => {
          this.selectedStopps.push(cluster.tournr);
          this.tourList.map((tour: UmdispoEvent) => {
            if (cluster.tournr === tour.tour_nr) {
              this.show = true;
            }
          });
        });
      }
      if (this.show) {
        this.alertService.info('Der gewählte Stopp befindet sich in einer Tour, die nicht mehr synchron ist. Bitte aktualisieren Sie die Tourliste!');
        this.show = false;
      }
    }));
  }

  fetchTourlists() {
    this.tourListFacade.dispatch(fetchTourListRequest());
    this.tourList = [];
    this.alertService.success('Die Touren werden synchronisiert...');
  }

  checkCount() {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cd.detach();
  }


}
