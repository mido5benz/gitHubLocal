import {Injectable} from '@angular/core';
import {TourService} from '@app/core/services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {forkJoin, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as SelectedTourAction from '../actions/selected-tour.actions';
import * as fromTourFreeze from '@store/manual-dispo/tour/actions/freeze-tour.actions';
import * as cancelTourFreezeActions from '@store/manual-dispo/tour/actions/cancel-tour-freeze.actions';

import {createDictionaryFromArray} from '@shared/utils/list.utils';
import {createReloadStopp, createTotalSums} from '@shared/utils/tour.utils';
import {DispoStopp, Tour} from '@models/index';
import {ToastrService} from 'ngx-toastr';
import {NachladeBereichInfoResponse} from '@models/tour/reloadline-info.reponse';

@Injectable()
export class SelectedTourEffects {
  freezeTour$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof fromTourFreeze.freezeTourRequest>>(fromTourFreeze.freezeTourRequest),
      mergeMap((action: any) => {
          const tourId = action.tourId;
          return this.tourService.setTourStatus(action.tourId, true).pipe(
            switchMap(() => [
              fromTourFreeze.freezeTourSuccess(),
              SelectedTourAction.setSelectedTourId({id: action.tourId})
            ]),
            catchError((error) => of(fromTourFreeze.freezeTourFailure(error)))
          );
        }
      )
    )
  );

  stornoFreezeTour$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof cancelTourFreezeActions.stornoFreezeTourRequest>>(cancelTourFreezeActions.stornoFreezeTourRequest),
      mergeMap((action) => this.tourService.setTourStatus(action.tourId, false).pipe(
          switchMap(() => [
            cancelTourFreezeActions.stornoFreezeTourSuccess(),
            SelectedTourAction.setSelectedTourId({id: action.tourId})
          ]),
          catchError((error) => of(cancelTourFreezeActions.stornoFreezeTourFailure(error)))
        )
      )
    )
  );

  tourFreezeSuccessfull$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof fromTourFreeze.freezeTourSuccess>>(fromTourFreeze.freezeTourSuccess),
        tap(() => {
          this.alertService.success('Tour wurde erfolgreich festgeschrieben');
        })
      ),
    {dispatch: false}
  );

  tourFreezeFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof fromTourFreeze.freezeTourFailure>>(fromTourFreeze.freezeTourFailure),
        tap(() => {
          this.alertService.error('Fehler beim Festschreiben der Tour');
        })
      ),
    {dispatch: false}
  );

  stornoFreezeTourFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof cancelTourFreezeActions.stornoFreezeTourFailure>>(cancelTourFreezeActions.stornoFreezeTourFailure),
        tap((error: any) => {
          if (error.status === 409) {
            this.alertService.error('Stornierung nicht möglich: Systembedingter Freeze auf der Tour!');
          }
        })
      ),
    {dispatch: false}
  );

  setSelectedTourId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedTourAction.setSelectedTourId),
      switchMap((action) => forkJoin([
        this.tourService.isTourFrozen(action.id),
        this.tourService.fetchTourById(action.id, true),
        this.tourService.isReloadEditable(action.id)
      ])),
      map(([frozen, tourdetails, reloadLineInformation]) => {
        const sumDictionary = createDictionaryFromArray(tourdetails?.dispostoppssum, 'dispostopp_id');
        this.addSumsToStopps(tourdetails, sumDictionary);

        const reloadInfo = reloadLineInformation as NachladeBereichInfoResponse;

        let stoppsWithReloadItem;

        if (reloadInfo.visible) {
          stoppsWithReloadItem = this.createStoppsWithReloadItem(tourdetails?.dispostopps, tourdetails?.nachladegrenze);
        } else {
          stoppsWithReloadItem = tourdetails?.dispostopps;
        }

        return SelectedTourAction.loadedTourDataSuccess({
          reloadEditable: reloadInfo.editable,
          duration: tourdetails?.planTourdauer,
          nr: tourdetails?.tour.tournr,
          reloadLineIndex: tourdetails?.nachladegrenze,
          tourSums: createTotalSums(tourdetails),
          stoppSums: sumDictionary,
          stopps: tourdetails?.dispostopps,
          stoppsWithReloadItem,
          ausliefertag: tourdetails?.dispostopps.length > 0 ? tourdetails?.dispostopps[0].ausliefertag : 'Keine Daten vorhanden',
          frozen,
          kennzeichenpflichtig: tourdetails?.tour.kennzeichenpflichtig,
          abgefertigt: tourdetails?.tour.abgefertigt,
          potentiell_gleiche_ziele: tourdetails?.tour.potentiell_gleiche_ziele
        });
      })
    ));

  constructor(
    private actions$: Actions,
    private tourService: TourService,
    private alertService: ToastrService
  ) {
  }

  addSumsToStopps(tour: Tour, sum): void {
    if (tour !== null) {
      tour.dispostopps.forEach((stopp: DispoStopp) => {
        stopp.sum = sum[stopp.dispostopp_id];
        stopp.tournr = tour.tour.tournr;
      });
    }
  }

  private createStoppsWithReloadItem(originalStoppList: DispoStopp[], reloadLineIndex: number): DispoStopp[] {
    if (originalStoppList || reloadLineIndex) {
      const reloadStopp = createReloadStopp();
      return this.addReloadLineStopp(originalStoppList, reloadLineIndex, reloadStopp);
    }
  }

  private addReloadLineStopp(stopps: DispoStopp[], reloadLineIndex: number, reloadStopp: DispoStopp): DispoStopp[] {
    const stoppsWithReload = [...stopps];

    /*
    Finde den Index heraus wo die Nachladelinie gesetzt werden soll
    TODO - Grund: Früher war die soll_stopp identisch wie reloadLineIndex. Touren, die Stopps mit Kommastellen (bsp. 1.5) haben, passt die soll_stopp und reloadLineIndex
           nicht überein, da die Arraylaenge nicht mehr zu soll_stopp nummer passt. Daher die Lösung über Index !
     */
    let getStoppIndex = stoppsWithReload.findIndex((stopp) => stopp.soll_stopp === reloadLineIndex);

    stoppsWithReload.forEach((stopp: DispoStopp) => stopp.isReloadStopp = false);
    // If the index is 0 then push it at the end of the list
    if (!reloadLineIndex || reloadLineIndex === 0) {
      stoppsWithReload.push(reloadStopp);
    } else {
      // If the reload line is set to a given stopps, move the reload line to the position before that stopps
      stoppsWithReload.splice(getStoppIndex, 0, reloadStopp);

    }
    return stoppsWithReload;
  }
}
