import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ToastrService} from 'ngx-toastr';
import {TagesdispoService} from '@app/core/services';
import * as fromActivateManualDispo from '../actions/activate-dispo.actions';
import {activateManualDispoFailed, activateManualDispoRequest, activateManualDispoSuccess} from '../actions/activate-dispo.actions';
import {catchError, debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {TagesDispoActiveResponse} from '@models/index';
import {checkActivationRequest, checkActivationSuccess} from '@store/manual-dispo/activate-dispo/actions/check-activation.actions';
import {Router} from '@angular/router';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';

@Injectable()
export class ActivateManualDispoEffects {

  checkDispoState$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof checkActivationRequest>>(checkActivationRequest),
      switchMap((_action) =>
        this.activationService.isActiveRequest().pipe(
          map((isActive: boolean) => checkActivationSuccess({isActive}))
        )
      )
    )
  );

  activateTagesDispo$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof activateManualDispoRequest>>(activateManualDispoRequest),
      switchMap((_action) =>
        this.activationService.activateDispoRequest().pipe(
          switchMap((_response: TagesDispoActiveResponse) => [
            fromActivateManualDispo.activateManualDispoSuccess(),
          ]),
          // catchError((error: any) => of(fromActivateManualDispo.activateManualDispoFailed({error}))),
          catchError((response) => {
            if (response.status === 406 || response.status === 500) {
              this.alertService.error(
                response.error.value,
                'Die Manuelle Disposition konnte nicht aktiviert werden!'
              );
              return of(fromActivateManualDispo.activateManualDispoFailed(response));
            } else if (response.status === 409) {
              this.alertService.error(
                'Die Manuelle Disposition ist bereits aktiviert!'
              );
            }
          })
        )
      )
    ));

  activateDispoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof activateManualDispoSuccess>>(activateManualDispoSuccess),
      // tap(() =>
      //   this.alertService.success(
      //     'Die Manuelle Disposition wurde aktiviert!'
      //   ))
    ), {dispatch: false}
  );

  activateDispoFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof activateManualDispoFailed>>(activateManualDispoFailed),
      tap((error: any) => console.error('Fehler bei der Aktivierung der Dispostion', error)),
      tap((error: any) => this.router.navigate(['strategic-dispo'])),
      // tap((error: any) =>
      //   this.alertService.error(
      //     error.error.value,
      //     'Die Manuelle Disposition konnte nicht aktiviert werden!'
      //   ))
    ), {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private activationService: TagesdispoService,
    private alertService: ToastrService,
    private router: Router
  ) {
  }
}
