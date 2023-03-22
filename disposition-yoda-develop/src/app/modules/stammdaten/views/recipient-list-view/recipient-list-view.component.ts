import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterChangedEvent, GridReadyEvent} from 'ag-grid-community';
import {StammdatenFacade} from '@store/stammdaten/facades/stammdate.facade';
import {
  deleteRecipientRequest,
  fetchZieleRequest,
  mergeRecipientRequest
} from '@store/stammdaten/actions/stammdaten.actions';
import {Observable, Subscription} from 'rxjs';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {StoppsFacade} from '@store/manual-dispo/stopps/facades/stopps.facade';
import {Recipient} from '@models/address/address.model';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {MergeRecipientsDialogComponent} from '@modules/stammdaten/components';
import {RecipientService} from '@app/core/services/recipient/recipient.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {AG_GRID_LOCALE_DE} from '@manual-dispo-components/stopp-list/locale.de';
import {UserGridFilterService} from '@app/core/services/stammdaten/user-grid-filter.service';
import {StammdatenService} from '@app/core/services';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-recipient-list-view',
  templateUrl: './recipient-list-view.component.html',
  styleUrls: ['./recipient-list-view.component.scss']
})
export class RecipientListViewComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public gridOptions;
  public locale = AG_GRID_LOCALE_DE;
  public filterParams;
  public rowData: [];
  public selectedRecipients: Recipient[] = [];

  columnDefs = [
    {
      field: 'name1',
    },
    {
      field: 'name2'
    },
    {
      field: 'name3'
    },
    {
      field: 'strasse'
    },
    {
      field: 'hausnr',
      headerName: 'Nr.',
      headerTooltip: 'Hausnummer',
      maxWidth: 100
    },
    {
      field: 'plz',
      maxWidth: 110
    },
    {
      field: 'ort'
    },
    {
      field: 'land',
      maxWidth: 100
    },
    {
      field: 'restriktion',
      headerName: 'Restrikt.',
      headerTooltip: 'Restriktion',
      maxWidth: 110,
      valueGetter: (params) => params.data.restriktion ? 'Ja' : 'Nein'
    },
    {
      field: 'anzahl_synonyme',
      maxWidth: 100,
      headerName: 'Syn.',
      headerTooltip: 'Anzahl vorhandene Synonyme',
    },
    {
      field: 'anzahl_geopos_ziele',
      maxWidth: 110,
      headerName: 'Geopos.',
      headerTooltip: 'Anzahl Geoposition Ziele',
    },
    {
      field: 'fahrzeugklasse',
      headerName: 'F-Klasse',
      maxWidth: 120,
      headerTooltip: 'Fahrzeugklasse',
    },
    {
      field: 'timeStamp',
      headerName: 'Datum',
      maxWidth: 140,
      valueFormatter: this.dateFormatter,
      comparator: this.dateComparator

    }

  ];

  public unassignedStopCount$: Observable<number>;
  public unassignedAddressesCount$: Observable<number>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private recipientService: RecipientService,
    private dialogService: DialogService,
    private alertService: ToastrService,
    private stoppsFacade: StoppsFacade,
    private addressFacade: AddressFacade,
    private stammdatenFacade: StammdatenFacade,
    private filterService: UserGridFilterService,
    private stammdatenService: StammdatenService) {

    this.stammdatenFacade.dispatch(fetchZieleRequest());

    this.gridOptions = {
      columnDefs: this.columnDefs,
      onFilterChanged: event => this.filterChanged(event),
      accentedSort: true
    };

    this.defaultColDef = {
      resizable: true,
      flex: 1,
      sortable: true,
      filter: true,

      filterParams: {newRowsAction: 'keep'}
    };
  }

  ngOnInit(): void {
    this.unassignedAddressesCount$ = this.addressFacade.unassignedAddressesCount$;
    this.unassignedStopCount$ = this.stoppsFacade.unassignedStoppsCount$;
  }

  // Nur Datum anzeigen
  dateFormatter(params) {
    let dateAsString = params.data.timeStamp;
    return dateAsString.slice(0, 10);
  }

  // Für die Sortierung nach Datum
  dateComparator(date1, date2) {
    // slice (0, 10) --> Uhrzeit entfernen, nur Datum weitergeben
    let date1Number = _dateToNumber(date1.slice(0, 10));
    let date2Number = _dateToNumber(date2.slice(0, 10));

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

  // Sobald ein Filter gesetzt wird
  filterChanged(event: FilterChangedEvent) {
    const filterModel = event.api.getFilterModel();
    this.filterService.persistFilters(filterModel);
    this.filterParams = this.filterService.getQueryParamsFromFilters();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filterParams,
      queryParamsHandling: 'merge'
    });
  }

  onRowDoubleClicked(row: any): void {
    this.stammdatenService.storePaginationPageNumber(this.gridApi.paginationGetCurrentPage());

    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: {
        geopos: row.data.geoposition_id
      },
      state: {
        address: row.data
      }
    };
    this.router.navigate(['ziel', 'details', row.data.ziel_name_id], navigationExtras);
  }

  onRowSelected(): void {
    this.selectedRecipients = this.gridApi.getSelectedRows();
  }

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let paginationPageNumber = this.stammdatenService.getStoredPaginationPageNumber();


    this.stammdatenFacade.zieleLoading$.subscribe((isLoading: boolean) => {
      if (isLoading) {
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
        this.stammdatenService.isZieleUpdated(true);
      }
    });

    this.subscription.add(this.stammdatenFacade.recipients$.subscribe((recipients: any) => {
      if (recipients?.length > 0) {
        this.gridApi.setRowData(recipients);
        this.gridApi.sizeColumnsToFit();

        if (paginationPageNumber > 0) {
          this.gridApi.paginationGoToPage(paginationPageNumber);
        }
      }
    }));

    if (paginationPageNumber > 0) {
      this.gridApi.paginationGoToPage(paginationPageNumber);
    }
    this.stammdatenService.storePaginationPageNumber(0);

    // Zwischengespeicherte Filter wird geladen und gesetzt
    const storedFilters = this.filterService.getFiltersFromQueryParams(this.route.snapshot.queryParams);
    storedFilters && this.gridApi.setFilterModel(storedFilters);
  }

  public openDeleteRecipientDialog(recipient: Recipient): void {
    const dialogRef =
      this.dialogService.openConfirmationDialog(
        'Sollen die ausgewählten Empfänger wirklich gelöscht werden?', 'Empfänger löschen');

    dialogRef.afterClosed.subscribe((result: DialogCloseResult) => {
      if (result.result === DialogCloseResultType.CLOSEOK) {
        this.stammdatenFacade.dispatch(deleteRecipientRequest({recipientId: recipient.ziel_name_id}));
      }
    });
  }

  public openMergeRecipientDialog(recipientsToMerge: Recipient[]): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 400,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Ziele zusammenführen',
        data: {recipientsToMerge},
      },
      MergeRecipientsDialogComponent);
    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      this.gridApi.deselectAll();
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {

        this.hasAllRecipientsSameGeoposition(recipientsToMerge);
      }
    });
  }

  hasAllRecipientsSameGeoposition(recipientsToMerge) {
    let recipientTempArray = [];

    for (let i = 0; i < recipientsToMerge.length; i++) {
      if (recipientsToMerge[i].geoposition_id === recipientsToMerge[i + 1]?.geoposition_id) {
        recipientTempArray.push(recipientsToMerge[i].geoposition_id);
      }
    }

    // Kein guter Still --> muss angepasst werden
    if (recipientTempArray.length + 1 == recipientsToMerge.length) {
      this.mergeRecipients(recipientsToMerge);
    } else {
      this.alertService.error('Die Einträge haben unterschiedliche Geopositionen und können nicht zusammengeführt werden');
    }
  }

  private mergeRecipients(recipientsToMerge: Recipient[]): void {
    this.stammdatenFacade.dispatch(mergeRecipientRequest({recipients: recipientsToMerge}));

    // liste wurde nicht mehr aktualisiert ==> keine Daten von Backend bekommen nur mit Refresh Button passiert

    this.selectedRecipients = this.selectedRecipients.slice(1, this.selectedRecipients.length);

    this.gridApi.applyTransaction({remove: this.selectedRecipients});

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetAllFilterOptions() {
    this.gridOptions.api.setFilterModel(null);
  }

  openSelectedPage($event: any) {
    this.gridOptions.api.paginationGoToPage($event - 1);
  }

  refreshRecipientTable($event: any) {

    this.stammdatenFacade.dispatch(fetchZieleRequest());

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
