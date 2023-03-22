import {Component, OnInit,} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent, ValueGetterParams} from 'ag-grid-community';
import {SpontaneousTakeoversService} from '@app/core/services/spontaneous-takeovers/spontaneous-takeovers.service';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {SpontaneousTakeoverModalComponent} from '@shared/component/spontaneous-takeover/spontaneous-takeover-modal/spontaneous-takeover-modal.component';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {RulePickupModalComponent} from '@shared/component/spontaneous-takeover/rule-pickup-modal/rule-pickup-modal.component';

@Component({
  selector: 'app-customer-takeover-table',
  templateUrl: './customer-takeover-table.component.html',
  styleUrls: ['./customer-takeover-table.component.scss']
})
export class CustomerTakeoverTableComponent implements OnInit {

  public overlayLoadingTemplate;
  public isRowSelected: boolean = false;
  public selectedKunde;

  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public gridOptions;
  public columnDef: ColDef[];
  public defaultColDef: ColDef;

  public uebernahmeFuerKunden;

  constructor(private spontaneousTakeoverService: SpontaneousTakeoversService, private dialogService: DialogService) {
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Übernahmen werden geladen...</span>';
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
        field: 'typ_regel',
        headerName: 'Regel',
        valueGetter: (params) => params.data?.typ_regel === true ? 'Ja' : 'Nein',
        maxWidth: 100
      },
      {
        field: 'typ_sporadisch',
        headerName: 'Sporadisch',
        valueGetter: (params) => params.data?.typ_sporadisch === true ? 'Ja' : 'Nein',
        maxWidth: 130
      },
      {
        field: 'typ_adhoc',
        headerName: 'Ad hoc',
        valueGetter: (params) => params.data?.typ_adhoc === true ? 'Ja' : 'Nein',
        maxWidth: 100
      },
      {
        field: 'versender_adresse.adresse_nummer',
        headerName: 'Versend.-Nr',
      },
      {
        headerName: 'Kunde',
        valueGetter: (params) => this.getVersenderName(params),
        minWidth: 200
      },
      {
        field: 'depot',
        headerName: 'DG',
        maxWidth: 80
      },
      {
        field: 'ladestelle_adresse.adresse_nummer',
        headerName: 'Ladestelle-Nr.',
      },
      {
        headerName: 'Ladestelle',
        valueGetter: (params) => this.getLadestelleName(params),
        minWidth: 200
      },
      {
        field: 'ladestelle_adresse.strasse',
        headerName: 'Strasse',
        valueGetter: (params) => params.data.ladestelle_adresse?.strasse + ' ' + params.data.ladestelle_adresse?.hausnr
      },
      {
        field: 'ladestelle_adresse.plz',
        headerName: 'Plz',
      },
      {
        field: 'ladestelle_adresse.ort',
        headerName: 'Ort',
      }
    ];
  }

  ngOnInit(): void {
    const depotNr = localStorage.getItem('userDepot');

    this.spontaneousTakeoverService.getKundenUebernahmen(depotNr).subscribe((kundenUebernahmen) => {
      this.uebernahmeFuerKunden = kundenUebernahmen;
      this.gridApi.setRowData(this.uebernahmeFuerKunden);
    });

    this.spontaneousTakeoverService.newDepotNr.subscribe((newDepotNr) => {
      if (newDepotNr) {
        this.spontaneousTakeoverService.getKundenUebernahmen(newDepotNr).subscribe((kundenUebernahmen) => {
          setTimeout(() => {
            this.uebernahmeFuerKunden = kundenUebernahmen;
            this.gridApi.setRowData(this.uebernahmeFuerKunden);
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

  getLadestelleName(params: ValueGetterParams) {
    const name1: string = params.data?.ladestelle_adresse?.name1 !== null ? params.data?.ladestelle_adresse?.name1 : '';
    const name2: string = params.data?.ladestelle_adresse?.name2 !== null ? params.data?.ladestelle_adresse?.name2 : '';
    const name3: string = params.data?.ladestelle_adresse?.name3 !== null ? params.data?.ladestelle_adresse?.name3 : '';

    return `${name1} ${name2} ${name3}`;
  }

  onRowClicked(event: any) {
    this.selectedKunde = event.data;
    this.isRowSelected = true;
  }

  showRulePickupModal() {
    const dialogRef = this.dialogService.open({
      modalType: DialogModalType.MODAL,
      width: 800,
      closeOnOutsideClicked: false,
      showTitle: true,
      title: 'Regelabholung',
      data: this.selectedKunde
    }, RulePickupModalComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {

      }
    });
  }

  showSpontaneousTakeoverModal() {
    const dialogRef = this.dialogService.open({
      modalType: DialogModalType.MODAL,
      width: 800,
      closeOnOutsideClicked: false,
      showTitle: true,
      title: 'Spontane Abholungen',
      data: this.selectedKunde

    }, SpontaneousTakeoverModalComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
        this.spontaneousTakeoverService.formSubmitted(true);
      }
      this.isRowSelected = false;
      this.gridApi.deselectAll();
    });
  }
}
