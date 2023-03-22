import {Component, OnInit} from '@angular/core';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Component({
  selector: 'app-activate-maschinelle-dispo-modal',
  templateUrl: './activate-maschinelle-dispo-modal.component.html',
  styleUrls: ['./activate-maschinelle-dispo-modal.component.scss']
})
export class ActivateMaschinelleDispoModalComponent implements OnInit {

  constructor(private dialogRef: DialogRef) {
  }

  ngOnInit(): void {
  }

  closeCancel() {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL,
    });
  }

  closeOk() {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK,
    });
  }
}
