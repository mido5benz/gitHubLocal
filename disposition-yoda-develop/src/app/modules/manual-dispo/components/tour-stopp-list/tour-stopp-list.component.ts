import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DispoStopp} from '@models/index';
import {ReloadLineFacade} from '@store/manual-dispo/tour/facades/reload-line.facade';
import {Router} from '@angular/router';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {ChangeStoppsOrderFacade} from '@store/manual-dispo/stopps/facades/change-stopps-order.facade';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {SelectedStoppFacade} from '@store/manual-dispo/stopps/facades/selected-stopp.facade';
import {changeTourStoppsOrderRequest} from '@store/manual-dispo/tour/actions/change-stopps-order.actions';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {moveReloadLineRequest} from '@store/manual-dispo/tour/actions/move-reloadline.actions';
import {selectStopp} from '@store/manual-dispo/stopps/actions/selected-stopp.actions';
import {deleteReloadLineRequest} from '@store/manual-dispo/tour/actions/delete-reloadline.actions';
import {RescheduleService} from '@app/core/services/reschedule/reschedule.service';

@Component({
  selector: 'app-tour-stopp-list',
  templateUrl: './tour-stopp-list.component.html',
  styleUrls: ['./tour-stopp-list.component.scss'],
})
export class TourStoppListComponent implements OnInit {
  @Input() loading: boolean;
  @Input() tourId: number;
  @Input() reloadlineEditable: boolean;
  @Input() tourNr: string;
  @Input() stopps: DispoStopp[];
  @Input() frozen: boolean;
  @Input() isCollapsed: boolean;
  @Input() reloadLineIndex: number;

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeSidebar: EventEmitter<any> = new EventEmitter<any>();

  tourStopps: any = [];

  constructor(
    private selectedStoppFacade: SelectedStoppFacade,
    private dialogService: DialogService,
    private changeStoppsOrderFacade: ChangeStoppsOrderFacade,
    private selectedTourFacade: SelectedTourFacade,
    private router: Router,
    private reloadLineFacade: ReloadLineFacade,
    private rescheduleService: RescheduleService) {
  }

  ngOnInit(): void {
    this.rescheduleService.emptyTour.subscribe((empty) => {
      if (empty) {
        this.closeCollapse();
      }
    });
  }

  closeCollapse(): void {
    this.closeSidebar.emit();
  }

  collapse(): void {
    this.toggleSidebar.emit();
  }

  dragDisabled(stopp: DispoStopp): boolean {
    return !stopp.isReloadStopp;
  }

  public flyToStopp(stopp: DispoStopp): void {
    this.selectedStoppFacade.dispatch(selectStopp({stopp}));
  }

  public dispatchNewSortOrder(stopps: DispoStopp[]): void {
    this.changeStoppsOrderFacade.dispatch(changeTourStoppsOrderRequest({tourId: this.tourId, stopps}));
  }

  public dispatchNewReloadLine(sollStoppNumber: number): void {
    this.reloadLineFacade.dispatch(moveReloadLineRequest({
      tourId: this.tourId,
      sollStopp: sollStoppNumber
    }));
  }

  public dispatchDeleteReloadLine(): void {
    const content = 'Soll die Nachladelinie der Tour wirklich gelöscht werden?';
    const title = 'Nachladinie löschen';

    const dialogRef = this.dialogService.openConfirmationDialog(content, title);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
        if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
          this.reloadLineFacade.dispatch(deleteReloadLineRequest({tourId: this.tourId}));
        }
      }
    );
  }
}
