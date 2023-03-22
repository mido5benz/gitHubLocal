import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dienste, DiensteExpress, Fahrzeugtypen, Stammdaten, Wochentag} from '@models/index';
import {StammdatenService} from '../../../core/services/stammdaten/stammdaten.service';
import {TourFilter} from '../tour-filter/tour-filter.model';
import {LayerService} from '@app/core/services/layer/layer.service';
import {ActiveLayerFacade} from '@app/store/strategic-dispo/facades/activate-layer.facade';

@Component({
  templateUrl: 'filter-control.component.html',
  styleUrls: ['./filter-control.component.scss']
})
export class FilterControlComponent implements OnInit, OnDestroy {

  @Output() diensteChanged = new EventEmitter();
  @Output() fahrzeugtypChanged = new EventEmitter();
  @Output() wochentagChanged = new EventEmitter();

  @Input() isCollapsed: boolean;

  public dienste: Dienste[];
  public expressdienste: DiensteExpress[];
  public fahrzeugtypen: Fahrzeugtypen[];
  public wochentag: Wochentag[];

  public currentLayer = 'express';
  public disabledWochentag: boolean;

  constructor(
    private stammdatenService: StammdatenService,
    private cd: ChangeDetectorRef,
    private layerService: LayerService,
    private activeLayerFacade: ActiveLayerFacade
  ) {
  }

  ngOnInit(): void {
    this.stammdatenService.getStammdaten().subscribe((stammdaten: Stammdaten) => {
      this.dienste = stammdaten.dienste.filter((dienst: Dienste) => dienst.diensttyp_id !== 246 && dienst.diensttyp_id !== 247);
      this.dienste.push({diensttyp_id: 999, code: 'TEILMENGE_RADIOAKTIV', anzeige_kuerzel: 'KL7', bezeichnung: 'Klasse 7'});
      this.expressdienste = stammdaten.expressdienste.filter(
        (dienst: Dienste) =>
          dienst.diensttyp_id !== 246 && dienst.diensttyp_id !== 247);
      let found = false;
      stammdaten.expressdienste.forEach((dienst: Dienste) => {
        if (found === false && (dienst.diensttyp_id === 246 || dienst.diensttyp_id === 247)) {
          this.expressdienste.push({diensttyp_id: 999, code: 'TEILMENGE_RADIOAKTIV', anzeige_kuerzel: 'KL7', bezeichnung: 'Klasse 7'});
          found = true;
        }
      });
      this.fahrzeugtypen = stammdaten.fahrzeugtypen;
      this.wochentag = stammdaten.wochentag.slice(0, 5);
    });
    this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
      layer === 'samstag' ? this.disabledWochentag = true : this.disabledWochentag = false;
      this.currentLayer = layer;
      this.cd.detectChanges();
    });
  }

  public onWochentagChange(id: string): void {
    const wochentagId = parseInt(id, null);
    this.stammdatenService.wochentag.next(this.wochentag.find((w: Wochentag) => w.wochentag_id === wochentagId))
    this.wochentagChanged.emit(this.wochentag.find((w: Wochentag) => w.wochentag_id === wochentagId));
  }

  public onDiensteChange(id: string): void {
    let selectedDienste = this.dienste.filter(opt => opt.checked); // .map(opt => opt.code);
    if (selectedDienste.length === 0) {
      selectedDienste = this.dienste;
    }
    this.diensteChanged.emit(selectedDienste);
  }

  public onExpressDiensteChange(id: string): void {
    let selectedDienste = this.expressdienste.filter(opt => opt.checked); // .map(opt => opt.code);
    if (selectedDienste.length === 0) {
      selectedDienste = this.dienste;
    }
    this.diensteChanged.emit(selectedDienste);
  }

  onSearch(event): void {
    this.layerService.search.next(event);
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }
}
