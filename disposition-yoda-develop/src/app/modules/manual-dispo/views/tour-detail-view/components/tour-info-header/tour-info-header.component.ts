import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DispoStopp, TourSum} from '@shared/models';
import {ToastrService} from 'ngx-toastr';
import {RescheduleService} from '@app/core/services/reschedule/reschedule.service';
import {TourService} from '@app/core/services';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {setSelectedTourId} from '@store/manual-dispo/tour/actions/selected-tour.actions';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';

@Component({
  selector: 'app-tour-info-header',
  templateUrl: './tour-info-header.component.html',
  styleUrls: ['./tour-info-header.component.scss']
})
export class TourInfoHeaderComponent implements OnInit, OnDestroy {

  @Input() loading: boolean;
  @Input() tourFrozen: boolean;
  @Input() tourNr: string;
  @Input() tourId: number;
  @Input() selectedStopps: DispoStopp[];
  @Input() ausliefertag: string;
  @Input() sortOrderChanged: boolean;
  @Input() editModeEnabled: boolean;
  @Input() tourDuration: number;
  @Input() tourSum: TourSum;
  @Input() kennzeichnungsPflichtig: boolean;
  @Input() abgefertigt: boolean;
  @Input() isTourBlocked: boolean;
  @Input() isPotenziellGleicheZiele: boolean;
  @Input() stopWithoutSollstopp: boolean;

  @Output() openUmdispositionDialog: EventEmitter<{ sourceTourId: number; stopps: DispoStopp[] }> = new EventEmitter<{ sourceTourId: number; stopps: DispoStopp[] }>();
  @Output() toggleEditMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() saveOrderClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() bearbeitungAbschliesenClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() openZieleZusammenfuehrenDialog: EventEmitter<any> = new EventEmitter<any>();

  public maxFahrtzeitInSec = 28800;
  public alertBoolean: boolean = false;

  public empty: boolean = false;


  constructor(
    private alertService: ToastrService,
    private rescheduleService: RescheduleService,
    private tourService: TourService,
    private toursFacade: TourlistFacade,
    private selectedTourFacade: SelectedTourFacade,
    private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.rescheduleService.emptyTour.subscribe((empty) => {
      if (empty !== null) {
        this.empty = empty;
      }
      if (!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });

  }

  public resetStoppSelection(): void {
    this.selectedStopps = [];
  }

  openDialog(): void {
    this.openUmdispositionDialog.emit({
      sourceTourId: this.tourId,
      stopps: this.selectedStopps
    });
  }

  // bearbeitungAbschliesenButtonClicked() {
  //   this.bearbeitungAbschliesenClicked.emit(true);
  // }

  zieleZusammenfuehrenClicked() {
    this.openZieleZusammenfuehrenDialog.emit(this.selectedStopps);
   // this.tourService.setZieleZusammenfuehren(this.selectedStopps)
  }

  reloadData() {
    this.tourService.stoppreihenfolgeNeuBerechnen(this.tourId).subscribe((tourNeuBerechnet) => {
      if (tourNeuBerechnet.status === 200) {
        this.selectedTourFacade.dispatch(setSelectedTourId({id: this.tourId}));
      }
    });
  }

  enableEditMode(): void {
    this.alertBoolean = !this.alertBoolean;
    this.toggleEditMode.emit();

    if (this.alertBoolean) {
      this.alertService.warning('Bitte die Stopps nicht über die Nachladegrenze verschieben! (Farbig markierte Stopps)', 'Stopp!!!');
    }
  }

  saveNewSortOrder(): void {
    this.saveOrderClicked.emit();
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }

}
