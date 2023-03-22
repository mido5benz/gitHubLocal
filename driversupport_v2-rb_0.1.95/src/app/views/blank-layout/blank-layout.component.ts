import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent implements OnInit {

  constructor(private authService: KeycloakService) { }

  ngOnInit(): void {
  }

  logout() {
    // @ts-ignore
    window.location = '/#/';
    this.authService.logout();
  }

}
