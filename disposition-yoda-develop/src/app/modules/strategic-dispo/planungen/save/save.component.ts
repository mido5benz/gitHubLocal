import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Planung, Planungen } from '@models/strategic-dispo/planungen.model';
import { PlanungenService } from '@app/core/services/planungen/planungen.service';
import { StrategicTourService } from '@app/core/services/strategic-tour/strategic-tour.service';


@Component({
  selector: 'app-strategic-dispo-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss'],
})
export class SaveComponent {
  public planung: Planung;
  public planungen: Planungen[];

  public name: string = null;
  public beschreibung: string = null;
  public tempName: string;
  public tempBeschreibung: string;

  status: { isOpen: boolean } = { isOpen: false };
  public filled = false;

  modalRef: BsModalRef;

  constructor(
    public planungenService: PlanungenService,
    private tourService: StrategicTourService,
    private alertService: ToastrService,
    private modalService: BsModalService,
  ) { }

  holePlanungen(): void {
    this.planungenService.getPlanungen().subscribe((planungen: Planungen[]) => {
      this.planungen = planungen;
    });
  }

  get currentPlaning(): string {
    return this.planungenService.getActivePlanName();
  }

  isOpenChange(): void {
  }

  change(value: boolean): void {
    this.status.isOpen = value;
    if (this.filled) {
      this.filled = false;
    }
    if (this.name != null || this.beschreibung != null) {
      this.name = null;
      this.beschreibung = null;
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.tempName = this.name;
    this.tempBeschreibung = this.beschreibung;
  }

  openModalKopie(templateKopie: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(templateKopie);
  }

  speichernNeu(): void {
    this.modalRef.hide();
    if (this.planungenService.getSamstag() === true) {
       if (this.name) {
        this.name = '[S]-' + this.name;
        this.tempName = this.name;
       }
    }

    if (this.name && this.beschreibung) {
      this.planungenService.putPlanungNeu(
        this.name,
        this.beschreibung,
        this.tourService.getPlanung()
      );
      this.status.isOpen = !this.status.isOpen;
    } else {
      this.alertService.error('Felder nicht befüllt!');
    }
  }

  speichernUpdate(): void {
    this.modalRef.hide();
    this.planungenService.putPlanungUpdate(
      this.planungenService.getActivePlanId(),
      this.planungenService.getActivePlanName(),
      this.planungenService.getActivePlanBeschreibung(),
      this.tourService.getPlanung()
    );
    this.status.isOpen = !this.status.isOpen;
  }
}
