import { Component } from '@angular/core';
import { IFilterParams, RowNode, IDoesFilterPassParams } from 'ag-grid-community';
import { IFilterAngularComp } from 'ag-grid-angular';
import { TourFilter, TextFilter } from './tour-filter.model';

@Component({
  selector: 'app-filter-cell',
  template: ``
})
export class TourFilterComponent implements IFilterAngularComp {

  private valueGetter: (rowNode: RowNode) => any;
  public filter: TourFilter = null;


  agInit(params: IFilterParams): void {
    this.valueGetter = params.valueGetter;
  }

  isFilterActive(): boolean {
    return this.filter !== null && this.filter !== undefined;
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

  getModel(): TourFilter {
    return this.filter;
  }

  setModel(model: TourFilter): void {
    this.filter = model;
  }

}
