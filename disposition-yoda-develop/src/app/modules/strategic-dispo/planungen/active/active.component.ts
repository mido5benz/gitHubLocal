import { Component } from '@angular/core';
import { PlanungenService } from '@app/core/services/planungen/planungen.service';
import { StrategicTourService } from '@app/core/services/strategic-tour/strategic-tour.service';
import { StrategicTour } from '@models/strategic-dispo/strategic-tour.model';

@Component({
  selector: 'app-strategic-dispo-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})

export class ActiveComponent {

  constructor(
    private planService: PlanungenService,
    private tourService: StrategicTourService
  ) { }

  get currentPlaning(): string {
    return this.planService.getActivePlanName();
  }

  get inBearbeitung(): boolean {
    return this.planService.getBearbeitung();
  }

  get currentTour(): StrategicTour {
    return this.tourService.getSelectedTour();
  }

  public convertTourNr(tourNr: string): string {
    let convertedTourNr = tourNr;

    if (convertedTourNr) {
      convertedTourNr =
        convertedTourNr.slice(0, 1) + '-' + convertedTourNr.slice(1);
    }

    return convertedTourNr;
  }
}
