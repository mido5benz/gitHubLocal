import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {from, fromEvent, interval, Observable} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {DepotService} from './core/services/depot/depot.service';
import {filter, throttle} from 'rxjs/operators';
import {TagesdispoService} from '@app/core/services';
import {StammdatenFacade} from '@store/stammdaten/facades/stammdate.facade';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment*';
import {xServerInterface} from '@models/server-reponses/xserver.model';
import {ToastrService} from 'ngx-toastr';
import {fetchAvailableToursRequest} from "@store/manual-dispo/tour/actions/fetch-available-tours.actions";
import {fetchStammdatenRequest} from '@store/stammdaten/actions/stammdaten.actions';

declare let require: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public context: any;
  public depots: any;
  public submit: any;
  public modalRef: BsModalRef;

  mouseMoveObs$: Observable<any>;

  constructor(
    private authService: KeycloakService,
    private depotService: DepotService,
    private router: Router,
    private titleService: Title,
    private modalService: BsModalService,
    private tagesDispoService: TagesdispoService,
    private stammdatenFacade: StammdatenFacade,
    private tourListFacade: TourlistFacade,
    private http: HttpClient,
    private alertService: ToastrService
  ) {
    //TODO: Wird in der Manuellen Dispo gebraucht (Touren)
     this.tourListFacade.dispatch(fetchAvailableToursRequest());
  }

  ngOnInit(): void {
    this.fetchXServerHost();

    const version = require('../../package.json');
    this.titleService.setTitle('trans-o-flex Disposition v' + version.version);

    // Create a mouse listener that will throttle emissions for 10 seconds
    this.mouseMoveObs$ = fromEvent(document, 'click');
    this.mouseMoveObs$.pipe(throttle(() => interval(10000))).subscribe(() => {
      this.authService.updateToken(300).then(() =>{
        console.log("Token successfully updated!");
      }).catch((err) => {
        console.log('Error: ', err);
      })
    });
    from(this.authService.keycloakEvents$)
      .pipe(filter(event => event.type === KeycloakEventType.OnTokenExpired))
      .subscribe((res) => {
        this.authService.logout();
        console.log('Token expired');
      });


    // this.depots = locations.map((standort: Location) => `${standort.code} - ${standort.name}`);
    this.stammdatenFacade.dispatch(fetchStammdatenRequest());

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  // public closeClicked(): void {
  //   this.modalRef.hide();
  // }

  public fetchXServerHost() {
    return this.http.get(`${environment.apiHost}/xserver`).subscribe((xServer: xServerInterface) => {
      if (xServer.url && xServer.url !== null) {
        xServerHost = xServer.url;
      }
      else {
        this.alertService.error('Leider konnte kein PTV Server gefunden werden! Bitte laden Sie die Seite neu oder kontaktieren Sie den Support');
      }
    })
  }
}

export let xServerHost;
