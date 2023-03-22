import {Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {SpontaneousTakeoverModalComponent} from '@shared/component/spontaneous-takeover/spontaneous-takeover-modal/spontaneous-takeover-modal.component';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {SpontaneousTakeoversService} from '@app/core/services/spontaneous-takeovers/spontaneous-takeovers.service';

@Component({
  selector: 'app-edit-spontaneous-takeover-button-cell-renderer',
  templateUrl: './edit-spontaneous-takeover-button-cell-renderer.component.html',
  styleUrls: ['./edit-spontaneous-takeover-button-cell-renderer.component.scss']
})
export class EditSpontaneousTakeoverButtonCellRendererComponent implements ICellRendererAngularComp, OnInit {

  public faPencilAlt = faPencilAlt;
  public params: any;

  constructor(private dialogService: DialogService, private spontaneousTakeoverService: SpontaneousTakeoversService) {
  }

  ngOnInit(): void {
  }

  refresh(params: any): boolean {
    return false;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  showModal() {
    const dialogRef = this.dialogService.open({
      modalType: DialogModalType.MODAL,
      width: 800,
      closeOnOutsideClicked: false,
      showTitle: true,
      title: 'Spontane Abholung',
      data: this.params.data

    }, SpontaneousTakeoverModalComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
        this.spontaneousTakeoverService.formSubmitted(true);
      }
    });
  }
}
