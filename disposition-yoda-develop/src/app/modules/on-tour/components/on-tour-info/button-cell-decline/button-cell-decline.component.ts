import { Component, Input } from '@angular/core';
import { declineOnTourChange } from '@app/store/on-tour/actions/on-tour.actions';
import { Store } from '@ngrx/store';
import { Anfrage } from '@models/on-tour/aenderungswunsch.model';
import { OnTourService } from '@modules/on-tour/on-tour.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-button-cell-decline',
  templateUrl: './button-cell-decline.component.html',
  styleUrls: ['./button-cell-decline.component.scss'],
})
export class ButtonCellDeclineComponent {
  @Input() decline: Anfrage;
  public value: {};

  constructor(private alertService: ToastrService, private store: Store, private onTourService: OnTourService) {}

  // eslint-disable-next-line
  declined() {
    this.store.dispatch(declineOnTourChange({ change: this.decline }));
    this.value = {
      anfrage_stoppplanung_id: this.decline.anfrage_stoppplanung_id,
      antwort: false,
    };
    this.onTourService.requestChange(this.value).subscribe(result => {
      if(result.status === 200) {
        this.alertService.success('Der Änderungswunsch wurde abgelehnt');
      }else {
        this.alertService.error('Der Änderungswunsch wurde nicht abgelehnt');
      }
    });
  }
}
