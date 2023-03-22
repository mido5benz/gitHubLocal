import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {ColDef, ColumnApi, GridApi, GridReadyEvent, ValueGetterParams} from 'ag-grid-community';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Component({
  selector: 'app-takeover-address-modal',
  templateUrl: './takeover-address-modal.component.html',
  styleUrls: ['./takeover-address-modal.component.scss']
})
export class TakeoverAddressModalComponent implements OnInit {

  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public columnDef: ColDef[];
  public defaultColDef: ColDef;

  public versenderLadestellen;
  public selectedAddress;

  public isSelectedAddress: boolean = false;

  constructor(private dialogConfig: DialogConfig, private dialogRef: DialogRef) {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
      lockPosition: true,
      cellClass: 'locked-col'
    };

    this.columnDef = [
      {
        headerName: 'Versender',
        valueGetter: (params) => this.getVersenderList(params)
      },
      {
        field: 'strasse',
        headerName: 'Straße',
      },
      {
        field: 'hausnr',
        headerName: 'Hausnr',
      },
      {
        field: 'plz',
        headerName: 'Plz',
      },
      {
        field: 'ort',
        headerName: 'Ort',
      }
    ];

  }

  ngOnInit(): void {
    this.versenderLadestellen = this.dialogConfig.data;
  }

  gridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.versenderLadestellen);
  }


  private getVersenderList(params: ValueGetterParams) {
    const name1: string = params.data.name_1 !== null ? params.data.name_1 : '';
    const name2: string = params.data.name_2 !== null ? params.data.name_2 : '';
    const name3: string = params.data.name_3 !== null ? params.data.name_3 : '';

    return `${name1} ${name2} ${name3}`;
  }

  onRowClicked(event: any) {
    this.isSelectedAddress = true;
    this.selectedAddress = event.data;
  }

  closeOk() {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK,
      data: this.selectedAddress
    });
    this.isSelectedAddress = false;
  }
}
