import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {TagesdispoService} from '@app/core/services';
import {NgxSpinnerService} from 'ngx-spinner';
import {DispoActivFacade} from '@store/manual-dispo/activate-dispo/facades/dispo-activ.facade';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {MapService} from '@app/core/services/map/map.service';

@Component({
  selector: 'app-activate-manual-dispo-modal',
  templateUrl: './activate-manual-dispo-modal.component.html',
  styleUrls: ['./activate-manual-dispo-modal.component.scss']
})
export class ActivateTagesdispoComponent implements OnInit {

  public onClose: Subject<boolean> = new Subject<boolean>();
  public loading;
  public isActive;

  constructor(
    private router: Router,
    private dialogRef: DialogRef,
    private tagesDispoService: TagesdispoService,
    private spinnerService: NgxSpinnerService,
    private activateManualDispoFacade: DispoActivFacade,
    private mapService: MapService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.tagesDispoService.isActiveRequest().subscribe((isActive) => {
      if (isActive) {
        this.dialogRef.close({result: DialogCloseResultType.CLOSEOK});
        this.router.navigateByUrl('/manual-dispo');
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  confirm(): void {
    this.dialogRef.close({result: DialogCloseResultType.CLOSEOK});
    this.activateManualDispoFacade.activateManualDispo();

    setTimeout(() => {
      this.mapService.isMaschinelleDispoStarted(true);
    }, 3000)
  }

  close(): void {
    this.dialogRef.close({result: DialogCloseResultType.CLOSECANCEL});
  }
}
