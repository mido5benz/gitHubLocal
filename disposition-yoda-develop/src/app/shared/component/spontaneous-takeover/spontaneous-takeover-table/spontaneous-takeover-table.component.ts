import {Component, OnInit} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent, ValueGetterParams} from 'ag-grid-community';
import {SpontaneousTakeoversService} from '@app/core/services/spontaneous-takeovers/spontaneous-takeovers.service';
import {ShipperAddressButtonCellRendererComponent} from '@shared/component';
import {EditSpontaneousTakeoverButtonCellRendererComponent} from '@shared/component/spontaneous-takeover/edit-spontaneous-takeover-button-cell-renderer/edit-spontaneous-takeover-button-cell-renderer.component';

@Component({
  selector: 'app-spontaneous-takeover-table',
  templateUrl: './spontaneous-takeover-table.component.html',
  styleUrls: ['./spontaneous-takeover-table.component.scss']
})
export class SpontaneousTakeoverTableComponent implements OnInit {

  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public gridOptions;
  public columnDef: ColDef[];
  public defaultColDef: ColDef;
  public overlayLoadingTemplate;
  public frameworkComponents;

  public spontaneUebernahmen;

  constructor(private spontaneousTakeoverService: SpontaneousTakeoversService) {
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Abholungen werden geladen...</span>';
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
      lockPosition: true,
      cellClass: 'locked-col'
    };

    this.gridOptions = {
      columnDefs: this.columnDef,
      accentedSort: true
    }

    this.columnDef = [
      {
        field: 'depot',
        headerName: 'Depot',
        maxWidth: 100
      },
      {
        headerName: 'Versender',
        valueGetter: (params) => this.getVersenderName(params),
        minWidth: 200
      },
      {
        headerName: 'V-Detail',
        cellRenderer: 'shipperAddressCellRenderer',
        maxWidth: 100
      },
      {
        headerName: 'Übernahmestelle',
        valueGetter: (params) => this.getUebernahmestelleName(params),
        minWidth: 200
      },
      {
        headerName: 'Strasse',
        valueGetter: (params) => params.data?.strasse + ' ' + params.data?.hausnr
      },
      {
        field: 'plz',
        headerName: 'Plz',
        maxWidth: 100
      },
      {
        field: 'ort',
        headerName: 'Ort',
      },
      {
        field: 'land',
        headerName: 'Land',
        maxWidth: 100
      },
      {
        field: 'tour_nr',
        headerName: 'Tour',
        valueGetter: (params) => this.sliceTournr(params),
        maxWidth: 100
      },
      {
        field: 'uebernahmeDatum',
        headerName: 'Datum',
        maxWidth: 150
      },
      {
        field: 'uebernahmeZeit',
        headerName: 'Uhr',
        maxWidth: 150
      },
      {
        field: 'ambient',
        headerName: 'Ambient',
        valueGetter: (params) => params.data?.ambient === true ? 'Ja' : 'Nein',
        maxWidth: 120
      },
      {
        cellRenderer: 'editSpontaneousTakeoverCellRenderer',
        maxWidth: 50
      }
    ];
    this.frameworkComponents = {
      shipperAddressCellRenderer: ShipperAddressButtonCellRendererComponent,
      editSpontaneousTakeoverCellRenderer: EditSpontaneousTakeoverButtonCellRendererComponent
    };
  }

  ngOnInit(): void {
    this.spontaneousTakeoverService.getSpontaneUebernahmen().subscribe((spontaneUebernahme) => {
      this.spontaneUebernahmen = spontaneUebernahme;
      this.gridApi.setRowData(this.spontaneUebernahmen);
    })

    this.spontaneousTakeoverService.refreshTableData.subscribe((result) => {
      if (result) {
        this.spontaneUebernahmen = this.spontaneousTakeoverService.getSpontaneUebernahmen().subscribe((spontaneUebernahme) => {
          setTimeout(() => {
            this.spontaneUebernahmen = spontaneUebernahme;
            this.gridApi.setRowData(this.spontaneUebernahmen);
          }, 2000);
        });
      }
    });
  }

  gridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getVersenderName(params: ValueGetterParams) {
    const name1: string = params.data?.versender_adresse?.name1 !== null ? params.data?.versender_adresse?.name1 : '';
    const name2: string = params.data?.versender_adresse?.name2 !== null ? params.data?.versender_adresse?.name2 : '';
    const name3: string = params.data?.versender_adresse?.name3 !== null ? params.data?.versender_adresse?.name3 : '';

    return `${name1} ${name2} ${name3}`;
  }

  getUebernahmestelleName(params: ValueGetterParams) {
    const name1: string = params.data?.name_1 !== null ? params.data?.name_1 : '';
    const name2: string = params.data?.name_2 !== null ? params.data?.name_2 : '';
    const name3: string = params.data?.name_3 !== null ? params.data?.name_3 : '';

    return `${name1} ${name2} ${name3}`;
  }

  sliceTournr(params: ValueGetterParams) {
    return params.data.tour_nr ? params.data.tour_nr.slice(0, 1) + '-' + params.data.tour_nr.slice(1) : '';
  }

}
