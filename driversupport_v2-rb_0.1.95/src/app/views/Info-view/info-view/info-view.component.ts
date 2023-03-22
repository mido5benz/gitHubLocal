import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Functions } from '../../../Global/functions';
import { apiService } from 'src/app/_services/api.service';
import { RightsService } from './../../../core/service/rights/rights.service';
import { User } from 'src/app/shared/models/user.model';
import { version } from 'package.json';
import { Subscription } from 'rxjs';



@Component({

  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss']
})
export class InfoViewComponent implements OnInit {
  // Server
  applications: any;
  versions: any;
  status: any;

  // Frontend
  version: any;
  versionr: any;
  // User
  userName: any;
  depotName: any;
  depotNummer: any;
  rights: any;
  subsVar: Subscription;
  constructor(
    private functions: Functions,
    private service: apiService,
    private rightsService: RightsService,
    private titleService: Title,
  ) {
    this.subsVar = this.functions.infoViewEmitter.subscribe((key) => {
      this.ngOnInit();
    });
  }

  async ngOnInit(): Promise<void> {
    this.versionr = version;
    this.version = this.titleService.getTitle();

    let data = await this.service.getApplicationInfo();

    this.applications = data.applications.value;
    this.versions = data.versions.value;
    this.status = data.status.value;


    await this.rightsService.getUserRights();
    let userData: User = this.rightsService.user;
    this.userName = userData.user;
    this.depotName = userData.depot.bezeichnung ? userData.depot.bezeichnung : '';
    this.depotNummer = userData.depot.depotnr ? userData.depot.depotnr : '';
    this.rights = userData.roles
    this.functions.hideLoader();
  }

}
