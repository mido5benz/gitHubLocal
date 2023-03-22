import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {DispoStopp} from '@shared/models';
import {MarkerService} from '@app/core/services';
import { stoppClicked} from '@store/manual-dispo/reschedule/actions/reschedule.actions';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Component({
  selector: 'app-umdispo-summary-dialog',
  templateUrl: './umdispo-summary-dialog.component.html',
  styleUrls: ['./umdispo-summary-dialog.component.scss']
})
export class UmdispoSummaryDialogComponent implements OnInit {

  groupedTours: any;
  selectedStopps: DispoStopp[] = [];
  // TODO: Type for tour master data
  selectedTour: any;
  selectedTours: DispoStopp[] = [];

  constructor(
    private markerService: MarkerService,
    private umdispoFacade: RescheduleFacade,
    private dialogConfig: DialogConfig,
    private dialogRef: DialogRef) {
  }

  ngOnInit(): void {
    this.umdispoFacade.targetTour$.subscribe((targetTour: any) => this.selectedTour = targetTour);
    this.umdispoFacade.allSelectedStopps$.subscribe((selectedStopps: DispoStopp[]) => {
      this.groupedTours = this.groupBy(selectedStopps, 'tournr');
      return this.selectedStopps = selectedStopps;
    });
  }


  closeOk(): void {
    const tour = {
      stopp: this.selectedStopps,
      target: this.selectedTour
    }
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK,
      data: tour
    });
  }

  closeCancel(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL,
      data: null
    });
  }

  getIconClass(rasterEbeneId: any): string {
    return this.markerService.getTourTypeIconClass(+rasterEbeneId);
  }

  removeStoppFromSelection(stopp: DispoStopp): void {
    this.umdispoFacade.dispatch(stoppClicked({stopps: [stopp]}));
  }

  groupBy(xs, key): void {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
