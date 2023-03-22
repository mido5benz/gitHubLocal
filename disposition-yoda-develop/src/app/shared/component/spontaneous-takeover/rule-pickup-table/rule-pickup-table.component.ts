import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent, ValueGetterParams} from 'ag-grid-community';
import {RulePickupService} from '@app/core/services/spontaneous-takeovers/rule-pickup.service';
import {RulePickup} from '@models/spontaneous-takeovers/rule-pickup.model';
import {EditRulePickupButtonCellRendererComponent} from '@shared/component/spontaneous-takeover/edit-rule-pickup-button-cell-renderer/edit-rule-pickup-button-cell-renderer.component';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DeleteRulePickupModalComponent} from '@shared/component/spontaneous-takeover/delete-rule-pickup-modal/delete-rule-pickup-modal.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-rule-pickup-table',
  templateUrl: './rule-pickup-table.component.html',
  styleUrls: ['./rule-pickup-table.component.scss']
})
export class RulePickupTableComponent implements OnInit, OnDestroy {

  public subscription: Subscription = new Subscription();

  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public gridOptions;
  public columnDef: ColDef[];
  public defaultColDef: ColDef;
  public overlayLoadingTemplate;
  public noRowsTemplate;
  public frameworkComponents;
  public isRowSelected: boolean = false;
  public selectedRow: any;

  constructor(private rulePickupService: RulePickupService, private dialogService: DialogService) {
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Abholungen werden geladen...</span>';
    this.noRowsTemplate = '<span class="ag-overlay-loading-center">Keine Regelabholungen vorhanden!</span>';
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
        field: 'tournr',
        headerName: 'Tour',
        valueGetter: (params) => this.sliceTournr(params),
      },
      {
        headerName: 'Tor',
        valueGetter: (params) => params.data.tornr
      },
      {
        headerName: 'Ladestelle',
        minWidth: 250,
        valueGetter: (params) => this.getLadestelleName(params.data)
      },
      {
        headerName: 'Strasse',
        valueGetter: (params) => params.data.ladestelle_adresse?.strasse + ' ' + params.data.ladestelle_adresse?.hausnr
      },
      {
        headerName: 'Plz',
        valueGetter: (params) => params.data.ladestelle_adresse.plz
      },
      {
        headerName: 'Ort',
        valueGetter: (params) => params.data.ladestelle_adresse.ort
      },
      {
        headerName: 'Auftrag',
        valueGetter: (params) => params.data.auftragsname
      },
      {
        headerName: 'Info',
        valueGetter: (params) => params.data.info
      },
      {
        field: 'ambient',
        headerName: 'Ambient',
        valueGetter: (params) => params.data?.ambient === true ? 'Ja' : 'Nein',
      },
      {
        headerName: 'Von',
        valueGetter: (params) => params.data.gueltigvon,
        comparator: this.dateComparator
      },
      {
        headerName: 'Bis',
        valueGetter: (params) => params.data.gueltigbis,
        comparator: this.dateComparator
      },
      {
        cellRenderer: 'editRulePickupCellRenderer',
        maxWidth: 50
      }
    ];
    this.frameworkComponents = {
      editRulePickupCellRenderer: EditRulePickupButtonCellRendererComponent
    };
  }

  ngOnInit(): void {
    this.subscription.add(this.rulePickupService.loadRegelAbholungDataObserv.subscribe((isNewRegelabholungCreated) => {
      if (isNewRegelabholungCreated) {
        console.log(this.gridApi);
        this.gridApi.showLoadingOverlay();
        this.rulePickupService.getRulePickups().subscribe((rulePickups: RulePickup[]) => {
          this.gridApi.setRowData(rulePickups);
          this.gridApi.hideOverlay();
        });
      }
    }));
  }


  gridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.subscription.add(this.rulePickupService.getRulePickups().subscribe((rulePickups: RulePickup[]) => {
      if (rulePickups) {
        this.gridApi.setRowData(rulePickups);
      }
    }));
  }

  onRowClicked(event: any) {
    this.selectedRow = event.data;
    this.isRowSelected = true;
  }

  showDeleteRulePickupDialog() {
    if (this.selectedRow) {
      console.log(this.selectedRow);
      const dialogRef = this.dialogService.open({
        modalType: DialogModalType.MODAL,
        width: 500,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Regelabholung löschen',
        data: this.selectedRow

      }, DeleteRulePickupModalComponent);

      dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
        if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
          this.subscription.add(this.rulePickupService.deleteRulePickup(this.selectedRow.dauerauftrag_id).subscribe((isRowDeleted) => {
            if (isRowDeleted.status === 200) {
              this.subscription.add(this.rulePickupService.getRulePickups().subscribe((rulePickup) => {
                this.gridApi.setRowData(rulePickup);
              }));
            }
          }));
        }
      });
    }
  }

  sliceTournr(params: ValueGetterParams) {
    return params.data.tournr ? params.data.tournr.slice(0, 1) + '-' + params.data.tournr.slice(1) : '';
  }

  public getLadestelleName(data: any) {
    let name1, name2, name3;

    name1 = data.ladestelle_adresse.name1 ? data.ladestelle_adresse.name1 : '';
    name2 = data.ladestelle_adresse.name2 ? data.ladestelle_adresse.name2 : '';
    name3 = data.ladestelle_adresse.name3 ? data.ladestelle_adresse.name3 : '';

    return `${name1} ${name2} ${name3}`;
  }

  // Für die Sortierung nach Datum
  dateComparator(date1, date2) {
    // slice (0, 10) --> Uhrzeit entfernen, nur Datum weitergeben
    let date1Number = _dateToNumber(date1);
    let date2Number = _dateToNumber(date2);

    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }

    return date1Number - date2Number;
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}



// Helper class
function _dateToNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  let yearAsNumber = date.substring(6, 10);
  let monthAsNumber = date.substring(3, 5);
  let dayAsNumber = date.substring(0, 2);

  let result = yearAsNumber * 10000 + monthAsNumber * 100 + dayAsNumber; //example: 29/08/2004 => 20040829
  return result;

}
