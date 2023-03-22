import {Component, OnInit} from '@angular/core';
import {Lightbox} from "ngx-lightbox";
import {Functions} from "../../Global/functions";
import {ReleaseProcessService} from "../../_services/release-process-service/release-process.service";
import {PhotoRelease, PhotoResponse, RejectionReason} from "../../shared/models/reason-rejection.model";
import {TypeResponse} from "../../_services/api";

@Component({
  selector: 'app-release-process',
  templateUrl: './release-process.component.html',
  styleUrls: ['./release-process.component.scss']
})
export class ReleaseProcessComponent implements OnInit {

  public reasonForRejection: RejectionReason[] = [];
  public userTours;
  public sseJsonValue;
  public anzeigeFreigabe: PhotoResponse[] = [];

  public ablehnungGrundCode: string;
  public declinePhotoObject;


  constructor(private lightbox: Lightbox,
              private alertService: Functions,
              private releaseProcessService: ReleaseProcessService) {
  }

  ngOnInit(): void {
    this.getReasonForPhotoRejection();

    setTimeout(() => {
      this.triggerReleaseProcessSSEevent();
    }, 1000);
  }

  getReasonForPhotoRejection() {
    this.releaseProcessService.fetchReasonForPhotoRejection().subscribe((reasonForRejection: RejectionReason[]) => {
      this.reasonForRejection = reasonForRejection;
    });
  }

  triggerReleaseProcessSSEevent() {
    this.releaseProcessService.sseData.subscribe((sseValue: any) => {
      if (sseValue !== null) {
        this.anzeigeFreigabe = sseValue
      }
    });
  }

  isCardOpen() {
    return this.anzeigeFreigabe?.length > 0;
  }

  confirmFreigabe(event) {
    let fotoId;
    this.anzeigeFreigabe.map((freigabe: PhotoResponse) => {
      if (freigabe.tourId === event.tour.tourId) {
        fotoId = freigabe.fotoId;
      }
    });

    const responseObject: PhotoRelease = {
      tourId: event.tour.tourId,
      fotoId: fotoId,
      ringLadesicherungStatus: true,
      ringingPresort: false,
      ringingFahrer: false,
      ringingPresortName: 'Presort',
      ringingFahrerName: 'Fahrer',
      ringingConfirm: true,
      ringingLadesicherungConfirm: true
    };
    //TODO implement service subscribe usw.
   // this.releaseProcessService.sendLoadingEquipment(event.loadingEquipment);

    this.releaseProcessService.sendPhotoRelease(responseObject).subscribe((response: TypeResponse) => {
      if (response.code === '200') {
        this.anzeigeFreigabe.splice(event.index, 1);
        this.alertService.showSnackBar(response.text, 2000);
      } else {
        this.alertService.showErrorSnackBar(response.text, 2000)
      }
    });
  }

  declineFreigabe(event) {
    let fotoId;
    this.anzeigeFreigabe.map((freigabe: PhotoResponse) => {
      if (freigabe.tourId === event.tour.tourId) {
        fotoId = freigabe.fotoId;
      }
    });

    const responseObject: PhotoRelease = {
      tourId: event.tour.tourId,
      fotoId: fotoId,
      ringLadesicherungStatus: false,
      ablehnungGrundCode: event.ablehnungGrundCode,
      ringingPresort: false,
      ringingFahrer: false,
      ringingPresortName: 'Presort',
      ringingFahrerName: 'Fahrer',
      ringingConfirm: true,
      ringingLadesicherungConfirm: true
    };

    this.releaseProcessService.sendPhotoRelease(responseObject).subscribe((response: TypeResponse) => {
      if (response.code === '200') {
        this.anzeigeFreigabe.splice(event.index, 1);
        this.alertService.showSnackBar(response.text, 1500);
      } else {
        this.alertService.showErrorSnackBar(response.text, 1500);
      }
    });
  }
}
