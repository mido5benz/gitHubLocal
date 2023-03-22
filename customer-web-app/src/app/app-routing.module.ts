import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule, Routes} from "@angular/router";
import {CustomerTableComponent} from "./views/customer-table/customer-table.component";
import {WelcomeComponent} from "./views/welcome/welcome.component";
import {AuthGuard} from "./utility/app.guard";

const routes: Routes = [

  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {
      role: ['customer_access'],

    },
    canActivate: [AuthGuard]

  },
  {
    path: 'customerList',
    component: CustomerTableComponent,
    data: {
      role: ['customer_access'],
    },
    canActivate: [AuthGuard]
  }

];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
