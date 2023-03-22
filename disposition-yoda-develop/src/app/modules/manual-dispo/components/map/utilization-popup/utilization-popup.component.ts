import {Component, Input, OnInit} from '@angular/core';
import {Tour} from '@models/index';
import {DispoStopp, Consignment} from '@models/tour/tour.model';
import {TourService} from '@app/core/services';

@Component({
  templateUrl: 'utilization-popup.component.html',
  styleUrls: ['./utilization-popup.component.scss'],
})
export class UtilizationPopupComponent implements OnInit {
  @Input() tour: Tour;

  public preReloadTourInfo;
  public postReloadTourInfo;

  public fahrtzeit: number = null;

  public maxFahrtzeitInSec = 28800; // 8h
  public loading = true;

  constructor(private tourService: TourService) {
  }

  ngOnInit(): void {
    const stoppsPreReload =
      this.tour.dispostopps.filter((stopp: DispoStopp) => stopp.nachladebereich === '0' || stopp.nachladebereich === null);
    const stoppsPostReload = this.tour.dispostopps.filter((stopp: DispoStopp) => stopp.nachladebereich === '1');

    this.getPreReloadLineInfo(stoppsPreReload);
    this.getPostReloadLineInfo(stoppsPostReload);

    this.fahrtzeit = this.tour.planTourdauer;
  }

  getPreReloadLineInfo(dispoStopps: DispoStopp[]): any {
    // const weight = this.tourService.calculateTotalWeight(dispoStopps);
    // const colli = this.tourService.calculateTotalColli(dispoStopps);
    // const paletten = this.tourService.calculateTotalPalettes(dispoStopps);

    this.preReloadTourInfo = {
      weight: 0,
      colli: 0,
      paletten: 0
    };
  }

  getPostReloadLineInfo(dispoStopps: DispoStopp[]): any {
    // const weight = this.tourService.calculateTotalWeight(dispoStopps);
    // const colli = this.tourService.calculateTotalColli(dispoStopps);
    // const paletten = this.tourService.calculateTotalPalettes(dispoStopps);

    this.postReloadTourInfo = {
      weight: 0,
      colli: 0,
      paletten: 0
    };
  }
}
