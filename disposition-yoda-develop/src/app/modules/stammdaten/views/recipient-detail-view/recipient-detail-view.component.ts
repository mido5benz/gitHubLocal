import {Component, OnInit} from '@angular/core';
import {StammdatenFacade} from '@store/stammdaten/facades/stammdate.facade';
import {Recipient} from '@models/address/address.model';
import {combineLatest, Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/internal/operators';
import {switchMap, tap} from 'rxjs/operators';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {AddSynonymFormComponent} from '@modules/stammdaten/views/recipient-detail-view/components/add-synonym-form/add-synonym-form.component';
import {SeperateSynonymRequest} from '@models/server-request/seperate-synonym.request';
import {HttpClient} from '@angular/common/http';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {RecipientDeliveryPeriodComponent} from '@modules/stammdaten/components/recipient-delivery-period/recipient-delivery-period.component';
import {RecipientFacade} from '@store/stammdaten/facades/recipient.facade';
import {Zeitfenster} from '@models/recipient/recipient.models';
import {removeDeliveryPeriod, setTimeFrames} from '@store/stammdaten/actions/recipient.actions';
import {environment} from '@environment*';
import {ToastrService} from 'ngx-toastr';
import {fetchSynonymsRequest} from '@store/stammdaten/actions/fetch-synonyms.actions';
import {Synonym} from '@models/address/synonym.model';
import {seperateSynonymRequest} from '@store/stammdaten/actions/seperate-synonym.actions';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {DialogCloseResult} from '@models/dialog/dialog.models';

@Component({
  selector: 'app-recipient-detail-view',
  templateUrl: './recipient-detail-view.component.html',
  styleUrls: ['./recipient-detail-view.component.scss']
})
export class RecipientDetailViewComponent implements OnInit {

  deliveryTimeFramePeriods$: Observable<any[]>;
  deliveryTimeFramePeriodsCount$: Observable<number>;

  currentZiel$: Observable<Recipient>;
  synonyms$: Observable<any>;

  deliveryTimes = [];
  zielNameId;
  currentZielName;
  recipientAddress;
  saveCheckValue: boolean = true;

  constructor(
    private alertService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private dialogService: DialogService,
    private addressFacade: AddressFacade,
    private stammdatenFacade: StammdatenFacade,
    private recipientFacade: RecipientFacade,
    private route: ActivatedRoute) {

    this.recipientAddress = this.router.getCurrentNavigation().extras.state;

    this.route.params.pipe(
      map((params) => +params.id),
      tap((zielNameId) => this.zielNameId = zielNameId),
      tap((zielNameId) => this.stammdatenFacade.dispatch(fetchSynonymsRequest({zielNameId})))
    ).subscribe();
  }

  ngOnInit(): void {
    this.deliveryTimeFramePeriods$ = this.recipientFacade.deliveryPeriods$;
    this.deliveryTimeFramePeriodsCount$ = this.recipientFacade.deliveryPeriodsCount$;

    const geoPosId = this.activatedRoute.snapshot.queryParamMap.get('geopos');

    this.currentZiel$ = this.activatedRoute.paramMap.pipe(
      map((paramMap: any) => paramMap.params.id),
      switchMap((zielNameId: number) =>
        combineLatest([this.http.get<any[]>(`${environment.apiHost}/ziele/geopositionen/${geoPosId}`), of(zielNameId)])
      ),
      tap(([ziele, zielNameId]) => this.currentZielName = zielNameId),
      map(([ziele, zielNameId]) => ziele.find((ziel) => ziel.ziel_name_id === +zielNameId)),
      tap((currentZiel) => this.recipientFacade.dispatch(setTimeFrames({timeFrames: currentZiel.zeitfenster})))
    );

    this.synonyms$ = this.addressFacade.synonyms$;
  }

  openDeliveryPeriodDialog(): void {
    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 700,
        closeOnOutsideClicked: false,
        showTitle: true,
        title: 'Anlieferungszeiten hinzufügen'
      },
      RecipientDeliveryPeriodComponent);
    this.saveCheckValue = false;
    dialogRef.afterClosed.subscribe((result) => {

    });
  }

  saveTimeFrames(): void {
    this.saveCheckValue = true;
    this.deliveryTimeFramePeriods$.subscribe((zeitfenster: Zeitfenster[]) => {

      const requestBody: ZeitfensterRequest = {
        ziel_name_id: this.zielNameId,
        zeitfenster
      };

      this.http.post(`${environment.apiHost}/ziele/zeitfenster`, requestBody).subscribe((result) => {
        this.alertService.success('Erfolgreich gespeichert!');
      });
    }).unsubscribe();
  }

  removeTimeFrame(timeFrame: Zeitfenster): void {
    this.saveCheckValue = false;
    this.recipientFacade.dispatch(removeDeliveryPeriod({deliveryPeriodTimeFrame: timeFrame}));
  }

  openSeperateSynonymDialog(synonym: Synonym[]): void {
    let synonym_ziel_name_id = [];

    synonym.forEach((synonym) => {
      synonym_ziel_name_id.push(synonym.ziel_name_id);
    });

    const dialogRef = this.dialogService.open(
      {
        modalType: DialogModalType.MODAL,
        width: 400,
        closeOnOutsideClicked: false,
        showTitle: true,
        data: synonym,
        title: 'Synonym herauslösen'
      },
      AddSynonymFormComponent);

    dialogRef.afterClosed.subscribe((closeResult: DialogCloseResult) => {
      if (closeResult.result === DialogCloseResultType.CLOSEOK) {
        if (closeResult.data.length <= 100) {
          const seperateRequest: SeperateSynonymRequest = {
            ziel_name: closeResult.data,
            ziel_name_id: this.currentZielName,
            ziel_name_synonym_id: synonym_ziel_name_id
          };
          this.stammdatenFacade.dispatch(seperateSynonymRequest({payload: seperateRequest}));
        } else {
          this.alertService.error('Die maximale Zeichenlänge wurde überschritten!');
        }
      }
    });
  }
}

export interface ZeitfensterRequest {
  ziel_name_id: number;
  geoposition_id?: number;
  name?: string;
  name1?: string;
  name2?: string;
  name3?: string;
  name123?: string;
  fahrzeugklasse_id?: number;
  eigenschaften?: string[];
  zeitfenster: Zeitfenster[];
}
