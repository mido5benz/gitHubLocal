import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Consignment, DispoStopp, GeoAdress, ZielName} from '@shared/models';
import {GridApi} from 'ag-grid-community';
import {FullWidthCellRenderer} from '@manual-dispo-components/stopp-list/full-width-cell-renderer.component';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {StoppInfoButtonComponentCellRendererComponent} from '@grid/stopp-button-renderer/stopp-info-button-component-cell-renderer.component';
import {ChangeStoppsOrderFacade} from '@store/manual-dispo/stopps/facades/change-stopps-order.facade';
import {changeTourStoppsOrderRequest} from '@store/manual-dispo/tour/actions/change-stopps-order.actions';
import {AG_GRID_LOCALE_DE} from '@manual-dispo-components/stopp-list/locale.de';
import {Subscription} from 'rxjs';
import {RescheduleService} from '@app/core/services/reschedule/reschedule.service';
import {TourService} from '@app/core/services';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tour-detail-stopp-list',
  templateUrl: './tour-detail-stopp-list.component.html',
  styleUrls: ['./tour-detail-stopp-list.component.scss']
})
export class TourDetailStoppListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() set loading(loading: boolean) {
    if (this.gridApi) {
      if (loading) {
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    }
  }

  @Input() set supressDrag(supressDrag: boolean) {
    if (this.gridApi) {
      this.gridApi.setSuppressRowDrag(supressDrag);
    }
  }

  @Output() stoppSelected: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() sortOrderChanged: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() stoppDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() tourDurationChanged: EventEmitter<number> = new EventEmitter<number>();


  public gridApi: GridApi;
  public gridOptions;
  public originalStoppOrder: DispoStopp[];
  public selectedStopps: DispoStopp[] = [];
  public defaultColDef;
  public columnDefs;
  public overlayLoadingTemplate;
  public currentRow;
  public frameworkComponents;
  public noRowsTemplate;
  public fullWidthCellRenderer;
  public getRowHeight;
  public isFullWidthCell;
  public locale = AG_GRID_LOCALE_DE;

  public reloadLineIndex = 0;
  private gridColumnApi: any;
  private subscription: Subscription = new Subscription();

