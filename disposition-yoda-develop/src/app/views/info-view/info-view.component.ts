import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RightsService} from '@app/core/services/rights/rights.service';
import {User} from '@models/user/user.model';
import {AppInfoService} from '@app/core/services/app-info/app-info.service';

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

  // User
  userName: any;
  depotName: any;
  depotNummer: any;
  rights: any;

  constructor(
    private titleService: Title,
    private rightsService: RightsService,
    private appInfoService: AppInfoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.version = this.titleService.getTitle();
    await this.rightsService.getUserRights();

    await this.getApplicationInformation();
    this.getUserInformation();
  }

  private getUserInformation(): void {
    const user: User = this.rightsService.user;
    this.userName = user.user;
    this.depotName = user.depot.bezeichnung;
    this.depotNummer = user.depot.depotnr;
    this.rights = user.roles;
  }

  private async getApplicationInformation(): Promise<void> {
    const {
      applications,
      versions,
      status
    } = await this.appInfoService.getApplicationInfo();

    this.applications = applications.value;
    this.versions = versions.value;
    this.status = status.value;
  }
}
