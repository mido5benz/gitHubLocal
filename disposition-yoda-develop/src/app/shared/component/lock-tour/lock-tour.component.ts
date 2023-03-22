import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';

import * as cancelTourFreezeActions from '@store/manual-dispo/tour/actions/cancel-tour-freeze.actions';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {freezeTourRequest} from '@store/manual-dispo/tour/actions/freeze-tour.actions';
import {TourService} from '@app/core/services';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-lock-tour',
  templateUrl: './lock-tour.component.html',
  styleUrls: ['./lock-tour.component.scss']
})
export class LockTourComponent implements OnInit {

  @Input() tourId: number;
  @Input() isTourFrozen: boolean;
  @Input() editModeEnabled: boolean;

  public istTourabgefertigt: boolean;

  constructor(
    private dialogService: DialogService,
    private selectedTourFacade: SelectedTourFacade,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.selectedTourFacade.abgefertigt$.subscribe((tourAbgefertigt) => this.istTourabgefertigt = tourAbgefertigt);
  }

  public freezeTour(): void {
    const dialogRef = this.dialogService.openConfirmationDialog('Tour festschreiben?');

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
        this.selectedTourFacade.dispatch(freezeTourRequest({tourId: +this.tourId}));
      }
    });
  }

  public disabledTourFreeze(): void {
    if (!this.istTourabgefertigt) {
      const dialogRef = this.dialogService.openConfirmationDialog('Tourfestschreibung stornieren?');

      dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
          if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
            this.selectedTourFacade.dispatch(cancelTourFreezeActions.stornoFreezeTourRequest({tourId: +this.tourId}));
          }
        }
      );
    } else {
      this.toastrService.error('Festschreibung konnte nicht aufgehoben werden!', 'Tour bereits abgefertigt');
    }
  }
}
