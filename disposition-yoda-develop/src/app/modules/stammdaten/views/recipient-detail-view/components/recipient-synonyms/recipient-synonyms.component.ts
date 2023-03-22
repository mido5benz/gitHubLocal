import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AG_GRID_LOCALE_DE} from '@manual-dispo-components/stopp-list/locale.de';

@Component({
  selector: 'app-recipient-synonyms',
  templateUrl: './recipient-synonyms.component.html',
  styleUrls: ['./recipient-synonyms.component.scss']
})
export class RecipientSynonymsComponent implements OnInit, OnChanges {

  @Output() seperateSynonymClicked: EventEmitter<any> = new EventEmitter<any>();

  @Input() synonym;

  @Input() set currentZiel(currentZiele) {
    let findHaupteintrag = null;
    let copySynonym = [];
    copySynonym = [...this.synonym];

    // Haupteintrag wird aus der Liste gefiltert
    if (currentZiele) {
      this.tempCurrentZiel = currentZiele;
      findHaupteintrag = this.synonym.findIndex((synonym) => synonym.name3 === currentZiele.name3 && synonym.name2 === currentZiele.name2 && synonym.name1 === currentZiele.name1);
      copySynonym.splice(findHaupteintrag, 1);

      // Tabellendaten werden gesetzt sobald von Ziel-/Adresspflege in die Detailansicht gewechselt wird
      this.rowData = copySynonym;
    }
  }

  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public gridOptions;
  public overlayLoadingTemplate;
  public overlayNoRowsTemplate;
  public rowData = [];
  public locale = AG_GRID_LOCALE_DE;
  public selectedSynonyms = [];
  public isSelectedSynonym: boolean;
  public tempCurrentZiel = null;

  columnDefs = [
    {
      field: 'name1',
      headerName: 'Name',
      valueGetter: (params) => this.setSynonymName(params.data)
    }
  ];

  constructor() {

    this.gridOptions = {
      columnDefs: this.columnDefs,
    };

    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Synonyme werden geladen...</span>';
    this.overlayNoRowsTemplate = '<span class="ag-overlay-loading-center">Keine Synonyme vorhanden</span>';

    this.defaultColDef = {
      resizable: true,
      flex: 1,
      sortable: true,
      filter: true,
    };
  }

  ngOnInit(): void {
  }

  // Wird nur dann aufgerufen, wenn ein Synonym herausgelöst wurde --> um die Tabelle zu aktualisieren
  // changes.synonym --> bezieht sich auf Input() synonym
  ngOnChanges(changes: SimpleChanges) {
    if (changes.synonym && this.tempCurrentZiel && !changes.firstChange) {

      let findHaupteintrag = null;
      let copySynonym = [];
      copySynonym = [...changes.synonym.currentValue];

      findHaupteintrag = copySynonym.findIndex((synonym) => synonym.name3 === this.tempCurrentZiel.name3 && synonym.name2 === this.tempCurrentZiel.name2 && synonym.name1 === this.tempCurrentZiel.name1);
      copySynonym.splice(findHaupteintrag, 1);
      // Tabellendaten werden erneut gesetzt sobald ein Synonym herausgelöst wurde
      this.rowData = copySynonym;
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.rowData) {
      this.gridApi.showLoadingOverlay();
    } else {
      this.gridApi.hideOverlay();
    }
  }

  onRowClicked(event: any) {
    this.isSelectedSynonym = true;
    this.selectedSynonyms = this.gridApi.getSelectedRows();
  }

  seperateClicked(): void {
    this.seperateSynonymClicked.emit(this.selectedSynonyms);
  }

  private setSynonymName(data) {
    let name1, name2, name3;

    name1 = data.name1 !== null ? data.name1 : '';
    name2 = data.name2 !== null ? data.name2 : '';
    name3 = data.name3 !== null ? data.name3 : '';

    return `${name1} ${name2} ${name3}`

  }
}
