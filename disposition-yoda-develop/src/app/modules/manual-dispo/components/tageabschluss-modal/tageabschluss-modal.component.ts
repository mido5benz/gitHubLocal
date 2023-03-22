import {Component, OnInit} from '@angular/core';
import {DailyClosingFacade} from '@store/manual-dispo/daily-closing/facades/daily-closing.facade';
import {Observable} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap';
import {TourService} from '@app/core/services';

@Component({
  selector: 'app-tageabschluss-modal',
  templateUrl: './tageabschluss-modal.component.html',
  styleUrls: ['./tageabschluss-modal.component.scss']
})
export class TageabschlussModalComponent implements OnInit {

  public title = 'Tagesabschluss - Hinweis';

  public loading$: Observable<boolean>;
  public offeneTouren$: Observable<any>;

  public offeneTouren: any;

  constructor(
    private tourService: TourService,
    private bsModalRef: BsModalRef,
    private tagesAbschlussFacade: DailyClosingFacade) {
    this.tagesAbschlussFacade.fetchOffeneTouren();
  }

  ngOnInit(): void {
    this.loading$ = this.tagesAbschlussFacade.loading$;
    this.offeneTouren$ = this.tagesAbschlussFacade.offeneTouren$;
  }

  confirm(): void {
    this.tagesAbschlussFacade.executeDailyClosing();
    this.bsModalRef.hide();
  }

  cancel(): void {
    this.bsModalRef.hide();
  }
}
