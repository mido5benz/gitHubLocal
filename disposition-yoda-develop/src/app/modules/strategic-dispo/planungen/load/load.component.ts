import {Component, EventEmitter, OnDestroy, Output, TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Planung, Planungen } from '@models/strategic-dispo/planungen.model';
import { PlanungenService } from '@app/core/services/planungen/planungen.service';
import { StrategicTourService } from '@app/core/services/strategic-tour/strategic-tour.service';
import { LayerService } from '@app/core/services';
import { ActiveLayerFacade } from '@store/strategic-dispo/facades/activate-layer.facade';
import { setActiveLayer } from '@store/strategic-dispo/actions/active-layer.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-strategic-dispo-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnDestroy {
  public subscription: Subscription = new Subscription();

  @Output() dataLoaded: EventEmitter<any> = new EventEmitter();

  public planungen: Planungen[];
  public selectedPlanung: Planung = null;
  isSelected = false;
  status: { isOpen: boolean } = { isOpen: false };

  modalRef: BsModalRef;

  public currentLayer: string;

  constructor(
    private planungenService: PlanungenService,
    private alertService: ToastrService,
    private modalService: BsModalService,
    private tourService: StrategicTourService,
    private layerService: LayerService,
    private activeLayerFacade: ActiveLayerFacade
    ) {
      this.subscription.add(this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
        this.currentLayer = layer;
      }));
     }

  laden(id): void {
    if (this.planungenService.getBearbeitung() === true) {
      this.modalRef.hide();
    }
    this.tourService.clearRaster();
    this.planungenService.resetBearbeitung();
    this.tourService.setSelectedTour(undefined);
    this.layerService.deselectTourTable();
    this.tourService.selectTourControl.next(0);
    this.planungenService.getPlanung(id.rastertourenplan_id).subscribe((planung: Planung) => {
      this.planungenService.setActivePlan(
        planung.raster_touren_plan.name,
        planung.raster_touren_plan.rastertourenplan_id,
        planung.raster_touren_plan.beschreibung
      );
      this.planungenService.setLayerPlanung(planung.layer_raster_rahmentour_workflow);
      this.planungenService.setActiveArt('Update');
      this.planungenService.setSamstag(planung.raster_touren_plan.samstag);
      if (planung.raster_touren_plan.samstag === true) {
        this.activeLayerFacade.dispatch(setActiveLayer({ activeLayer: 'samstag' }));
      } else {
        if (this.currentLayer === 'samstag') {
          this.activeLayerFacade.dispatch(setActiveLayer({ activeLayer: 'sattel' }));
        }
      }
      this.alertService.success(
        planung.raster_touren_plan.name +
        ' (' +
        planung.raster_touren_plan.rastertourenplan_id +
        ')' +
        ' erfolgreich geladen!'
      );

      this.dataLoaded.emit();
    });
    this.status.isOpen = !this.status.isOpen;
    this.isSelected = false;
  }

  holePlanungen(): void {
    this.planungenService.getPlanungen().subscribe((planungen: Planungen[]) => {
      this.planungen = planungen;
    });
  }

  enable_button(select): void {
    if (select != null) {
      this.isSelected = true;
    }
  }

  isOpenChange(): void {
  }

  change(value: boolean): void {
    this.status.isOpen = value;
    if (this.isSelected) {
      this.isSelected = false;
    }
    if (this.selectedPlanung != null) {
      this.selectedPlanung = null;
    }
  }

  openModal(template: TemplateRef<any>): void {
    if (this.planungenService.getBearbeitung() === true) {
      this.modalRef = this.modalService.show(template);
    } else {
      this.laden(this.selectedPlanung);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
