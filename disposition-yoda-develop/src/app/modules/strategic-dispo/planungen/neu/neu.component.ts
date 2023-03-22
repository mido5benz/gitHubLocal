import {Component, EventEmitter, OnDestroy, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {PlanungenService} from '@app/core/services/planungen/planungen.service';
import {StrategicTourService} from '@app/core/services/strategic-tour/strategic-tour.service';
import {RasterService} from '@app/core/services/raster/raster.service';
import {LayerService} from '@app/core/services';
import {ActiveLayerFacade} from '@store/strategic-dispo/facades/activate-layer.facade';
import {setActiveLayer} from '@store/strategic-dispo/actions/active-layer.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-strategic-dispo-neu',
  templateUrl: './neu.component.html',
  styleUrls: ['./neu.component.scss'],
})
export class NeuComponent implements OnDestroy{
  public subscription: Subscription = new Subscription();

  @Output() dataLoaded: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;

  public currentLayer: string;

  status: { isOpen: boolean } = {isOpen: false};

  constructor(
    private planungenService: PlanungenService,
    private alertService: ToastrService,
    private modalService: BsModalService,
    private tourService: StrategicTourService,
    private rasterService: RasterService,
    private layerService: LayerService,
    private activeLayerFacade: ActiveLayerFacade
  ) {
    this.subscription.add(this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
      this.currentLayer = layer;
    }));
  }

  neuePlanungWochentag(): void {
    this.status.isOpen = !this.status.isOpen;
    if (this.planungenService.getBearbeitung() === true) {
      this.modalRef.hide();
    }
    this.planungenService.setActiveArt('Neu');
    this.rasterService.currentRaster.next(0);
    this.planungenService.resetBearbeitung();
    this.layerService.deselectTourTable();
    this.planungenService.setSamstag(false);
    this.tourService.setSelectedTour(undefined);
    this.tourService.selectTourControl.next(0);
    this.planungenService.setActivePlan('Neue Planung', null, 'Beschreibung');
    this.tourService.clearRaster();
    this.alertService.success(
      'Neue Planung erstellt! Muss später gespeichert werden!'
    );
    if (this.currentLayer === 'samstag') {
      this.activeLayerFacade.dispatch(setActiveLayer({activeLayer: 'sattel'}));
    }

    this.dataLoaded.emit();
  }

  neuePlanungSamstag(): void {
    this.status.isOpen = !this.status.isOpen;
    if (this.planungenService.getBearbeitung() === true) {
      this.modalRef.hide();
    }
    this.planungenService.setActiveArt('Neu');
    this.planungenService.resetBearbeitung();
    this.layerService.deselectTourTable();
    this.planungenService.setSamstag(true);
    this.tourService.setSelectedTour(undefined);
    this.tourService.selectTourControl.next(0);
    this.planungenService.setActivePlan('Neue Planung Samstag', null, 'Beschreibung');
    this.tourService.clearRaster();
    this.alertService.success(
      'Neue Planung erstellt! Muss später gespeichert werden!'
    );
    this.activeLayerFacade.dispatch(setActiveLayer({activeLayer: 'samstag'}));
    this.dataLoaded.emit();
  }

  openModal(template: TemplateRef<any>, samstag: boolean): void {
    if (this.planungenService.getBearbeitung() === true) {
      this.modalRef = this.modalService.show(template);
    } else {
      if (samstag === true) {
        this.neuePlanungSamstag();
      } else {
        this.neuePlanungWochentag();
      }
    }
  }

  isOpenChange(): void {
  }

  change(value: boolean): void {
    this.status.isOpen = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
