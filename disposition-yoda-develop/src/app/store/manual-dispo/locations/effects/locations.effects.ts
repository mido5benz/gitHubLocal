import {Injectable} from '@angular/core';
import {SiteService} from '@app/core/services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Location} from '@models/location/location.model';
import {catchError, map, switchMap} from 'rxjs/operators';
import {fetchLocationsFailure, fetchLocationsStart, fetchLocationsSuccess} from '../actions/fetch-locations.actions';

@Injectable()
export class LocationsEffects {
  fetchAllLocations = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof fetchLocationsStart>>(fetchLocationsStart),
      switchMap(() =>
        this.locationsService.fetchLocations().pipe(
          map((locations: Location[]) => fetchLocationsSuccess({locations})),
          catchError(() => of(fetchLocationsFailure()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private locationsService: SiteService,
  ) {
  }
}
