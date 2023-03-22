import {Component, OnInit} from '@angular/core';
import {ManualDispoTour} from '@app/shared/models';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {noop, Observable, Observer, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {TourService} from '@app/core/services';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {ConsignmentService} from '@app/core/services/consignments/consignment.service';
import {ToastrService} from 'ngx-toastr';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';

@Component({
  selector: 'app-move-delivery-popup',
  templateUrl: './move-delivery-popup.component.html',
  styleUrls: ['./move-delivery-popup.component.scss']
})
export class MoveDeliveryPopupComponent implements OnInit {

  public tourNr: string;
  public dataSource$: Observable<any[]>;
  public typeaheadLoading: boolean;
  public errorMessage: string;
  public selectedTour: ManualDispoTour;
  public tourSelected = false;
  public noResult = false;

  constructor(
    private tourlistFacade: TourlistFacade,
    private sendungService: ConsignmentService,
    private tourService: TourService,
    private dialogConfig: DialogConfig,
    private alertService: ToastrService,
    private dialogRef: DialogRef
  ) {
  }

  ngOnInit(): void {
    this.dataSource$ = new Observable((observer: Observer<string>) => {
      observer.next(this.tourNr);
    }).pipe(
      switchMap((tourNumber: string) => {
        if (tourNumber) {
          return this.tourlistFacade.getTourByTourNr(tourNumber).pipe(
            map((data: any) => data || []),
            tap(
              () => noop,
              (err) => {
                this.errorMessage =
                  (err && err.message) || 'Something goes wrong';
              }
            )
          );
        }

        return of([]);
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event: TypeaheadMatch): void {
    const tour = event.item as ManualDispoTour;
    this.tourSelected = true;
    this.selectedTour = tour;
  }

  moveSendungen(): void {
    const sourceDispoStopp = this.dialogConfig.data?.sourceDispoStopp;
    const sendungen = this.dialogConfig.data?.sendungen;

    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK,
      data: {sourceStopp: sourceDispoStopp, targetTour: this.selectedTour.tour_id, sendungen}
    });
  }
}
