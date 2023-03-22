import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {Observable} from 'rxjs';
import {DispoStopp} from '@shared/models';
import {BsDropdownDirective} from 'ngx-bootstrap';
import {resetSelectedStopps, resetTargetTour, setTargetTour} from '@store/manual-dispo/reschedule/actions/reschedule.actions';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {SelectedStoppFacade} from '@store/manual-dispo/stopps/facades/selected-stopp.facade';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {UmdispoSummaryDialogComponent} from '@manual-dispo-components/umdispo-summary-dialog/umdispo-summary-dialog.component';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {moveStoppRequest} from '@store/manual-dispo/stopps/actions/move-stopp.actions';
import {selectStopp} from '@store/manual-dispo/stopps/actions/selected-stopp.actions';

@Component({
  selector: 'app-umdispo-info',
  templateUrl: './umdispo-info.component.html',
  styleUrls: ['./umdispo-info.component.scss']
})
export class UmdispoInfoComponent implements OnInit, OnDestroy {

  @ViewChild('dropdown', {static: true}) dropdown: BsDropdownDirective;
  @ViewChild('selectedStoppsDrownDown', {static: true}) selectedStoppsDropDown: BsDropdownDirective;
  @ViewChild('tourNumberInput') tourNumberInput;

  public allTours = [];
  public filteredTours = [];
  public allSelectedStopps$: Observable<DispoStopp[]>;
  public selectedStoppCount$: Observable<number>;
  public selectedTour;
  public reschedulingLoading$: Observable<boolean>;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private toursFacade: TourlistFacade,
    private selectedStoppFacade: SelectedStoppFacade,
    private selectedTourFacade: SelectedTourFacade,
    private rescheduleFacade: RescheduleFacade) {
  }

  ngOnDestroy(): void {
        this.cdr.detach();
    }

  ngOnInit(): void {
    this.reschedulingLoading$ = this.rescheduleFacade.loading$;
    this.allSelectedStopps$ = this.rescheduleFacade.allSelectedStopps$;
    this.selectedStoppCount$ = this.rescheduleFacade.allSelectedStoppsCount$;

    this.toursFacade.getCompleteTourList$.subscribe((tours) => {
        if (tours) {
          const sortedTours = tours.slice().sort((a, b) => (a.tournr > b.tournr) ? 1 : ((b.tournr > a.tournr) ? -1 : 0));
          this.allTours = sortedTours;
          this.filteredTours = sortedTours;
        }
      }
    );
    this.rescheduleFacade.targetTour$.subscribe((tour: any) => {
      this.selectedTour = tour;
      this.cdr.detectChanges();
    });
  }

  startUmdispo(): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 600,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Umdisponieren'
      },
      UmdispoSummaryDialogComponent);

    dialogRef.afterClosed.subscribe((closeResult: DialogCloseResult) => {
      let tour_id = closeResult.data?.target.tour_id;
      let stopps = closeResult.data?.stopp;

      if (closeResult.result === DialogCloseResultType.CLOSEOK) {
        this.rescheduleFacade.dispatch(moveStoppRequest({tourId: tour_id, stopp: stopps}));
        this.rescheduleFacade.dispatch(resetSelectedStopps());
        this.rescheduleFacade.dispatch(resetTargetTour());
        this.resetInputFeld();
      }
    });
  }

  resetInputFeld(): void {
    this.tourNumberInput.nativeElement.value = '';
    this.filteredTours = this.allTours;
  }

  resetSelection(): void {
    const dialogRef = this.dialogService.openConfirmationDialog('Selektierte Stopps werden zurückgesetzt', 'Bitte bestätigen');
    dialogRef.afterClosed.subscribe((closeResult: DialogCloseResult) => {
        if (closeResult.result === DialogCloseResultType.CLOSEOK) {
          this.rescheduleFacade.dispatch(resetSelectedStopps());
        }
      }
    );
  }

  resetSelectedTour(): void {
    this.rescheduleFacade.dispatch(resetTargetTour());
  }

  selectTour(selectedTour: any): void {
    this.dropdown.isOpen = false;
    this.rescheduleFacade.dispatch(setTargetTour({tour: selectedTour}));
  }

  filterTourList(value: any): void {
    if (!value) {
      this.filteredTours = Object.assign([], this.allTours);
    } else {
      this.filteredTours = this.allTours.filter((tour) => tour.tournr.startsWith(value));
    }
  }

  showOnMap(stopp: DispoStopp): void {
    this.selectedStoppFacade.dispatch(selectStopp({stopp}));
  }
}
