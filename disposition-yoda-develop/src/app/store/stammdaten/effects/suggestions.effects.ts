import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StammdatenService} from '@app/core/services';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  fetchSuggestions,
  fetchSuggestionsFailure,
  fetchSuggestionsSuccess
} from '@store/stammdaten/synonyms/actions/fetch-synonyms.actions';
import {GeoaddressDto} from '@shared/models';

@Injectable()
export class SuggestionsEffects {

  fetchSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof fetchSuggestions>>(fetchSuggestions),
      switchMap((action) =>
        this.stammdatenService.fetchGeoaddressSuggestions(action).pipe(
          map((suggestions: GeoaddressDto[]) => fetchSuggestionsSuccess({suggestions})),
          catchError((error: any) => of(fetchSuggestionsFailure(error)))
        )
      )
    ));

  constructor(
    private actions$: Actions,
    private stammdatenService: StammdatenService,
  ) {
  }
}
