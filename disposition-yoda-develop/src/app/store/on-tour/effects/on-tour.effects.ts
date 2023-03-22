import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {OnTourService} from '@modules/on-tour/on-tour.service';
import {fetchOnTourlistRequest, fetchOnTourlistRequestFailure, fetchOnTourlistRequestSuccess} from '@store/on-tour/actions/on-tour.actions';
import {of} from 'rxjs';

@Injectable()
export class OnTourEffects {

  loadLists$ = createEffect(() => this.actions$.pipe(
    ofType(fetchOnTourlistRequest),
    switchMap(() => this.onTourService.fetchOnTourList().pipe(
      map((loadedLists: any) => fetchOnTourlistRequestSuccess({completeOnTourList: loadedLists})),
      catchError((error) => of(fetchOnTourlistRequestFailure({error}))
      )))
  ));

  constructor(
    private actions$: Actions,
    private onTourService: OnTourService
  ) {
  }
}