  constructor(
    private selectedTourFacade: SelectedTourFacade,
    private chanageStoppOrderFacade: ChangeStoppsOrderFacade,
    private rescheduleService: RescheduleService,
    private tourService: TourService,
    private alertService: ToastrService) {

    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Stopps werden geladen...</span>';
    this.noRowsTemplate = '<span class="ag-overlay-loading-center">Die gewählte Tour ist leer</span>';

    this.gridOptions = {
      columnDefs: this.columnDefs,
      accentedSort: true,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
      },
    };

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      // minWidth: 80,
    };
    this.columnDefs = [
      {
        field: 'soll_stopp',
        headerName: 'Stopp',
        filter: 'agTextColumnFilter',
        rowDrag: true,
        minWidth: 90,
        cellStyle: (params) => this.setColumnColorAfterReloadLine(params?.data)
      },
      {
        field: 'versender_bcvsnr',
        headerName: 'BCV',
        headerTooltip: 'Barcodeversender',
        filter: 'agTextColumnFilter',
        minWidth: 80,
        valueGetter: (params) => this.getBCSSNr(params?.data)
      },
      {
        headerName: 'Versender',
        filter: 'agTextColumnFilter',
        minWidth: 130,
        valueGetter: (params) => this.getVersenderList(params)
      },
      {
        field: 'ziel_name.name1',
        headerName: 'Ziel',
        filter: 'agTextColumnFilter',
        cellStyle: {'white-space': 'normal'},
        minWidth: 130,
        valueGetter: (params) => this.getZielName(params.data.ziel_name)
      },
      {
        field: 'ziel_name.geoposition.geoadresse.strasse',
        headerName: 'Strasse',
        filter: 'agTextColumnFilter',
        minWidth: 130,
        valueGetter: (params) => this.getStrasseHausnr(params.data.ziel_name.geoposition.geoadresse)
      },
      {
        field: 'ziel_name.geoposition.geoadresse.plz',
        headerName: 'PLZ',
        filter: 'agTextColumnFilter',
        minWidth: 80,
      },
      {
        field: 'ziel_name.geoposition.geoadresse.ort',
        headerName: 'Ort',
        filter: 'agTextColumnFilter',
        minWidth: 130,
      },
      {
        headerName: 'V-Details',
        filter: 'agTextColumnFilter',
        cellRenderer: 'stoppInfoButtonCellRenderer',
        minWidth: 80
      },
      {
        headerName: 'SDG',
        headerTooltip: 'Sendung',
        filter: 'agTextColumnFilter',
        minWidth: 80,
        valueGetter: (params) => params?.data?.sum?.sendung_sum,
      },
      {
        field: 'sum.ist_col_sum',
        headerName: 'I-COL',
        filter: 'agTextColumnFilter',
        headerTooltip: 'Ist Column',
        minWidth: 90,
      },
      {
        field: 'sum.soll_col_sum',
        headerName: 'S-COL',
        filter: 'agTextColumnFilter',
        headerTooltip: 'Soll Column',
        minWidth: 90,
      },
      {
        field: 'sum.ist_pal_sum',
        headerName: 'I-PAL',
        filter: 'agTextColumnFilter',
        headerTooltip: 'Ist Paletten',
        minWidth: 90,
      },
      {
        field: 'sum.soll_pal_sum',
        headerName: 'S-PAL',
        filter: 'agTextColumnFilter',
        headerTooltip: 'Soll Paletten',
        minWidth: 90,
      },
      {
        field: 'sum.ist_gewicht_sum',
        headerName: 'I-KG',
        filter: 'agTextColumnFilter',
        headerTooltip: 'Ist Gewicht',
        minWidth: 90,
      },
      {
        field: 'sum.soll_gewicht_sum',
        headerName: 'S-KG',
        filter: 'agTextColumnFilter',
        headerTooltip: 'Soll Gewicht',
        minWidth: 90,
      },
      {
        field: 'sum.amb_col_sum',
        headerName: 'AMB-C',
        headerTooltip: 'Ambient Colli',
        filter: 'agTextColumnFilter',
        minWidth: 100,
      },
      {
        field: 'sum.amb_pal_sum',
        headerName: 'AMB-P',
        headerTooltip: 'Ambient Paletten',
        filter: 'agTextColumnFilter',
        minWidth: 100,
      },
      {
        field: 'sum.gg_punkte_sum',
        headerName: 'GG-P.',
        headerTooltip: 'Gefahrgutpunkte',
        minWidth: 100,
        valueFormatter: (params) => params.data?.sum?.gg_punkte_sum.toFixed(2)
      },
      {
        field: 'dienste',
        headerName: 'Dienste',
        filter: 'agTextColumnFilter',
        minWidth: 100,
        valueGetter: (params) => this.getDienste(params.data),
      },
      {
        field: 'planBearbeitungszeit',
        headerName: 'PBZ',
        headerTooltip: 'Planbearbeitungszeit',
        filter: 'agTextColumnFilter',
        minWidth: 80,
        valueFormatter: (params) => this.formatBearbeitungszeit(params)
      },
      {
        field: 'planStartBearbeitung',
        valueFormatter: this.sliceTime,
        headerName: 'PSB',
        headerTooltip: 'plan Startbearbeitung',
        filter: 'agTextColumnFilter',
        minWidth: 80,
      },
      {
        field: 'abholauftrag',
        headerName: 'AHA',
        headerTooltip: 'Abholauftrag',
        filter: 'agTextColumnFilter',
        minWidth: 90,
        valueGetter: (params) => params.data.abholauftrag ? 'Ja' : 'Nein'
      },
      {
        field: '',
        headerName: 'Ü',
        headerTooltip: 'Übernahme',
        filter: 'agTextColumnFilter',
        minWidth: 70,
        valueGetter: (params) => params.data?.uebernahmen?.length > 0 ? 'Ja' : 'Nein'
      },
      {
        headerName: 'Hinweise',
        minWidth: 100,
        valueGetter: (params) => this.showHinweise(params?.data?.sendungen)
      },
    ];

    this.frameworkComponents = {
      fullWidthCellRenderer: FullWidthCellRenderer,
      stoppInfoButtonCellRenderer: StoppInfoButtonComponentCellRendererComponent
    };
    this.isFullWidthCell = (rowNode) => this.isFullWidth(rowNode);
    this.fullWidthCellRenderer = 'fullWidthCellRenderer';
  }

  getDienste(dispostopp: DispoStopp): string {
    const dienste = [];
    dispostopp?.sendungen?.forEach((sendung: Consignment) => {
      if (sendung.dienste) {
        const sendungDienste = sendung?.dienste.split(' ');
        sendungDienste.forEach((dienst: string) => {
          if (dienste.indexOf(dienst) === -1) {
            dienste.push(dienst);
          }
        });
      }
    });
    return dienste.join(', ');
  }

  sliceTime(param: any) {
    if (param.value) {
      const slicedTime = param?.value?.slice(11, 16) + ' ' + 'Uhr';
      return slicedTime;
    }
  }

  showHinweise(sendung: any) {

    for (let i = 0; i < sendung.length; i++) {
      if (sendung[i].operativer_hinweis !== null || sendung[i].empfaenger_hinweis !== null) {
        return 'Ja';
      } else {
        return 'Nein';
      }
    }
  }

  ngOnInit(): void {
    this.zieleZusammenfuehren();
  }

  isFullWidth(rowNode): boolean {
    return rowNode.data.isReloadStopp;
  }

  setColumnColorAfterReloadLine(params: any) {
    if (params.soll_stopp >= this.reloadLineIndex && this.reloadLineIndex > 0) {
      return {backgroundColor: '#5a7882', fontWeight: 'bold', color: 'white'};
    }
  }

  onGridReady(gridParams: any): void {
    this.gridApi = gridParams.api;
    this.gridColumnApi = gridParams.columnApi;
    this.gridApi.setSuppressRowDrag(true);

    // Stopps mit der Nachladelinie holen und den Index davon zwischenspeichern
    this.subscription.add(this.selectedTourFacade.stoppsWithReload$.subscribe((stopps: DispoStopp[]) => {

      if (stopps !== undefined) {
        for (let i = 0; i < stopps.length; i++) {
          if (stopps[i].soll_stopp === 12345) {
            this.reloadLineIndex = stopps[i + 1]?.soll_stopp;
          }
        }
        // Nachladelinie herausfltern und die Tabelle ohne Nachladelinie anzeigen
        let stoppsWithoutReloadLine = stopps.filter((stopp) => stopp.isReloadStopp !== true);
        this.rescheduleService.tourIsEmpty(false);

        this.gridApi.setRowData(stoppsWithoutReloadLine);
        this.showLoading();
      } else {
        this.rescheduleService.tourIsEmpty(true);
        // this.router.navigate(['manual-dispo']);
        this.gridApi.setRowData([]);
        setTimeout(() => {
          this.gridApi.showNoRowsOverlay();
        }, 250);
      }
    }));
  }

  zieleZusammenfuehren() {
    this.subscription.add(this.tourService.zieleZusammenfuehrenObserv.subscribe((selectedZiele) => {
      if (selectedZiele !== null) {

        let tourId: number = selectedZiele[0].tour_id;
        const dispostopp_ids = [];

        const firstId = selectedZiele[0].dispostopp_id;
        for (let i = 0; i < selectedZiele.length; i++) {
          dispostopp_ids.push(selectedZiele[i].dispostopp_id);
        }

        const requestBody = {
          dispostopp_id: firstId,
          dispostopp_ids: dispostopp_ids
        };

        this.tourService.stoppsInManualDispoVereinigen(requestBody).subscribe((isProcessCompleted) => {
          if (isProcessCompleted) {
            this.gridApi.showLoadingOverlay();
            this.tourService.fetchTourById(tourId, true).subscribe((tour) => {
              tour.dispostoppssum.map((dispostoppSum) => {
                tour.dispostopps.map((dispostopp) => {
                  if (dispostopp.dispostopp_id === dispostoppSum.dispostopp_id) {
                    dispostopp.sum = dispostoppSum;
                  }
                });
              });
              this.alertService.success('Ziele erfolgreich zusammengeführt');
              this.gridApi.hideOverlay();
              this.gridApi.setRowData(tour.dispostopps);
              this.tourDurationChanged.emit(tour.planTourdauer);
            });
          }
        });
      }
    }));
  }

  ngOnChanges(changes: any) {
    if (this.gridApi) {
      this.showLoading();
    }
  }

  showLoading() {
    this.subscription.add(this.selectedTourFacade.loading$.subscribe((loading: boolean) => {
      if (loading) {
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    }));
  }

  onRowClicked(): void {
    this.stoppSelected.emit(this.gridApi.getSelectedRows().map((row: any) => row));
  }

  onRowDoubleClicked($event): void {
    this.stoppDoubleClicked.emit($event);
  }

  onRowDragEnd($event): void {
    this.gridApi.showLoadingOverlay();
    this.stoppVerschiebung(this.originalStoppOrder, this.currentRow, $event.overIndex, $event.node.data.tour_id);
  }


  stoppVerschiebung(stopps, currentRow, overIndex, tour_id) {
    //TODO: Stopps von unten nach oben verschieben
    if (currentRow > overIndex) {

      let startIndex = overIndex;
      let endIndex = currentRow;

      let verschobeneStopp = [];

      let previousObject = {...stopps[endIndex]};
      let currentObject = {...stopps[startIndex]};

      previousObject.soll_stopp = currentObject.soll_stopp;
      verschobeneStopp.push(previousObject);

      let kopieStopps = this.erstelleKopieObjekt(stopps);

      for (let i = startIndex; i <= endIndex; i++) {
        if (kopieStopps[i + 1]) {
          kopieStopps[i].soll_stopp = kopieStopps[i + 1].soll_stopp;
        }
      }

      // Hier wird die verschobene Object durch das alte ersetzt
      let resultStopps = kopieStopps.map((obj) => verschobeneStopp.find((o) => o.dispostopp_id === obj.dispostopp_id) || obj);
      this.chanageStoppOrderFacade.dispatch(changeTourStoppsOrderRequest({tourId: tour_id, stopps: resultStopps}));


    } else {

      //TODO: Stopps von oben nach unten verschieben

      let startIndex = overIndex;
      let endIndex = currentRow;

      let verschobeneStopp = [];

      let previousObject = {...stopps[endIndex]};
      let currentObject = {...stopps[startIndex]};

      previousObject.soll_stopp = currentObject.soll_stopp;
      verschobeneStopp.push(previousObject);

      let kopieStopps = this.erstelleKopieObjekt(stopps);

      for (let i = startIndex; i >= endIndex; i--) {
        if (kopieStopps[i - 1]) {
          kopieStopps[i].soll_stopp = kopieStopps[i - 1].soll_stopp;
        }
      }

      // Hier wird die verschobene Object durch das alte ersetzt
      let resultStopps = kopieStopps.map((obj) => verschobeneStopp.find((o) => o.dispostopp_id === obj.dispostopp_id) || obj);
      this.chanageStoppOrderFacade.dispatch(changeTourStoppsOrderRequest({tourId: tour_id, stopps: resultStopps}));

    }
  }

  erstelleKopieObjekt(stopps) {
    // Hier wird ein Kopie von Stopps erstellt - wegen readonly
    let copyStoppObject;
    let newStopps = [];
    for (let i = 0; i < stopps.length; i++) {
      copyStoppObject = {...stopps[i]};
      newStopps.push(copyStoppObject);
    }
    return newStopps;
  }


  public onRowDragStart($event): void {
    this.currentRow = $event.overIndex;
    const stopps = [];
    this.gridApi.forEachNode(node => stopps.push(node.data));
    this.originalStoppOrder = stopps;

  }

  public getVersenderList(params) {
    const versenderliste = [];
    if (params.data.sendungen.length > 0) {
      params?.data?.sendungen?.map((sendung) => {
        versenderliste.push(sendung.versender_name);
      }).join(', ');

    } else if (params.data.uebernahmen.length > 0) {
      params.data.uebernahmen.map((uebernahme) => {
        versenderliste.push(uebernahme.versender_name);
      }).join(', ');
    }
    return Array.from(new Set(versenderliste));
  }

  private getBCSSNr(dispostopp: DispoStopp): string {
    if (!dispostopp.sendungen && !dispostopp.uebernahmen) {
      return 'Kein BCVSNR gefunden';
    }

    if (dispostopp.sendungen.length >= 1) {
      return dispostopp?.sendungen[0]?.versender_bcvsnr;
    } else if (dispostopp.uebernahmen.length >= 1) {
      return dispostopp?.uebernahmen[0].versender_bcvsnr;
    }
  }

  formatBearbeitungszeit(params) {
    const minutes = Math.floor(params.value / 60);
    const seconds = params.value - minutes * 60;
    if (minutes > 99) {
      return strPadLeft(minutes, '0', 3) + ':' + strPadLeft(seconds, '0', 2);
    }
    return strPadLeft(minutes, '0', 2) + ':' + strPadLeft(seconds, '0', 2);
  }

  public getZielName(zielName: ZielName): string {
    let name1, name2, name3;

    name1 = zielName.name1 === null ? '' : zielName.name1;
    name2 = zielName.name2 === null ? '' : zielName.name2;
    name3 = zielName.name3 === null ? '' : zielName.name3;

    return `${name1}  ${name2}  ${name3}`;
  }

  private getStrasseHausnr(geoadresse: GeoAdress) {
    let strasse, hausnr;

    strasse = geoadresse.strasse === null ? '' : geoadresse.strasse;
    hausnr = geoadresse.hausnr === null ? '' : geoadresse.hausnr;

    return `${strasse}  ${hausnr}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

const strPadLeft: (str: any, pad, length) => any = (str: any, pad, length): any => (new Array(length + 1).join(pad) + str).slice(-length);
