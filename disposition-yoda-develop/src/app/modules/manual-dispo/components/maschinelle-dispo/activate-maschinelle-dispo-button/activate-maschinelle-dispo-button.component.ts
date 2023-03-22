import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '@app/core/services/map/map.service';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {ToastrService} from 'ngx-toastr';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {ActivateMaschinelleDispoModalComponent} from '@manual-dispo-components/maschinelle-dispo/activate-maschinelle-dispo-modal/activate-maschinelle-dispo-modal.component';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-activate-maschinelle-dispo-button',
  templateUrl: './activate-maschinelle-dispo-button.component.html',
  styleUrls: ['./activate-maschinelle-dispo-button.component.scss']
})
export class ActivateMaschinelleDispoButtonComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService,
              private tourListFacade: TourlistFacade,
              private alertService: ToastrService,
              private cd: ChangeDetectorRef,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  startMaschinelleDispo(): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 600,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Maschinelle Disposition anstoßen'
      },
      ActivateMaschinelleDispoModalComponent);

    dialogRef.afterClosed.subscribe((closeResult: DialogCloseResult) => {
      if (closeResult.result === DialogCloseResultType.CLOSEOK) {
        this.activatedMaschinelleDispo();
      }
    });
  }

  activatedMaschinelleDispo() {
    this.loading = true;
    this.cd.detectChanges();
    this.subscription.add(this.mapService.activateMaschinelleDispo().subscribe((result) => {
      if (result) {
        this.loading = false;
        this.cd.detectChanges();

        this.mapService.isMaschinelleDispoStarted(true);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cd.detach();
  }

}
