import {Component, OnInit} from '@angular/core';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {noop, Observable, Observer, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {moveStoppsToTourRequest} from '@store/manual-dispo/reschedule/actions/move-assigned-stopp.actions';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';

@Component({
  selector: 'app-move-stopp-popup',
  templateUrl: './move-stopp-popup.component.html',
  styleUrls: ['./move-stopp-popup.component.scss']
})
export class MoveStoppPopupComponent implements OnInit {

  public tourNr: string;
  public dataSource$: Observable<any[]>;
  public typeaheadLoading: boolean;
  public errorMessage: string;
  public selectedTour: any;
  public noResult = false;

  constructor(
    private tourlistFacade: TourlistFacade,
    private umdispoFacade: RescheduleFacade,
    public config: DialogConfig,
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
                // in case of http error
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

  onSelect(event: TypeaheadMatch): void {
    this.selectedTour = event.item;
  }

  moveStopp(): void {
    this.umdispoFacade.dispatch(
      moveStoppsToTourRequest({
        sourceTourId: this.config.data.sourceTourId,
        tourId: this.selectedTour.tour_id,
        stopps: this.config.data.stopps,
      })
    );
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK
    });
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
}
