import {Component, Input, OnInit} from '@angular/core';
import {DispoStopp} from '@models/index';
import {selectStopp} from '@store/manual-dispo/stopps/actions/selected-stopp.actions';
import {SelectedStoppFacade} from '@store/manual-dispo/stopps/facades/selected-stopp.facade';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[appStoppItem]',
  templateUrl: './stopp-item.component.html',
  styleUrls: ['./stopp-item.component.scss']
})
export class StoppItemComponent implements OnInit {
  @Input() stopp: DispoStopp;
  @Input() tourFrozen: boolean;
  @Input() reloadLine: number;

  public servicesVisible: boolean;

  constructor(private selectedStoppFacade: SelectedStoppFacade) {
  }

  ngOnInit(): void {
  }

  public stoppClicked(): void {
    this.selectedStoppFacade.dispatch(selectStopp({stopp: this.stopp}));
  }

  showServiceList(): void {
    this.servicesVisible = !this.servicesVisible;
  }

  showReloadLine(): boolean {
    return this.stopp.isReloadStopp;
  }
}
