import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";





import {
  loginToDabase,
  name,
  storeDataOnServer,
  storeDataOnServerError,
} from '../../utility/external';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{


  constructor(private route:Router,private keycloakService: KeycloakService) {
  }

  navigateToCustomerList() {
    this.route.navigate(['/customerList']);

  }

  ngOnInit(): void {

    this.keycloakService.getKeycloakInstance().loadUserInfo().success(function(data){

      let pf:KeycloakProfile =data;

      console.log(pf);
    });

    let roles: String[];
    roles=   this.keycloakService.getUserRoles();
    console.log("roles",roles);


    let profileData = this.keycloakService.loadUserProfile();
    profileData.then(function (userPruserProfile){
        let profile : KeycloakProfile = userPruserProfile;

      console.log(profile.firstName);
      console.log("profile data",JSON.stringify(userPruserProfile));
    });

    this.testObservableFunctions();




  }

  public testObservableFunctions(){

    name.subscribe((vv) => console.log(vv));

    storeDataOnServerError('some value').subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log('Error while saving: ', err.message),
    });

    loginToDabase('admin').subscribe({
      next: (response) => console.log(response),
    });

    const observable$ = new Observable<string>((subscriber) => {
      console.log('Observable executed');
      subscriber.next('Alice');
      setTimeout(() => subscriber.next('Ben'), 2000);
      setTimeout(() => subscriber.next('Charlie'), 4000);
    });

    const subscription = observable$.subscribe((value) => console.log(value));

    setTimeout(() => {
      console.log('Unsubscribe');
      subscription.unsubscribe();
    }, 3000);


//    of(1, 7, 3, 6, 2, 10)
//
//           .pipe(
//             map((value: any ) => value * 2),
//             filter((value: any ) => value > 5)
//           )
//           .subscribe((value: any ) => console.log('Ouotput: ', value));

  const subject = new Subject<number>();


  }


}
