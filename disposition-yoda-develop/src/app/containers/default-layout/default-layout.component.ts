import {AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {BsModalService, CollapseDirective} from 'ngx-bootstrap';
import {ShowLegendModalComponent} from '@shared/component/show-legend-modal/show-legend-modal.component';
import {select, Store} from '@ngrx/store';
import {selectAllToursCount} from '@app/store/on-tour/selectors/on-tour.selectors';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {Depot} from '@models/user/user.model';
import {getEnvironmentFromHostname, getLetterForEnv} from '@shared/utils/url.utils';
import {environment} from '@environment*';
import {Aenderungswunsch} from '@models/on-tour/aenderungswunsch.model';
import {fetchCounterSuccess} from '@store/on-tour/actions/on-tour.actions';
import {RescheduleService} from '@app/core/services/reschedule/reschedule.service';
import {DeliveryDay, UmdispoEvent} from '@shared/models';
import {MapService} from '@app/core/services/map/map.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit, AfterViewChecked {

  @ViewChild(CollapseDirective, {read: ElementRef, static: false})
  collapse!: CollapseDirective;

  public hideLegend: boolean;
  public isCollapsed = true;
  public depots: Depot[] = [];
  public collapseRef;
  public onTourCount: number;
  public jsonValue;

  constructor(
    private store: Store,
    private tourListFacade: TourlistFacade,
    public router: Router,
    private renderer: Renderer2,
    private authService: KeycloakService,
    private modalService: BsModalService,
    private rescheduleService: RescheduleService,
    private mapService: MapService
  ) {
    // this.tourListFacade.dispatch(fetchTourlistStart());
    this.depots = JSON.parse(localStorage.getItem('depots'));
  }

  async doLogout(): Promise<void> {
    if (environment.production) {
      // @ts-ignore
      window.location = '/DispositionYODA/#/';
    } else {
      // @ts-ignore
      window.location = '/#/';
    }
    await this.authService.logout();
  }

  ngOnInit(): void {
    this.mapService.getDeliveryDay().subscribe((res: DeliveryDay) => {
      this.mapService.setAusliefertag(res);
    })
    this.store.pipe(select(selectAllToursCount)).subscribe((onTourCount) => {
      if (onTourCount >= 0) {
        this.onTourCount = onTourCount;
      }
    });

    this.triggerAnfrageSSEevent();
    this.triggerUmdispoSSEevent();
  }

  ngAfterViewChecked(): void {
    this.collapseRef = this.collapse;
    if (this.router.url.includes('stammdaten')) {
      this.hideLegend = true;
    } else if (this.router.url.includes('strategic')) {
      this.hideLegend = false;
    } else if (this.router.url.includes('manual')) {
      this.hideLegend = false;
    } else if (this.router.url.includes('on-tour')) {
      this.hideLegend = true;
    }
  }

  showLegendModal(): void {
    const modalRef = this.modalService.show(ShowLegendModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
    });
  }

  fetchTours() {
    this.tourListFacade.dispatch(fetchTourListRequest());
  }

  redirectToDepotServer(userDepot: Depot) {
    const currentUserDepot = localStorage.getItem('userDepot');

    if (userDepot.depotnr !== currentUserDepot) {
      const currentHost = window.location.hostname;
      const env = getEnvironmentFromHostname(currentHost);
      const envLetter = getLetterForEnv(env);

      window.open(`http://rasterdisposrv${envLetter}${userDepot.depotnr}.tof.de:8080/DispositionYODA/`, '_blank');
    }
  }

  private triggerAnfrageSSEevent() {
    const userDepot = localStorage.getItem('userDepot');

    const url = environment.apiHost;
    let match: string = 'srv';
    let environmentVariable: string = url.substring(url.lastIndexOf(match) + match.length).substring(0, 1);

    this.rescheduleService.getRescheduleChangedEvents(`http://rasterdisposrv${environmentVariable}${userDepot}.tof.de:8080/RasterDispoSSE/v1/anfrageevent`).subscribe((change: any) => {

      const aenderungswunsch: Aenderungswunsch = {
        anfragen: [],
        anzahl: change.data
      };
      this.store.dispatch(fetchCounterSuccess({aenderungswunsch}));
    });
  }

  triggerUmdispoSSEevent() {
    const userDepot = localStorage.getItem('userDepot');

    const url = environment.apiHost;
    let match: string = 'srv';
    let environmentVariable: string = url.substring(url.lastIndexOf(match) + match.length).substring(0, 1);

    this.rescheduleService.getRescheduleChangedEvents(`http://rasterdisposrv${environmentVariable}${userDepot}.tof.de:8080/RasterDispoSSE/v1/umdispoevent`).subscribe((umdispoChange: any) => {
      this.jsonValue = JSON.parse(umdispoChange.data);
      const umdispoEvent: UmdispoEvent = {
        tour_id: this.jsonValue.tour_id,
        tour_nr: this.jsonValue.tour_nr,
        zeitpunkt_umdispo: this.jsonValue.zeitpunkt_umdispo
      };

      this.mapService.umdispoEventInfoMethod(umdispoEvent);
    });
  }

}
