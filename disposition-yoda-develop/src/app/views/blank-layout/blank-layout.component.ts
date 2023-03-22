import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Router} from '@angular/router';
import {environment} from '@environment*';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent implements OnInit {

  constructor(private authService: KeycloakService) {
  }

  ngOnInit(): void {
  }

  logout() {
    if (environment.production) {
      // @ts-ignore
      window.location = '/DispositionYODA/#/';
    } else {
      // @ts-ignore
      window.location = '/#/';
    }
    this.authService.logout();
  }

}
