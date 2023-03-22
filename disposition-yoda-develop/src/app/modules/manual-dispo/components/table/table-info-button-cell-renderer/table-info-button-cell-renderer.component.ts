import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {ShowTableInfoDialogComponent} from '@manual-dispo-components/table/show-table-info-dialog/show-table-info-dialog.component';

@Component({
  selector: 'app-table-info-button-cell-renderer',
  templateUrl: './table-info-button-cell-renderer.component.html',
  styleUrls: ['./table-info-button-cell-renderer.component.scss']
})
export class TableInfoButtonCellRendererComponent implements ICellRendererAngularComp {
public params: any;

  constructor(private dialogService: DialogService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  showDialog(): void {
    this.dialogService.open({
      modalType: DialogModalType.MODAL,
      width: 500,
      closeOnOutsideClicked: true,
      showTitle: true,
      title: 'Fahrerdetails',
      data: {
        fahrerInfo: this.params.data
      }
    }, ShowTableInfoDialogComponent)
  }

}
