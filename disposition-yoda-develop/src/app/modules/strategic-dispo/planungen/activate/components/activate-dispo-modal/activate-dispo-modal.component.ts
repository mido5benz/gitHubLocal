import { Component, OnInit } from '@angular/core';
import {
  DispoAktivieren,
  Planung,
  Planungen,
} from '@models/strategic-dispo/planungen.model';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PlanungenService } from '@app/core/services/planungen/planungen.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activate-dispo-modal',
  templateUrl: './activate-dispo-modal.component.html',
  styleUrls: ['./activate-dispo-modal.component.scss'],
})
export class ActivateDispoModalComponent implements OnInit {
  public planung: Planung;
  public planungen: Planungen[];
  public planungenName: Planungen[];
  public planungenSamstag: Planungen[];
  public aktiviertePlanungen: DispoAktivieren = {
    standard: null,
    montag: null,
    dienstag: null,
    mittwoch: null,
    donnerstag: null,
    freitag: null,
    samstag: null,
  };
  public aktiviertePlanungenZukunft: DispoAktivieren = {
    standard: null,
    montag: null,
    dienstag: null,
    mittwoch: null,
    donnerstag: null,
    freitag: null,
    samstag: null,
  };
  public aktiviertePlanungenName = {
    standard: '',
    montag: '',
    dienstag: '',
    mittwoch: '',
    donnerstag: '',
    freitag: '',
    samstag: '',
  };
  public aktiviertePlanungenZukunftName = {
    standard: '',
    montag: '',
    dienstag: '',
    mittwoch: '',
    donnerstag: '',
    freitag: '',
    samstag: '',
  };

  constructor(
    private planungenService: PlanungenService,
    private alertService: ToastrService,
    private bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService
  ) {}

  public loading1 = false;
  public loading2 = false;

  ngOnInit(): void {
    this.spinner.show();
    this.loading1 = true;
    this.loading2 = true;
    this.holePlanungen();
  }

  holePlanungen(): void {
    this.planungenService.getPlanungen().subscribe((planungen: Planungen[]) => {
      this.planungenName = planungen;
      this.planungen = planungen.filter(planung => planung.samstag !== true);
      this.planungenSamstag = planungen.filter(planung => planung.samstag === true);
      this.holeAktiviertePlanungen();
    });
  }

  setPlanungenNamen(aktiviertePlanungen, aktiviertePlanungenName): void {
    this.planungenName.forEach((planung) => {
      for (const [key, value] of Object.entries(aktiviertePlanungen)) {
        if (value !== 0) {
          if (planung.rastertourenplan_id === value) {
            aktiviertePlanungenName[key] = planung.name;
          }
        }
      }
    });
  }

  setPlanungenZukunftNamen(aktiviertePlanungen, aktiviertePlanungenZukunftName): void {
    this.planungenName.forEach((planung) => {
      for (const [key, value] of Object.entries(aktiviertePlanungen)) {
        if (value !== 0) {
          if (planung.rastertourenplan_id === value) {
            aktiviertePlanungenZukunftName[key] = planung.name;
          }
        }
      }
    });
  }

  holeAktiviertePlanungen(): void {
    this.planungenService
      .getAktiviertePlanungen()
      .subscribe((aktiviertePlanungen: DispoAktivieren) => {
        this.aktiviertePlanungen = aktiviertePlanungen;
        this.setPlanungenNamen(
          this.aktiviertePlanungen,
          this.aktiviertePlanungenName
        );
        this.loading1 = false;
      });
    this.planungenService
      .getAktiviertePlanungenZukunft()
      .subscribe((aktiviertePlanungen: DispoAktivieren) => {
        this.aktiviertePlanungenZukunft = aktiviertePlanungen;
        this.setPlanungenZukunftNamen(
          this.aktiviertePlanungenZukunft,
          this.aktiviertePlanungenZukunftName
        );
        this.loading2 = false;
      });
  }

  aktivieren(): void {
    this.loading1 = true;
    this.planungenService
      .postDispoAktivieren(this.aktiviertePlanungenZukunft)
      .subscribe((result: any) => {
        this.alertService.success(result.value);
        this.loading1 = false;
        this.bsModalRef.hide();
      });
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
