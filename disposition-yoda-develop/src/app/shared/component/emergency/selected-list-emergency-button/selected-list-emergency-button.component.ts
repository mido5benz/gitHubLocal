import {Component, OnInit, TemplateRef} from '@angular/core';
import {EmergencyButtonService} from '@app/core/services/emergency-button/emergency-button.service';
import {getAllToursWithout9999} from '@store/manual-dispo/tour/selectors/tourlist.selectors';
import {select, Store} from '@ngrx/store';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Tour} from '@shared/models';
import {take} from 'rxjs/operators';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-selected-list-emergency-button',
  templateUrl: './selected-list-emergency-button.component.html',
  styleUrls: ['./selected-list-emergency-button.component.scss'],
})
export class SelectedListEmergencyButtonComponent implements OnInit {
  modalRef: BsModalRef;

  public allLists$: Observable<Tour[]>;
  public selectedTourArray: number[] = [];

  constructor(private store: Store,
              private emergencyService: EmergencyButtonService,
              private modalService: BsModalService,
              private alertService: ToastrService) {
  }


  ngOnInit(): void {
    this.allLists$ = this.store.pipe(select(getAllToursWithout9999));
  }

  releaseAllTours(): void {
    this.allLists$.pipe(take(1)).subscribe((allTours: Tour[]) => {
      this.emergencyService.releaseAllTours(allTours);
      this.alertService.success('Alle Touren wurden freigegeben!');
    });
  }

  releaseSelectedTours(): void {
    this.emergencyService.releaseSelectedTours(this.selectedTourArray);
    if (this.selectedTourArray.length !== 0) {
      this.alertService.success('Die ausgewählten Touren wurden freigegeben!');
    } else {
      this.alertService.error('Bitte Touren auswählen!');
    }
  }

  tourSelected(tour: Tour): void {
    const i = this.selectedTourArray.findIndex((tourId) => tourId === tour.tour.tour_id);
    if (i === -1) {
      this.selectedTourArray.push(tour.tour.tour_id);
    } else {
      this.selectedTourArray.splice(i, 1);
    }
  }

  sort(){
    this.allLists$ = this.allLists$.pipe(map((tournr: Tour[]) => {
      tournr.sort((a: Tour, b: Tour) => {
        return a.tour.tournr < b.tour.tournr ? -1 : 1;
      });
      return tournr;
    }));
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
}
