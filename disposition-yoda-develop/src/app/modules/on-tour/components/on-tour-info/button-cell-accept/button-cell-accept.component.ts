import {Component, Input} from '@angular/core';
import {acceptOnTourChange} from '@app/store/on-tour/actions/on-tour.actions';
import {Store} from '@ngrx/store';
import {Anfrage} from '@models/on-tour/aenderungswunsch.model';
import {OnTourService} from '@modules/on-tour/on-tour.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-button-cell-accept',
  templateUrl: './button-cell-accept.component.html',
  styleUrls: ['./button-cell-accept.component.scss'],
})
export class ButtonCellAcceptComponent {
  @Input() anfrage: Anfrage;

  constructor(
    private alertService: ToastrService,
    private store: Store,
    private onTourService: OnTourService
  ) {
  }

  accepted() {
    this.store.dispatch(acceptOnTourChange({change: this.anfrage}));
    const requestBody = {
      anfrage_stoppplanung_id: this.anfrage.anfrage_stoppplanung_id,
      antwort: true,
    };
    this.onTourService.requestChange(requestBody).subscribe((result) => {
      if (result.status === 200) {
        this.alertService.success('Der Änderungswunsch wurde akzeptiert');
      } else {
        this.alertService.error('Der Änderungswunsch wurde nicht akzeptiert');
      }
    });
  }
}
