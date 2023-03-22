import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiService } from './../../_services/api.service';
import { Functions } from './../../Global/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: any = '';
  password: any = '';
  constructor(
    private router: Router,
    private service: apiService,
    private functions: Functions
  ) { }

  ngOnInit() {
    this.functions.hideLoader();
  }

  login() {
    if (this.username) {
      window.sessionStorage.setItem('loginName', this.username);
      this.getTourData(this.username);
    }
  }

  getTourData(loginName) {
    this.functions.showLoader();
    this.service.getTourSelection(loginName).subscribe((resp) => {
      let toDashboard = false;
      let count = 0;
      for (var i = resp.length - 1; i > 0; i--) {
        if (resp[i].isSavedByLoginUser) {
          toDashboard = true;
          count++;
        }
      }
      let obj = {
        name: 'TourSelection',
        value: count
      }
      this.functions.emitloginEvent(true);
      this.functions.emitTourEvent(obj);
      if (toDashboard) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['tourauswahl']);
      }
    });
  }

  onKey(event) {
    this.login();
  }



}
