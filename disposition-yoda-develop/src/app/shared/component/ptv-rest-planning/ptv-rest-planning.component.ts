import {Component, OnInit, TemplateRef} from '@angular/core';
import {MapService} from '@app/core/services/map/map.service';
import {ToastrService} from 'ngx-toastr';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-ptv-rest-planning',
  templateUrl: './ptv-rest-planning.component.html',
  styleUrls: ['./ptv-rest-planning.component.scss']
})
export class PtvRestPlanningComponent implements OnInit {
  public layers = [
    {
      name: 'Bus',
      code: 1
    },
    {
      name: 'Lkw',
      code: 2
    },
    {
      name: 'Sattel',
      code: 3
    }
  ];
  public modalRef: BsModalRef;

  public layerCode = null;

  constructor(private mapService: MapService,
              private alertService: ToastrService,
              private tourListFacade: TourlistFacade,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.layerCode = 0;
  }

  triggerPtvPlanning(code: number) {
    this.layerCode = code;
  }

  triggerPtvCalculation() {
    this.mapService.isMaschinelleDispoStarted(true);
    this.mapService.startPTVPlanning(this.layerCode).subscribe((ptvPlanning) => {
      if (ptvPlanning) {
        this.alertService.success('PTV Restverplanung erfolgreich angestoßen');
      } else {
        this.alertService.error('Es ist ein Fehler aufgetreten! PTV Restverplanung konnte nicht durchgeführt werden.');
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
