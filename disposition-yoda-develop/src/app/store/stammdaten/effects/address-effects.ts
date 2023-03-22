import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StammdatenService} from '@app/core/services';

import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AddressService} from '@app/core/services/address/address.service';
import {Address} from '@models/address/address.model';
import {ToastrService} from 'ngx-toastr';
import {
  fetchSynonymFailure,
  fetchSynonymsRequest,
  fetchSynonymSuccess
} from '@store/stammdaten/actions/fetch-synonyms.actions';
import {
  createSynonymFailure,
  createSynonymRequest,
  createSynonymSuccess
} from '@store/stammdaten/actions/create-synonyms.actions';
import {
  createAddressFailure,
  createAddressRequest,
  createAddressSuccess
} from '@store/stammdaten/actions/create-address.actions';
import {
  seperateSynonymFailure,
  seperateSynonymRequest,
  seperateSynonymSuccess
} from '@store/stammdaten/actions/seperate-synonym.actions';
import {
  fetchArchivedAddressesCountFailure,
  fetchArchivedAddressesCountRequest, fetchArchivedAddressesCountSuccess,
  fetchUnassignedAddressesCountRequest, fetchUnassignedAddressesCountSuccess,
  fetchUnassignedAddressesFailure,
  fetchUnassignedAddressesRequest,
  fetchUnassignedAddressesSuccess
} from '@store/stammdaten/actions/fetch-unassigned-addresses.actions';
import {
  saveUnassignedAddressRequest,
  saveUnassignedAddressSuccess
} from '@store/stammdaten/actions/unassigned-adresses.actions';

@Injectable()
export class AddressEffects {
  seperateSynonymRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(seperateSynonymRequest),
      switchMap((action: any) => this.addressService.seperateSynonym(action.payload).pipe(
          map((synonyms) => seperateSynonymSuccess({zielNameId: action.payload.ziel_name_synonym_id})),
          catchError((error: any) => of(seperateSynonymFailure(error)))
        )
      )
    ));

  fetchSynonymsForZielName$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof fetchSynonymsRequest>>(fetchSynonymsRequest),
      switchMap((action: any) => this.addressService.fetchSynonyms(action.zielNameId).pipe(
          map((synonyms) => fetchSynonymSuccess({synonyms})),
          catchError((error: any) => of(fetchSynonymFailure(error)))
        )
      )
    ));

  fetchUnassignedAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUnassignedAddressesRequest),
      switchMap((action) =>
        this.addressService.fetchUnassignedAddresses(action.days, action.records).pipe(
          map((unassignedAddresses: Address[]) => fetchUnassignedAddressesSuccess({addresses: unassignedAddresses})),
          catchError((error: any) => of(fetchUnassignedAddressesFailure(error)))
        )
      )
    ));

  fetchUnassignedAddressesCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUnassignedAddressesCountRequest),
      switchMap((action) =>
        this.addressService.fetchUnassignedAddressesCount().pipe(
          map((count: number) => fetchUnassignedAddressesCountSuccess({count: count})),
          catchError((error: any) => of(fetchUnassignedAddressesFailure(error)))
        )
      )
    ));

  fetchArchivedAddressesCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchArchivedAddressesCountRequest),
      switchMap((action) =>
        this.addressService.getArchivedAddressCount().pipe(
          map((count: number) => fetchArchivedAddressesCountSuccess({count: count})),
          catchError((error: any) => of(fetchArchivedAddressesCountFailure(error)))
        )
      )
    ));

  createAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAddressRequest),
      switchMap((action) =>
        this.addressService.createAddress().pipe(
          map(() => createAddressSuccess()),
          catchError((error: any) => of(createAddressFailure(error)))
        )
      )
    ));

  saveUnassignedAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(saveUnassignedAddressRequest),
      switchMap((action) =>
        this.addressService.saveUnassignedAdress(action.address).pipe(
          tap(_ => this.alertService.success('Adresse wurde gespeichert')),
          switchMap((response) => [
            saveUnassignedAddressSuccess({unassignedAdresses: action.address}),
            fetchUnassignedAddressesCountRequest(),
          ]),
          catchError((error: any) => of(createSynonymFailure(error)))
        )
      )
    ));

  createSynonym$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSynonymRequest),
      switchMap((action) =>
        this.addressService.createSynonym(action.synonym).pipe(
          switchMap((_response) => [
            createSynonymSuccess({geoadresseFehlerId: action.synonym.geoadresse_fehler_id}),
            fetchUnassignedAddressesCountRequest()
          ]),
          catchError((error: any) => of(createSynonymFailure(error)))
        )
      )
    ));

  createAddressSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAddressSuccess),
      tap(_ => this.alertService.success('Adresse wurde gespeichert'))
    ), {dispatch: false});

  createAddressFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAddressFailure),
      tap(_ => this.alertService.error('Adresse konnte nicht gespeichert werden'))
    ), {dispatch: false});

  createSynonymSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSynonymSuccess),
      tap(_ => this.alertService.success('Synonym wurde gespeichert'))
    ), {dispatch: false});

  seperateSynonymSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(seperateSynonymSuccess),
      tap(_ => this.alertService.success('Synonym wurde herausgelöst'))
    ), {dispatch: false});

  createSynonymFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAddressFailure),
      tap(_ => this.alertService.error('Synonym konnte nicht angelegt werden'))
    ), {dispatch: false});


  constructor(
    private actions$: Actions,
    private stammdatenService: StammdatenService,
    private addressService: AddressService,
    private alertService: ToastrService
  ) {
  }
}
