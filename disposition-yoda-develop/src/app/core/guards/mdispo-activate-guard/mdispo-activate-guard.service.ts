import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {DispoActivFacade} from '@store/manual-dispo/activate-dispo/facades/dispo-activ.facade';
import {Observable, of} from 'rxjs';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {switchMap} from 'rxjs/operators';
import {ActivateTagesdispoComponent} from '@shared/component/activate-manual-dispo-modal/activate-manual-dispo-modal.component';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Injectable({
  providedIn: 'root'
})
export class ManualDispoActivateGuard implements CanActivate {

  constructor(
    private dispoActivFacade: DispoActivFacade,
    private dialogService: DialogService,
    private router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.dispoActivFacade.activated$.pipe(
      switchMap((active) => {
        if (active) {
          return of(active);
        } else {
          const modalRef = this.dialogService.open({
            modalType: DialogModalType.MODAL,
            width: 700,
            closeOnOutsideClicked: true,
            showTitle: true,
            title: 'Dispo aktivieren',
          }, ActivateTagesdispoComponent);

          return modalRef.afterClosed.pipe(
            switchMap((result: DialogCloseResult) => {
              if (result.result === DialogCloseResultType.CLOSEOK) {
                return of(result.result === DialogCloseResultType.CLOSEOK);
              } else {
                this.router.navigateByUrl('/');
                return of(false);
              }
            })
          );
        }
      })
    );
  }
}

