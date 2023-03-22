import {Component, OnInit} from '@angular/core';
import {PalletService} from '@app/core/services/pallet/pallet.service';
import {StrategicTourService} from '@app/core/services/strategic-tour/strategic-tour.service';
import {Empfaenger, Pallet} from '@models/strategic-dispo/pallet.model';
import {StrategicTour} from '@models/strategic-dispo/strategic-tour.model';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-recipient-modal',
  templateUrl: './recipient-modal.component.html',
  styleUrls: ['./recipient-modal.component.scss']
})
export class RecipientModalComponent implements OnInit {

  public tournr;
  public empfaengerNamen = [];
  public loading = false;

  constructor(
    private palletService: PalletService,
    private tourService: StrategicTourService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.loading = true;
    this.holeRecipients();
  }

  async holeRecipients(): Promise<void> {
    const resultSattel: Pallet[] = await this.palletService.getGrossposten('SATTEL').toPromise();
    const resultLkw: Pallet[] = await this.palletService.getGrossposten('LKW').toPromise();
    this.tourService.getTours().subscribe((touren: StrategicTour[]) => {
      touren.forEach((tour: StrategicTour) => {
        if (tour.raster_sattel) {
          tour.raster_sattel.forEach((raster: any) => {
            if (tour.tournr === this.tournr) {
              resultSattel.forEach((empfaenger: Pallet) => {
                if (raster.id === empfaenger.georaster_id) {
                  empfaenger.empfaenger.forEach((namen: Empfaenger) => {
                    this.empfaengerNamen.push(namen.name1);
                  });
                }
              });
            }
          });
        } else if (tour.raster_lkw) {
          tour.raster_lkw.forEach((raster: any) => {
            if (tour.tournr === this.tournr) {
              resultLkw.forEach((empfaenger: Pallet) => {
                if (raster.id === empfaenger.georaster_id) {
                  empfaenger.empfaenger.forEach((namen: Empfaenger) => {
                    this.empfaengerNamen.push(namen.name1);
                  });
                }
              });
            }
          });
        }
      });
      this.loading = false;
    });
  }
}
