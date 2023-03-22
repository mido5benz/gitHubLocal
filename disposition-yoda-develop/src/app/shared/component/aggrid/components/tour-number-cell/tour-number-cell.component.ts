import {Component, OnDestroy} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {IAfterGuiAttachedParams} from 'ag-grid-community';

@Component({
  selector: 'app-tour-number-cell',
  templateUrl: './tour-number-cell.component.html',
  styleUrls: ['./tour-number-cell.component.scss']
})
export class TourNumberCellComponent implements ICellRendererAngularComp, OnDestroy {

  public params: any;
  public gridApi: any;
  public showImage = '';

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
    this.gridApi = params.api;
  }

  ngOnDestroy(): void {
  }

  refresh(): boolean {
    return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {

  }
}
