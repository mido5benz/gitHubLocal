import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RecipientModalComponent } from './recipient-modal/recipient-modal.component';

@Component({
  selector: 'app-button-cell',
  templateUrl: './button-cell.component.html',
  styleUrls: ['./button-cell.component.scss']
})
export class ButtonCellComponent implements ICellRendererAngularComp, OnDestroy {

  public params: any;
  public test = '';
  private modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
  ) { }

  public openModal(): void {
    const initialState = {
      tournr: this.params.value
    };
    this.modalRef = this.modalService.show(RecipientModalComponent, {initialState});
    this.modalRef.setClass('modal-lg');
    this.modalRef.content.closeBtnName = 'Close';
  }

  agInit(params: any): void {
    this.params = params;
  }

  checkTour(): boolean {
    if (this.params.value.toString().substr(0, 1) === '5') {
      return true;
    }
    if (this.params.value.toString().substr(0, 1) === '6') {
      return true;
    }
    if (this.params.value.toString().substr(0, 1) === '7') {
      return true;
    }
    if (this.params.value.toString().substr(0, 1) === '8') {
      return true;
    }
    if (this.params.value.toString().substr(0, 1) === '9') {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
  }

  refresh(params: any): boolean {
    return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {

  }
}
