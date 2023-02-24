import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerTableComponent } from './views/customer-table/customer-table.component';
import {HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";
import {FormsModule} from "@angular/forms";
import { WelcomeComponent } from './views/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {AuthGuard} from "./utility/app.guard";
import {initializeKeycloak} from "./utility/app.init";


@NgModule({
  declarations: [
    AppComponent,
    CustomerTableComponent,
    WelcomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AgGridModule,
    FormsModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    HttpClientModule,
    AuthGuard,
    KeycloakService,
    {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
