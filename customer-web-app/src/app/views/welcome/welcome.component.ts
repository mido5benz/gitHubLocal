import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

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



  }


}
