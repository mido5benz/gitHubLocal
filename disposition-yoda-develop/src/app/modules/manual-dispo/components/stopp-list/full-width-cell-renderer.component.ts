import {Component} from '@angular/core';

import {IFilterAngularComp} from '@ag-grid-community/angular';
import {IDoesFilterPassParams} from 'ag-grid-community';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'filter-cell',
  template: `
    <div class="full-width-panel d-flex justify-content-center align-items-center">
      <div>Nachladelinie</div>
    </div>
  `,
  styles: [
      `
      .full-width-panel {
        height: 100%;
        width: 100%;
        padding: 5px;
        background-color: #5a7882;
        color: white;
        text-align: center;
      }
    `,
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class FullWidthCellRenderer {
  private data: any;

  agInit(params: any): void {
    this.data = params.node.data;
  }

  getModel(): any {
  }

  isFilterActive(): boolean {
    return false;
  }
}
