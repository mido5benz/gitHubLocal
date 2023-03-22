import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SendungDetailService} from '@app/core/services/lib/sendung-detail/sendung-detail.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-tour-sendungs-detail-view',
  templateUrl: './tour-sendungs-detail-view.component.html',
  styleUrls: ['./tour-sendungs-detail-view.component.scss']
})
export class TourSendungsDetailViewComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  tour_id?: number;
  dispostopp_id?: number;
  tournr?: string;
  soll_stopp?: string;
  empfaenger?: string;
  sendungsId?: number;
  unverplanteStopp?: boolean = false;

  dienste;
  scannung = true;

  sendungsereignisse;
  dispoDetails;
  colliereignisse;
  gefahrgueter;
  sendungsdaten = [];
  sendungskette = [];
  sendungskettenDaten = [];

  constructor(private route: ActivatedRoute, private libService: SendungDetailService) {
    this.route.queryParams.subscribe((params: any) => {
      this.tour_id = params.tour_id;
      this.dispostopp_id = params.dispostopp_id;
      this.tournr = params.tournr;
      this.soll_stopp = params.soll_stopp;
      this.empfaenger = params.empfaenger;
      this.sendungsId = params?.sendungsId;
      this.unverplanteStopp = params?.unverplanteStopp;
    });
  }

  ngOnInit(): void {
   this.subscription.add(this.libService.requestSendungsDetailFromMultipleSources(this.sendungsId).subscribe((resultList) =>{
      this.sendungsereignisse = resultList[0];
      this.dispoDetails = resultList[1];
      this.colliereignisse = resultList[2];
      this.gefahrgueter = resultList[3];
      this.sendungsdaten.push(resultList[4]);
      this.dienste = resultList[5];
      this.sendungskette.push(resultList[6]);

      this.sendungskette[0].forEach((sendungenId) => {
        this.getSendungskette(sendungenId);
      });
    }));
  }

  putCorrectedValues(values) {
    if (values !== null) {
      let correctedForm = values;
      if (correctedForm.sendungId === null) {
        correctedForm.sendungId = this.sendungsId;
      }
      this.libService.sendCorrectedValues(correctedForm, this.sendungsId).subscribe((nachfolger: any) => {
        this.libService.getCorrectedValues(nachfolger.sendungId).subscribe((nachfolgerObject: any) => {
          this.sendungsdaten = [];
          this.sendungsdaten.push(nachfolgerObject);
          this.sendungsId = nachfolgerObject.sendungId;
        });
        this.getSendungskette(nachfolger.sendungId);
      });
    }
  }

  getSendungskette(sendungenId) {
    this.libService.getSendungsDaten(sendungenId, this.scannung).subscribe((sendungsDaten) => {
      this.sendungskettenDaten.push(sendungsDaten);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
