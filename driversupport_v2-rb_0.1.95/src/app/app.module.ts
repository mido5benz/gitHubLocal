import { environment } from 'src/environments/environment/environment';
import { KeycloakService } from "keycloak-angular";
import { AuthGuard } from "./core/guards/auth/auth.guard";
import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AppComponent } from "./app.component";
import { AccordionModule, ModalModule } from "ngx-bootstrap";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';

import {
  AppHeaderModule,
  AppSidebarModule,
  AppBreadcrumbModule,
} from "@coreui/angular";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { TourSelectionComponent } from "./views/tour-selection/tour-selection.component";

// Progress Component
import { StaticTableComponent } from "./shared/static-table/static-table.component";
import { LoginComponent } from "./views/login/login.component";
import { TourDetailComponent } from "./views/tour-detail/tour-detail.component";
import { TourCardHeaderComponent } from "./views/tour-detail/tour-card-header/tour-card-header.component";
import { PdfViewerComponent } from "./views/tour-detail/pdf-viewer/pdf-viewer.component";
import { CollectionOfGoodsComponent } from "./views/collection-of-goods/collection-of-goods.component";
import { SnackbarComponent } from "./shared/snackbar/snackbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SearchPipe } from "./Global/search.pipe";
import { DepotService } from "./core/service/depot/depot.service";
import { AuthInterceptor } from "./interceptors/auth-interceptor.service";
import { RequestInterceptor } from "./interceptors/request-interceptor.service";
import { authConfig } from "src/environments/keycloak";
import { CurrentUser, Depot } from "./shared/models/user.model";
import { CustomTableComponent } from './shared/custom-table/custom-table.component';
import { InfoViewComponent } from './views/Info-view/info-view/info-view.component';
import { getDepotNumberFromUrl, hasCurrentDepotRights } from './shared/utils/auth.util';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LightboxModule } from 'ngx-lightbox';
import { SpinnerComponent } from './views/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SendungsDetailsLibComponent } from './views/lib/sendungs-details-lib/sendungs-details-lib.component';

import { AgGridModule } from 'ag-grid-angular'

import {
    ColliEventsModule,
    DangerousGoodsModule, DispoDetailsModule, DsSendungskorrekturModule,
    SendungsereignisseModule,
    SendungsketteModule,
    ShipmentInfoDetailsModule
} from 'sendungs-detail-lib';
import { BlankLayoutComponent } from './views/blank-layout/blank-layout.component';
import { DefaultLayoutComponent } from './views/default-layout/default-layout.component';
import { TourCardComponent } from './views/tour-card/tour-card.component';
import { BruchModalComponent } from './views/collection-of-goods/bruch-modal/bruch-modal.component';
import { NavigationModalComponent } from './views/collection-of-goods/navigation-modal/navigation-modal.component';
import { UmdispoModalComponent } from './views/collection-of-goods/umdispo-modal/umdispo-modal.component';
import { TabContentComponent } from './views/collection-of-goods/tab-content/tab-content.component';
import {NgxImageCompressService} from "ngx-image-compress";
import { ReleaseProcessComponent } from './views/release-process/release-process.component';
import { CardBodyComponent } from './views/release-process/card-body/card-body.component';

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
        keycloak.getToken().then(async (tokn) => {


          if (tokn) {

            const user: CurrentUser = await depotService.getDepots(tokn);

            if (environment.production) {

              //let depots = user.depots;
              const currentHostName = window.location.hostname;
              const currentDepotNumber = getDepotNumberFromUrl(currentHostName);

              const hasRights = hasCurrentDepotRights(user.depots, currentDepotNumber);
              if (!hasRights) {
                // @ts-ignore
                window.location = '/Driversupport/#/zugriffverweigert';
              }
              else{
                // wenn user rechte und depots hat
                //const depot = user.depots.find((dpt: Depot) => dpt.depotnr === currentDepotNumber);
                sessionStorage.setItem('loginName', user.user);
                if(user.depots.length>0){

                  const depot = user.depots.find(dpt => dpt.depotnr === currentDepotNumber);

                  sessionStorage.setItem('userDepot', depot.depotnr);
                  localStorage.setItem('userDepot', depot.depotnr);
                  localStorage.setItem('userDepotId', depot.id.toString());
                  // @ts-ignore
                  window.location = '/Driversupport/#/';
              }
             }

            }
            else { // production = false

              const currentHostName = window.location.hostname;
              const currentDepotNumber = getDepotNumberFromUrl(currentHostName);
              const hasRights = hasCurrentDepotRights(user.depots, currentDepotNumber);

              if (user.depots.length > 0) {
                sessionStorage.setItem('loginName', user.user);
                sessionStorage.setItem('userDepot', user.depots[0].depotnr);
                localStorage.setItem('userDepot', user.depots[0].depotnr);
                localStorage.setItem('userDepotId', user.depots[0].id.toString());
                 // @ts-ignore
                 window.location = '/Driversupport/#/';

              } else {
                // @ts-ignore
                window.location = '/Driversupport/#/zugriffverweigert';
              }
            }

          }else{
          }
          resolve();
        });
      } catch (error) {
        // Here you should properly deal with the error
        reject();
      }
    });
  };
}


@NgModule({
  declarations: [
    AppComponent,
    TourSelectionComponent,
    DashboardComponent,
    StaticTableComponent,
    LoginComponent,
    TourDetailComponent,
    TourCardHeaderComponent,
    PdfViewerComponent,
    CollectionOfGoodsComponent,
    SnackbarComponent,
    SearchPipe,
    CustomTableComponent,
    InfoViewComponent,
    SpinnerComponent,
    SendungsDetailsLibComponent,
    BlankLayoutComponent,
    DefaultLayoutComponent,
    TourCardComponent,
    BruchModalComponent,
    NavigationModalComponent,
    UmdispoModalComponent,
    TabContentComponent,
    ReleaseProcessComponent,
    CardBodyComponent,
  ],
    imports: [
        BrowserModule,
        AppHeaderModule,
        AppSidebarModule,
        BsDropdownModule.forRoot(),
        AppBreadcrumbModule.forRoot(),
        TabsModule.forRoot(),
        ProgressbarModule.forRoot(),
        PerfectScrollbarModule,
        CollapseModule.forRoot(),
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        FormsModule,
        ToastrModule.forRoot(),
        NgxExtendedPdfViewerModule,
        HttpClientModule,
        AccordionModule.forRoot(),
        AppRoutingModule,
        HammerModule,
        NgxPullToRefreshModule,
        CarouselModule.forRoot(),
        LightboxModule,
        NgxSpinnerModule,

        AgGridModule.withComponents([]),

        SendungsereignisseModule,
        DangerousGoodsModule,
        ShipmentInfoDetailsModule,
        ColliEventsModule,
        SendungsketteModule,
        DispoDetailsModule,
        DsSendungskorrekturModule


    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpClientModule,
    AuthGuard,
    KeycloakService,
    NgxImageCompressService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, DepotService],
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
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent],
})
export class AppModule { }
