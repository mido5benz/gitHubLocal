import {registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from '@coreui/angular';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {ModalModule, TypeaheadModule} from 'ngx-bootstrap';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {extModules} from './build-specifics';
import {DefaultLayoutComponent} from './containers';
import {AuthInterceptor} from './interceptors/auth-interceptor.service';
import {RequestInterceptor} from './interceptors/request-interceptor.service';
import {ConfirmationDialogComponent} from '@modules/dialog/components/confirmation-dialog/confirmation-dialog.component';
import {DialogModule} from '@modules/dialog/dialog.module';
import {MoveDeliveryPopupComponent, MoveStoppPopupComponent} from '@modules/manual-dispo/components';
import {RootStoreModule} from '@store/root-store.module';
import {authConfig, environment} from '@environment*';
import {AuthGuard} from '@app/core/guards/auth/auth.guard';
import {SharedModule} from '@shared/shared.module';
import {SelectDepotModalComponent} from '@shared/component';
import {InfoViewComponent} from '@app/views/info-view/info-view.component';
import {DepotService} from '@app/core/services/depot/depot.service';
import {CurrentUser, Depot} from '@models/user/user.model';
import {ActivateTagesdispoComponent} from '@shared/component/activate-manual-dispo-modal/activate-manual-dispo-modal.component';
import {ShowLegendModalComponent} from '@shared/component/show-legend-modal/show-legend-modal.component';
import {UmdispoSummaryDialogComponent} from '@manual-dispo-components/umdispo-summary-dialog/umdispo-summary-dialog.component';
import {MoveUnassignedStoppsPopupComponent} from '@manual-dispo-components/move-unassigned-stopps-popup/move-unassigned-stopps-popup.component';
import {ShowStoppInfoDialogComponent} from '@manual-dispo-views/tour-detail-view/components/tour-detail-stopp-list/components/show-stopp-info-dialog/show-stopp-info-dialog.component';
import {ManualDispoModule} from '@modules/manual-dispo/manual-dispo.module';
import {Store} from '@ngrx/store';
import {TagesdispoService} from '@app/core/services';
import {checkActivationRequest} from '@store/manual-dispo/activate-dispo/actions/check-activation.actions';
import {getDepotNumberFromUrl, hasCurrentDepotRights} from '@shared/utils/auth.utils';
import {BlankLayoutComponent} from './views/blank-layout/blank-layout.component';
import { ManualDispoErrorViewComponent } from './views/manual-dispo-error-view/manual-dispo-error-view.component';
import { WelcomeLayoutComponent } from './containers/welcome-layout/welcome-layout.component';

registerLocaleData(localeDe, 'de');

const APP_CONTAINERS = [DefaultLayoutComponent];

export const initializeApp2 = (store: Store) => {
  return (): Promise<any> =>
    new Promise((resolve, reject) => {
      store.dispatch(checkActivationRequest());
      resolve();
    });
};

export function initializeKeycloak(keycloak: KeycloakService, depotService: DepotService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: authConfig,
          enableBearerInterceptor: false,
          initOptions: {
             onLoad: 'login-required',
            checkLoginIframe: false,
            // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          },
          // bearerExcludedUrls: []
        });

        keycloak.getToken().then(async (token) => {
          if (token) {
            const user: CurrentUser = await depotService.getDepots(token);
            if (environment.production) {
              const currentHostName = window.location.hostname;
              const currentDepotNumber = getDepotNumberFromUrl(currentHostName);

              const hasRights = hasCurrentDepotRights(user.depots, currentDepotNumber);

              if (!hasRights) {
                // @ts-ignore
                window.location = '/DispositionYODA/#/zugriffverweigert';
                //reject();
              } else {
                if (user.depots.length > 0) {
                  const depot = user.depots.find((dpt: Depot) => dpt.depotnr === currentDepotNumber);
                  localStorage.setItem('depots', JSON.stringify(user.depots));
                  localStorage.setItem('userDepot', depot.depotnr);
                  localStorage.setItem('userDepotId', depot.id.toString());

                  // @ts-ignore
                  window.location = '/DispositionYODA/#/welcome-layout';
                }
              }

            } else {
              if (user.depots.length >= 1) {
                localStorage.setItem('depots', JSON.stringify(user.depots));
                localStorage.setItem('userDepot', user.depots[0].depotnr);
                localStorage.setItem('userDepotId', user.depots[0].id.toString());
                // @ts-ignore
                window.location = '/#/welcome-layout';
              } else {
                // Wenn user kein Recht auf DISPO hat, wird auf Blank weitergeleitet
                // @ts-ignore
                window.location = '/#/zugriffverweigert';
              }
            }
          }
        });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    SharedModule,
    PerfectScrollbarModule,
    CollapseModule.forRoot(),
    ButtonsModule.forRoot(),
    AppBreadcrumbModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    extModules,
    RootStoreModule,
    EffectsModule.forRoot([]),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-center',
      closeButton: true,
      progressBar: false
    }),
    NgxSpinnerModule,
    DialogModule,
    StoreRouterConnectingModule.forRoot(),
    ManualDispoModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    MoveDeliveryPopupComponent,
    InfoViewComponent,
    ActivateTagesdispoComponent,
    MoveStoppPopupComponent,
    MoveUnassignedStoppsPopupComponent,
    ShowLegendModalComponent,
    UmdispoSummaryDialogComponent,
    ShowStoppInfoDialogComponent,
    BlankLayoutComponent,
    ManualDispoErrorViewComponent,
    WelcomeLayoutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, DepotService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp2,
      deps: [Store, TagesdispoService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  entryComponents: [
    AppComponent,
    MoveDeliveryPopupComponent,
    ConfirmationDialogComponent,
    SelectDepotModalComponent,
    ActivateTagesdispoComponent,
    MoveStoppPopupComponent,
    ShowLegendModalComponent,
    UmdispoSummaryDialogComponent,
    MoveUnassignedStoppsPopupComponent,
    ShowStoppInfoDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
