import {Component, Input, OnInit} from '@angular/core';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {TourService} from '@app/core/services';
import {setSelectedTourId} from '@store/manual-dispo/tour/actions/selected-tour.actions';

@Component({
  selector: 'app-tour-details-header',
  templateUrl: './tour-details-header.component.html',
  styleUrls: ['./tour-details-header.component.scss']
})
export class TourDetailsHeaderComponent implements OnInit {

  @Input() tourNr: string;
  @Input() frozen: boolean;

  public abgefertigt: boolean;
  public freeze: boolean;
  public showReloadIcon: boolean;
  public tourId: number;

  constructor(
    private selectedTourFacade: SelectedTourFacade,
    private tourListFacade: TourlistFacade,
    private tourService: TourService) {
  }

  ngOnInit(): void {
    this.selectedTourFacade.abgefertigt$.subscribe((a) => {
      this.abgefertigt = a;
    });

    this.selectedTourFacade.frozen$.subscribe((freeze) => {
      this.freeze = freeze;
    });

    this.selectedTourFacade.stopps$.subscribe((stopps) => {
      stopps.map((stopp) => {
        this.tourId = stopp.tour_id;
        this.showReloadIcon = !this.abgefertigt && !this.freeze && stopp.soll_stopp === null;
      });
    });
  }

  reloadData() {
    this.tourService.stoppreihenfolgeNeuBerechnen(this.tourId).subscribe((tourNeuBerechnet) => {
      if(tourNeuBerechnet.status === 200) {
        this.selectedTourFacade.dispatch(setSelectedTourId({id: this.tourId}));
      }
    })
  }

}
