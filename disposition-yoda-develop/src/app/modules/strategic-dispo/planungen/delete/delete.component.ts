import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Planung, Planungen, DispoAktivieren } from '@models/strategic-dispo/planungen.model';
import {PlanungenService} from '@app/core/services/planungen/planungen.service';

@Component({
  selector: 'app-strategic-dispo-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  public planung: Planung;
  public planungen: Planungen[];
  public selectedPlanung: Planungen = null;
  isSelected = false;
  status: { isOpen: boolean } = { isOpen: false };

  modalRef: BsModalRef;

  constructor(
    private planungenService: PlanungenService,
    private alertService: ToastrService,
    private modalService: BsModalService
  ) { }

  isPlanungActive(aktiviertePlanungen: DispoAktivieren, planung): boolean {
    for (const key in aktiviertePlanungen) {
      if (aktiviertePlanungen.hasOwnProperty(key)) {
        if (aktiviertePlanungen[key] === planung.rastertourenplan_id) {
          this.alertService.error(planung.name + ' konnte nicht gelöscht werden, da sie aktiviert ist');
          return true;
        }
      }
    }
    return false;
  }

  loeschen(planung): void {
    this.modalRef.hide();
    forkJoin([
      this.planungenService.getAktiviertePlanungen(),
      this.planungenService.getAktiviertePlanungenZukunft()
    ]).subscribe(([aktiviertePlanungen, aktiviertePlanungenZukunft]) => {
      const isActive = this.isPlanungActive(aktiviertePlanungen, planung);
      const isActiveZukunft = this.isPlanungActive(aktiviertePlanungenZukunft, planung);
      if (!isActive || !isActiveZukunft) {
        this.planungenService
          .deletePlanung(planung.rastertourenplan_id)
          .pipe(
            map(() => this.alertService.success(planung.name + ' erfolgreich gelöscht!')),
            catchError((error) => of(null))
          ).subscribe();
      }
    });

    this.status.isOpen = !this.status.isOpen;
    if (this.isSelected) {
      this.isSelected = false;
    }
  }

  holePlanungen(): void {
    this.planungen = null;
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
    this.modalRef = this.modalService.show(template);
  }
}
