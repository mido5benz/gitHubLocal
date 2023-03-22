import { RingingModel } from './../../../_services/api';
import { Component, OnInit, Input } from '@angular/core';
import { ColorUtil } from '../../../../utils/color-utils'
import { Router } from '@angular/router';
import { apiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-tour-card-header',
  templateUrl: './tour-card-header.component.html',
  styleUrls: ['./tour-card-header.component.scss'],
  providers: [ColorUtil]
})
export class TourCardHeaderComponent implements OnInit {
  criterias: any = [];
  packages: any = [];
  dummyValue: any;

  @Input() tourDetails: any;
  @Input() fmCounts: any = 0;
  constructor(
    private router: Router,
    private util: ColorUtil,
    private service: apiService
  ) {
  }

  ngOnInit() {
    if (this.tourDetails && this.tourDetails.tourId) {
      this.service.getNcValue(this.tourDetails.tourId).subscribe(
        data => {
          this.packages = this.getPackages(data && data.text ? data.text : '0');
          this.criterias = this.getCriterias();
        },
        error => {
          this.packages = this.getPackages('0');
          this.criterias = this.getCriterias();
        });
    }
  }

  getCriterias() {
    return [
      {
        color: this.util.getCashColor(this.tourDetails.cashReturn),
        icon: 'fa fa-money-bill-alt',
        text: this.tourDetails.cashReturn > 0 ? this.tourDetails.cashReturn + ' €' : "-",
        backEndClass: this.tourDetails.cashReturnStatus
      }, {
        color: this.util.getRegistrationColor(this.tourDetails.driverRegistration),
        icon: 'fa fa-user',
        text: this.tourDetails.driverName ? this.tourDetails.driverName : '-',
        backEndClass: this.tourDetails.driverRegistrationStatus
      }, {
        color: this.util.getPackageColor(this.tourDetails.rearrangeCount),
        iconText: this.tourDetails.rearrangeCount === 0 ? "" : this.tourDetails.rearrangeCount,
        icon: 'fa fa-dolly',
        textArray: this.tourDetails.countsarr,
        backEndClass: this.tourDetails.rearrangerStatus
      },{

        color: this.util.getPhoneColorFahrer(this.tourDetails.ringingFahrer),
        icon: 'fa fa-phone-alt',
        text: this.tourDetails.ringing.ringingFahrerName === null ? '-' : this.tourDetails.ringing.ringingFahrerName,
        backEndClass: this.tourDetails.ringingFahrer
      },{

        color: this.util.getPhoneColor(this.tourDetails.ringingPresort),
        icon: 'fa fa-phone-alt',
        text: this.tourDetails.ringing.ringingPresortName === null ? '-' : this.tourDetails.ringing.ringingPresortName,
        backEndClass: this.tourDetails.ringingPresort
      }
    ];
  }

  getPackages(data) {
    return [
      {
        label: 'SOLL',
        packageText: this.tourDetails.sollCollanzahl && this.tourDetails.sollCollanzahl.length ? this.tourDetails.sollCollanzahl : '' + ' (' + data + ' NC)',
        palletText: this.tourDetails.sollPalettenanzahl && this.tourDetails.sollPalettenanzahl.length ? this.tourDetails.sollPalettenanzahl : ''
      }, {
        label: 'IST',
        packageText: 'P: ' + this.tourDetails.presortCountTotal ? this.tourDetails.presortCountTotal : '' + ' B: ' + this.tourDetails.loadingCountCurrentColl ? this.tourDetails.loadingCountCurrentColl : '',
        palletText: 'B: ' + this.tourDetails.loadingCountCurrentPal ?  this.tourDetails.loadingCountCurrentPal : ''
      }
    ];
  }

  routeToPDFViewer(value) {
    window.sessionStorage.setItem('tourNo',value);
    this.router.navigate(['/dashboard/tourdetail/pdf']);
  }
}
