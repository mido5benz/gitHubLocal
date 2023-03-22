import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Consignment, DispoStopp, DispoSum, Tour} from '@models/index';
import {TourService} from '@app/core/services';
import {GridApi} from 'ag-grid-community';
import {FullWidthCellRenderer} from '@manual-dispo-components/stopp-list/full-width-cell-renderer.component';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-stopp-list',
  templateUrl: './stopp-list.component.html',
  styleUrls: ['./stopp-list.component.scss']
})
export class StoppListComponent implements OnInit, OnChanges {

  @Input() editModeEnabled: boolean;

  @Output() tourDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowSelectionChanged = new EventEmitter<any>();
  @Output() sortOrderChanged = new EventEmitter<DispoStopp[]>();

  public columnDefs: any[];
  public defaultColDef: any;

  public frameworkComponents;
  public fullWidthCellRenderer;
  public getRowHeight;
  public isFullWidthCell;

  private gridApi: GridApi;
  private gridColumnApi: any;
  private stopps: DispoStopp[] = [];
  private currentRow: any;

  constructor(private route: ActivatedRoute, private tourService: TourService) {
    this.defaultColDef = {
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
    };
    this.columnDefs = [
      {
        field: 'soll_stopp',
        headerName: 'Sollstopp',
        filter: 'agTextColumnFilter',
        rowDrag: true
      },
      {
        field: 'planAnkunft',
        headerName: 'gepl. Ankunft',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'versender_bcvsnr',
        headerName: 'BCV-Versendernummer',
        filter: 'agTextColumnFilter',
        valueGetter: (params) => this.getBCSSNr(params.data),
      },
      {
        field: 'weight',
        headerName: 'Gewicht (kg)',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ziel_name.name1',
        headerName: 'Ziel',
        filter: 'agTextColumnFilter',
        cellStyle: {'white-space': 'normal'},
        // valueGetter: (params) => this.getAdress(params.data),
      },
      {
        field: 'sendungen',
        headerName: 'Sendungen',
        filter: 'agTextColumnFilter',
        valueGetter: (params) => this.getSendungenCount(params.data),
      },
      {
        field: 'uebernahmen',
        headerName: 'Übernahmen',
        filter: 'agTextColumnFilter',
        valueGetter: (params) => this.getUebernahmeCount(params.data),
      },
      {
        field: 'colCount',
        headerName: 'Colli',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'palCount',
        headerName: 'Paletten',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ambient',
        headerName: 'Ambient',
        filter: 'agTextColumnFilter',
        // valueGetter: (params) => this.isAmbient(params.data),
        valueFormatter: (value) => value ? 'Nein' : 'Ja',
      },
      {
        field: 'dienste',
        headerName: 'Dienste',
        filter: 'agTextColumnFilter',
        valueGetter: (params) => this.getDienste(params.data),
      },
      {
        field: 'planStartBearbeitung',
        headerName: 'Start Bearbeitung',
        filter: 'agTextColumnFilter',
      }
    ];

    this.frameworkComponents = {fullWidthCellRenderer: FullWidthCellRenderer};
    this.isFullWidthCell = (rowNode) => this.isFullWidth(rowNode);
    this.fullWidthCellRenderer = 'fullWidthCellRenderer';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridApi) {
      this.gridApi.setSuppressRowDrag(!changes.editModeEnabled.currentValue);
    }
  }

  ngOnInit(): void {

  }

  onGridReady(gridParams): void {
    this.route.params.pipe(
      map((params: any) => params.tourId),
      switchMap((tourId: number) => this.tourService.fetchTourById(tourId, true))
    ).subscribe((tour: Tour) => {
      const stopps = tour.dispostopps;
      const sums = tour.dispostoppssum;

      const reloadLineIndex = tour.nachladegrenze;

      const reloadStopp: DispoStopp = {
        dispostopp_id: null,
        soll_stopp: null,
        nachladebereich: null,
        isReloadStopp: true
      };

      if (!reloadLineIndex) {
        stopps.push(reloadStopp);
      } else {
        stopps.splice(reloadLineIndex, 0, reloadStopp);
      }

      this.gridApi = gridParams.api;
      this.gridColumnApi = gridParams.columnApi;

      this.gridApi.setSuppressRowDrag(true);

      stopps.forEach((stopp: DispoStopp) => {
        const id = stopp.dispostopp_id;

        const sum = sums.find((s: DispoSum) => s.dispostopp_id === id);
        if (sum) {
          stopp.weight = sum.gewicht_sum;
          stopp.colCount = sum.col_sum;
          stopp.palCount = sum.pal_sum;
        }
      });

      this.stopps = stopps;
      this.gridApi.setRowData(stopps);
    });
  }

  isFullWidth(rowNode): boolean {
    return rowNode.data.reloadStopp;
  }

  onRowDragEnd($event): void {
    // When we are over the reload stopps prevent everything
    if (this.stopps[$event.overIndex].isReloadStopp) {
      return;
    }

    const prevSollStopp = this.stopps[this.currentRow].soll_stopp;
    const currentSollStopp = this.stopps[$event.overIndex].soll_stopp;

    this.stopps[this.currentRow].soll_stopp = currentSollStopp;
    this.stopps[$event.overIndex].soll_stopp = prevSollStopp;

    const reloadLineIndex = this.stopps.findIndex((stopp) => stopp.isReloadStopp);
    this.stopps.splice(reloadLineIndex, 1);
    this.stopps.sort((x1, x2) => x1.soll_stopp - x2.soll_stopp);

    const reloadStopp: DispoStopp = {
      dispostopp_id: null,
      soll_stopp: null,
      nachladebereich: null,
      isReloadStopp: true
    };

    if (!reloadLineIndex) {
      this.stopps.push(reloadStopp);
    } else {
      this.stopps.splice(reloadLineIndex, 0, reloadStopp);
    }

    this.gridApi.setRowData(this.stopps);
    const filteredStopps = this.stopps.filter((stopp: DispoStopp) => !stopp.isReloadStopp);
    this.sortOrderChanged.emit(filteredStopps);
  }

  onRowDragStart($event): void {
    this.currentRow = $event.overIndex;
  }

  onRowDoubleClicked($event): void {
    this.tourDoubleClicked.emit($event);
  }

  onRowClicked($event): void {
    this.rowSelectionChanged.emit(this.gridApi.getSelectedRows());
  }

  getBCSSNr(dispostopp: DispoStopp): string {
    if (!dispostopp.sendungen) {
      return '';
    }

    if (dispostopp.sendungen.length >= 1) {
      return dispostopp?.sendungen[0]?.versender_bcvsnr;
    }
  }

  getSendungenCount(dispoStopp: DispoStopp): number {
    return dispoStopp?.sendungen?.length;
  }

  getUebernahmeCount(dispoStopp: DispoStopp): number {
    if (!dispoStopp?.uebernahmen) {
      return 0;
    }
    return dispoStopp?.uebernahmen?.length;
  }

  getDienste(dispostopp: DispoStopp): string {
    const dienste = [];
    dispostopp.sendungen.forEach((sendung: Consignment) => {
      const sendungDienste = sendung.dienste.split(' ');
      sendungDienste.forEach((dienst: string) => {
        if (dienste.indexOf(dienst) === -1) {
          dienste.push(dienst);
        }
      });
    });
    return dienste.join(', ');
  }
}
