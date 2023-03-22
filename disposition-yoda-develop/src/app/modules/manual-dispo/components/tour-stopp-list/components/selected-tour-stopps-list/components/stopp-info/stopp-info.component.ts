import {Component, Input, OnInit} from '@angular/core';
import {DispoStopp, DispoSum} from '@shared/models';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stopp-info',
  templateUrl: './stopp-info.component.html',
  styleUrls: ['./stopp-info.component.scss']
})
export class StoppInfoComponent implements OnInit {

  @Input() stopp: DispoStopp;

  public stoppSums$: Observable<DispoSum>;

  constructor(private selectedTourFacade: SelectedTourFacade) {
  }

  ngOnInit(): void {
    this.stoppSums$ = this.selectedTourFacade.getSumsForDispoStopp(this.stopp?.dispostopp_id);
  }
}
