import {Component, OnInit} from '@angular/core';
import {from, fromEvent, interval, Observable} from "rxjs";
import {filter, throttle} from "rxjs/operators";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mouseMoveObs$: Observable<any>;

  constructor(private authService: KeycloakService,) {
  }

  ngOnInit(): void {
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

  }

}
