import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivateDispoModalComponent } from './components/activate-dispo-modal/activate-dispo-modal.component';

@Component({
  selector: 'app-strategic-dispo-activate',
  styleUrls: ['./activate.component.scss'],
  templateUrl: './activate.component.html',
})
export class ActivateComponent {
  private modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
  ) { }

  public openModal(): void {
    this.modalRef = this.modalService.show(ActivateDispoModalComponent);
    this.modalRef.setClass('modal-lg');
    this.modalRef.content.closeBtnName = 'Close';
  }
}
