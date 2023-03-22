import {Component, OnDestroy} from '@angular/core';
import { LayerFilter, TextFilter } from '@app/shared/component/tour-filter/tour-filter.model';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid-community';
import { ActiveLayerFacade } from '@store/strategic-dispo/facades/activate-layer.facade';
import { setActiveLayer } from '@store/strategic-dispo/actions/active-layer.actions';
import { PlanungenService } from '@app/core/services/planungen/planungen.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-strategic-dispo-layer',
  templateUrl: 'layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements IFilterAngularComp, OnDestroy {
  private subscription: Subscription = new Subscription();

  private valueGetter: (rowNode: RowNode) => any;
  public filter: LayerFilter = null;

  public currentLayer: string;
  constructor(
    private activeLayerFacade: ActiveLayerFacade,
    private planungenService: PlanungenService
  ) {
    this.subscription.add(this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
      this.currentLayer = layer;
    }));
  }

  isFilterActive(): boolean {
    return true;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    if (this.filter.filters.length === 0) {
      return true;
    }

    const valueLowerCase = this.valueGetter(params.node).toString().toLowerCase();

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.filter.filters.length; i++) {
      const f: TextFilter = this.filter.filters[i];
      const filterTextLoweCase = f.filter.toLowerCase();
      let pass = false;

      switch (f.type) {
        case 'contains':
          pass = valueLowerCase.indexOf(filterTextLoweCase) >= 0;
          break;
        case 'notContains':
          pass = valueLowerCase.indexOf(filterTextLoweCase) === -1;
          break;
        case 'equals':
          pass = valueLowerCase === filterTextLoweCase;
          break;
        case 'notEqual':
          pass = valueLowerCase !== filterTextLoweCase;
          break;
        case 'startsWith':
          pass = valueLowerCase.indexOf(filterTextLoweCase) === 0;
          break;
        case 'endsWith':
          const index = valueLowerCase.lastIndexOf(filterTextLoweCase);
          pass = index >= 0 && index === (valueLowerCase.length - filterTextLoweCase.length);
          break;
      }

      if (pass) {
        return true;
      }
    }

    return false;
  }

  getModel(): LayerFilter {
    return this.filter;
  }

  setModel(model: LayerFilter): void {
    this.filter = model;
  }

  onNewRowsLoaded?(): void {
  }

  getFrameworkComponentInstance?(): void {
    throw new Error('Method not implemented.');
  }

  getModelAsString?(model: any): string {
    throw new Error('Method not implemented.');
  }

  agInit(params: IFilterParams): void {
    this.valueGetter = params.valueGetter;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  wochentag(): boolean {
    if (this.planungenService.getSamstag() === true) {
      return true;
    } else {
      return false;
    }
  }

  samstag(): boolean {
    if (this.planungenService.getSamstag() !== true) {
      return true;
    } else {
      return false;
    }
  }

  onNavItemClicked(layer: string): void {
    this.activeLayerFacade.dispatch(setActiveLayer({ activeLayer: layer }));
  }

  ngOnDestroy(): void {
     this.subscription.unsubscribe();
  }
}
