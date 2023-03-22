import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {ShowStoppInfoDialogComponent} from '@manual-dispo-views/tour-detail-view/components/tour-detail-stopp-list/components/show-stopp-info-dialog/show-stopp-info-dialog.component';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';

@Component({
  selector: 'app-stopp-info-button',
  templateUrl: './stopp-info-button-component-cell-renderer.component.html',
  styleUrls: ['./stopp-info-button-component-cell-renderer.component.scss']
})
export class StoppInfoButtonComponentCellRendererComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private dialogService: DialogService) {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  showDialog(): void {
    this.dialogService.open({
      modalType: DialogModalType.MODAL,
      width: 700,
      closeOnOutsideClicked: true,
      showTitle: true,
      title: 'Versenderdetails',
      data: {
        stoppInfo: this.params.data
      }
    }, ShowStoppInfoDialogComponent);
  }
}
