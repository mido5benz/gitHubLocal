import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {INavData} from '@coreui/angular';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {KeycloakService} from 'keycloak-angular';
import {TourSelectionModel} from '../../_services/api';
import {Functions} from '../../Global/functions';
import {apiService} from '../../_services/api.service';
import {RescheduleService} from "../../_services/SSE/reschedule.service";
import {ReleaseProcessService} from "../../_services/release-process-service/release-process.service";
import {PhotoRequest, PhotoResponse} from "../../shared/models/reason-rejection.model";

var $ = require("jquery");

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-tachometer-alt',
  },
  {
    name: 'Sendungsdetail',
    url: '/sendungsdetail',
    icon: 'fa fa-search',
  },
  {
    name: 'Vereinnahmung',
    url: '/vereinnahmung',
    icon: 'fa fa-box-open',
  },
  {
    name: 'Tourauswahl',
    url: '/tourauswahl',
    icon: 'fa fa-check-circle',
  },
  {
    name: 'sendungs-detail-lib',
    url: '/sendungs-detail-lib',
    icon: 'fa fa-check-circle',
  },

];

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  title = 'DriverSupport';
  public sidebarMinimized = false;
  navItems = navItems;
  showHead: boolean = false;
  subsVar: Subscription;
  subsVar1: Subscription;
  subsVarshowhead: Subscription;
  loginName: any;
  checkboxValue: any;
  public env = environment;
  currentRoute: any;
  count: any = 0;
  subsVar2: Subscription;
  mouseMoveObs$: Observable<any>;

  public disableBadge: boolean = true;
  public userTours;
  public anzeigeFreigabe: PhotoResponse[] = [];
  public anzeigeMap = new Map();
  public releaseProcessBadgeInfo: number = 0;

  ngOnInit() {
    this.loginName = window.sessionStorage.getItem('loginName');
    this.service.getRefreshInterval().subscribe(
      data => {
        window.sessionStorage.setItem('intervalAmount', data.text);
        this.currentRoute = this.routeSetter(this.router.url);
        this.service.getmaxTours().subscribe(
          data => {
            window.sessionStorage.setItem('MaxTourNumber', data.text);
            this.service.getAutoFmStatus(this.env.autoFmId).subscribe(
              data => {
                this.checkboxValue = JSON.parse(data.text);
              },
              error => {
                //TODO
              });
          },
          error => {
            //TODO
          });
      },
      error => {
        window.sessionStorage.setItem('intervalAmount', '5000');
      });
    if (this.loginName) {


      this.checkboxValue = JSON.parse(window.sessionStorage.getItem('autoFm'));
      this.service.getTourSelection(this.loginName).subscribe((resp: TourSelectionModel[]) => {
          let count = 0;
          if (resp) {
            for (var i = 0; i < resp.length; i++) {
              if (resp[i].isSavedByLoginUser)
                count++;
            }
            let obj = {
              name: 'TourSelection',
              value: count
            }
            this.functions.emitTourEvent(obj);
          }
        },
        error => {
          this.functions.hideLoader();
        });

      this.service.getFotoAnzahl().subscribe(
        anzahlData => {
          window.sessionStorage.setItem('fotoAnzahl', anzahlData.text);
        }, error => {
          // TODO
        });
    }

    this.releaseProcessService.selectedTours.subscribe((tourRefreshTriggered: boolean) => {
      if (tourRefreshTriggered) {
        setTimeout(() => {
          this.getSelectedTours()
        }, 1000)
        this.releaseProcessService.transferSelectedTours(false);
      }
    })

    setTimeout(() => {
      if (this.count === 0) {
        this.router.navigate(['tourauswahl']);
      } else {
        this.router.navigate(['dashboard']);
      }
    }, 500);
  }

  triggerReleaseProcessSSEevent() {
    const sseUrl = this.setSSEUrl();

    this.rescheduleService.getRescheduleChangedEvents(`${sseUrl}`).subscribe((change: any) => {
      let sseJsonValue = JSON.parse(change.data);
      if (sseJsonValue !== null) {

        // 1. Ergebnisse aus SSE auf Map speichern
        let sseMap = new Map();
        sseJsonValue.forEach((sseValue) => {
          sseMap.set(sseValue.tourId, sseValue);
        });

        // 2. Überpüfe ob eine Übereinstimmung zwischen SSE Daten und ausgewählte Touren gibt.
        //    Wenn es der Fall ist, werden die Daten auf TempMap gespeichert.
        let tempMap = new Map();
        this.userTours.forEach((selectedUserTours) => {
          if (sseMap.has(selectedUserTours.tourId)) {
            tempMap.set(selectedUserTours.tourId, sseMap.get(selectedUserTours.tourId));
          }
        });

        // 3. Überprüfe ob neuankommende Daten bereits angezeigt werden. Wenn nicht, werden die neue Daten
        //    an Backend geschickt, um Foto zu holen
        let requestData = [];
        tempMap.forEach((value, key) => {
          if (!this.anzeigeMap.has(key)) {
            this.anzeigeMap.set(key, value);

            let requestObject: PhotoRequest = {
              tourId: value.tourId,
              photoId: value.fotoId,
              ladeSicherungId: value.loadSecuringId
            }

            requestData.push(requestObject);
          }
        });

        // Damit alle Clients einen synchronen Zustand haben
        this.anzeigeMap.forEach((anzeige) => {
          if (!tempMap.has(anzeige.tourId)) {
            this.anzeigeMap.delete(anzeige.tourId);

            this.anzeigeFreigabe = [];
            this.anzeigeMap.forEach((value, key) => {
              this.anzeigeFreigabe.push(value);
            });
            this.releaseProcessService.sendSSEDataToProcessRelease(this.anzeigeFreigabe);
          }
        });

        if (this.releaseProcessBadgeInfo > 0) {
          this.releaseProcessBadgeInfo = this.anzeigeFreigabe.length;
        }

        if (requestData.length > 0) {
          this.releaseProcessBadgeInfo = requestData.length;
          this.getReleaseData(requestData);
        }
      }
    });
  }

  setSSEUrl() {
    const userDepot = localStorage.getItem('userDepot');

    const url = environment.baseUrl;
    let match: string = 'srv';
    let environmentVariable: string = url.substring(url.lastIndexOf(match) + match.length).substring(0, 1);
    console.log("environmentVariable",environmentVariable)
    let sseUrl;
    if(environmentVariable === "t" && !environment.production){
      console.log("yes");
      sseUrl = `http://rasterdisposrve${userDepot}.tof.de:8080/RasterDispoSSE/v1/ladesicherungsevent`
    }else{
      sseUrl = `http://rasterdisposrv${environmentVariable}${userDepot}.tof.de:8080/RasterDispoSSE/v1/ladesicherungsevent`
    }
    return sseUrl;
  }

  getSelectedTours(): void {
    let userTours = [];
    const loginName = window.sessionStorage.getItem('loginName');
    this.service.getTourSelection(loginName).subscribe((tours: TourSelectionModel[]) => {
      userTours = tours.filter((tours: TourSelectionModel) => tours.loginName !== null && tours.isSavedByLoginUser);
      this.userTours = userTours;
    });
  }

  getReleaseData(requestData) {
    this.releaseProcessService.sendFotoLadesicherungData(requestData).subscribe((response: PhotoResponse[]) => {
      this.addBase64Type(response);

      this.anzeigeFreigabe = [];

      response.forEach((resp: PhotoResponse) => {
        this.anzeigeMap.set(resp.tourId, resp);
      });
      this.anzeigeMap.forEach((value, key) => {
        this.anzeigeFreigabe.push(value);
      });
      this.releaseProcessService.sendSSEDataToProcessRelease(this.anzeigeFreigabe);
    });
  }

  addBase64Type(fotoLadesicherungData): void {
    let noPhotoAvailable = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCALQBQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7TooooLCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKyPE/ie08J6aL69iu5oTII9tlayXD5IJ+6gJxx1xXnN1+1T8PLC4eC51G8t50+9HLp06sPqCtc1XFUKLtVmo+rse3gcjzTM4c+Bw06i7xi5fkj12ivHP8AhrT4af8AQYuP/AGb/wCJrqfCPxm8OeOL61ttIGpT/aN3l3D6bOkHCljmQoFHA7nk4Hes4Y3DVJcsKib9UdWJ4ZzvB03WxODqQitW3CSWnm0d1RVbUb6PS9Pu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AooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArxL9sL/AJIvc/8AX7b/APoRr22vEv2wv+SL3P8A1+2//oRrzcy/3Or/AIWfacFf8lJgP+vsPzPnH9kv/kuGj/8AXC5/9EtXrvxx/aEvte1YeBPh0z3upXT/AGafULQ5JY8GOE/zk6AA49R8+fBLwpdeN/HSaJZanNpFzd2dyiXUJ5H7pjtbvtbocc4JrB8ReHdc+GviqSwv45tM1exkDpJGxBBBysiMOoPUEV+e0cZXw+B9nBNRlJ3kvRaLsz+wMz4byvOOKnisTUjKvSoxcKUlp8U7TkvtRT0stuu6PuX4DfAax+Eulfa7vy73xNdJ/pN3jIiB58qPPb1PViPTAHrVeF/s7/tEQfEqzj0PXJI7fxRCnDcKt6oHLKOzgdV/EcZA90r9Dy+WHlh4/Vfh/rfzP484upZxSziss9u67e/Rro4/3e1ttt7hRRRXonxwV84+Nvi54k+KXj+TwB8OLpbCKHeNQ14c7VXh9hH3VB+XcOWYjBA5PpX7QHjKXwN8Jte1G2k8q9eMWtu2cEPIwTcPdVLMP92vmj9mH4o6R8MdL1yW70HXdVu76aNfO0uzWZERFJCli64OXJx9K+czHGJV6eEc+VPWT627fM/Z+DOHZ1MpxXEEaCrVKbUKUHZx53a82no+RO6T0bv2PYov2OfB9xasdV1PWtV1OVR5t/JcqGLY5IG08ezFvrXz38Tvh74l/Zs8X2t1o+s3KWd1lrPULclGbb96ORehIyODkEH6gfSH/DV2h/8AQoeMf/BZH/8AHa8u/aG+LFl8XPBdrpel+FvE1vf296lysl5p4VNoR1YZV2PO4du1eXj6eXOg5YZpTjqrXufd8JY3jGnmkKOdwdTC1Pdmp8rik1o0uiT3S0t02t7D+zv8cF+LugTw36RweINPCi5SMYWZ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AEclem15l+0p/wAkP8Vf9cI//RyV9fjf91q/4X+R/O3DP/I9wH/X6n/6XE+Yf2N/+Sxr/wBg+f8AmtfddfCP7HUgT4yxA/xWE4H/AI6f6V93V4nDv+5f9vP9D9M8Yv8AkpV/17h+cgooor6c/DgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDE8W+M9F8C6WNS12/TTrIyCETOrMN5BIGFBPY/lXyr+1F8f/D/AI98PWvhvw1O9/D9oW5ub3ymjT5QwEahgCTk5JxjgYznj7Forzcbhq2KpypRqKMX5Xf33X5H2vDOd5dkOLp4+vhJVqtN3X7xRj5e77OTuv8AFbyPzQ+Evjlfhv8AEPRvEMkL3EFpIwmijxuaN0ZGxnjIDEjPcCvu/wAG/HjwR481Cy0/SNaE2pXgYx2ckEiSfKpZgcrjICk9e3FegUVx5fl1bL04Rqpxbvbl/J83+Z9Hxfxll3F1SOJr4GVOtGPKpRqpq2rXNF0tUm29HFva/Yr42/a1+J/gzx5YaRZ6HcDUtYs7hjJdJCyLHFtIaMswBJLbTxkDafWvsmiu7HYWeMoujGSinvpf7tUfL8K55h+HcxhmVWjKpOHwpT5Fqmnze5JtWeya87n5S29xLazRzQyPDNGwdJI2KsrA5BBHQivpv4V/tl3Ol2sOneNLSXUUQBU1S0A87HT94hwG/wB4EHjoTzX1/RXh4XJa+Dlz0cRb/t3R/ifqOfeJ2V8SUFQzLKOa2z9taUfRqndemz6pnJeA/ij4X+KNveN4e1D+0FtQguY3geMx7920EOozna3TPSvk/wDaC/Zp1Hwfql1rvhmzkvvDszNK9tbqWexPUgqOTH1wR0HB6ZP27RXrYvL446iqdd+8uqVvwu/nqfn3D/F1bhXMp4vKYNUZWTpzlzXXnJRjqndxairXs763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tJl1bUbViDGIi0O1lKkSMCAoIJ5JHOK++vAlz4vvLOefxbZ6Xp8shU29pp0jyNGMHcJHPBOcY28VuaVpFjoVjHZabZ29haRjCQW0YjRfoAMVcrfLcteAjZ1G/LoeVxpxtDiytzxwcadlZSd3Oyd7X0SV/K+rVwooor3D8tCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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xgYzjJ5rpPHvw/0b4j+H59J1m0SeJ1PlTbR5kD44dG7Efr0ORXm3/CB/G3/op2n/APgog/8AjVH/AAgfxt/6Kdp//gog/wDjVaQnGFL2Cw0uXa3u/wDyRw4jDVcVmDzSpnVH27fNzXr3T6W/c6JbJLRLTY+NrXUNZ+EvxAmexuTb6ro15JAXXO1yjlWUjurYII7g1+gMKaZ8bPhvp1w817aafqcMdwy2Vy0Mg/vRll6jOVI74r591z9jXxT4k1i81TUfFmn3F/eStNPL9lZN7sck4UADn0FfQXwd8CXXw1+H2neHby8jvpbRpT50SkKQ8jOAAfTdXk5PhMTh6lSlWg1Tl3t/n23P0LxG4gyXNsHg8dl2JjLG0mk3FSWlm27uK0UkuXtd6bnyB+1B8I9G+FfiLSBoSTQ2GoW7sYZZDJsdGAOCecEMvX3rof2etE8V/ED4f3/hHSJ20Lw9JqUlxqmtLkySK0USi2iHHJCEt7MM9cNvft1/8ffgz/cu/wCcNdl+xH/ySnVf+w1L/wCiIK4aeFp/2xOhHSNtlp0TsfUYzPsX/wAQ5w2aV2qlfm0lP3rNVJRUrPRtJaXur6u9jpLD9k/4a2em/ZZNFmvZCuGuri8l80n1+VlUH6ACvkD44fDYfCn4h3mjW8kktiyJdWckn3zE2cA+pDBlz32546V+j1fFn7b0Sr8RtDlH320pVP0E0pH8zXdnmBw9PCe0pQUWmtlY+V8LeKM3x3EDwmNxM6sKkZO0pOSTWqavt200s/Q+mfgf4vn8dfCrw9rF2/mXkkBinc9WkjZo2Y+525/Gu6rxj9kVy3wT00E5C3NwB/38J/rXs9fSYGbqYWlOW7ivyPxfijC08FnmNw1FWjGrNJdlzOy+SCiiiu0+ZCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+cf20PAH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QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//Z';
    fotoLadesicherungData.map((ladesicherung) => {
      if (ladesicherung.fotoData !== null) {
        ladesicherung.fotoData = 'data:image/png;base64,' + ladesicherung.fotoData;
      } else {
        ladesicherung.fotoData = noPhotoAvailable;
      }
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
    $('#switchhide').toggle();
  }

  sidebarRouteMethod(e, path) {
    let currenturl = '/' + path;
    this.currentRoute = path;
    document.getElementsByTagName('body')[0].classList.remove('sidebar-show');
    if (currenturl != this.router.url) {
      // this.functions.showLoader();
      let _this = this;
      this.functions.showTourSelection = true;
      _this.router.navigate([path]);
    }
    // SSE Badge
    if (path === 'dashboard') {
      this.disableBadge = true;
      this.releaseProcessBadgeInfo = 0;
    } else {
      this.disableBadge = false;
      this.releaseProcessBadgeInfo = this.anzeigeFreigabe.length;
    }
  }

  constructor(private router: Router,
              private functions: Functions,
              private ref: ChangeDetectorRef,
              private service: apiService,
              private authService: KeycloakService,
              private rescheduleService: RescheduleService,
              private releaseProcessService: ReleaseProcessService) {

    this.getSelectedTours();

    setTimeout(() => {
      this.triggerReleaseProcessSSEevent();
    }, 500);

    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.functions.showLoader();
        if (event['url'] == '/') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.routeSetter(this.router.url);
      }
    });

    this.subsVar = this.functions.tourEmitter.subscribe((key) => {

      if (key.name == 'TourSelection') {
        this.navItems[3].name = 'Tourauswahl (' + key.value + ')';
        this.count = key.value;
        this.navItems = JSON.parse(JSON.stringify(this.navItems));
        this.ref.detectChanges();
      }

    });

    this.subsVar1 = this.functions.loginAutoFmEmitter.subscribe((key) => {
      this.service.getAutoFmStatus(this.env.autoFmId).subscribe(
        data => {
          this.checkboxValue = JSON.parse(data.text);
        },
        error => {
          //TODO
        });
      this.ref.detectChanges();
    });

    this.subsVar2 = this.functions.dashboardredirectEmitter.subscribe((key) => {
      this.currentRoute = this.routeSetter(this.router.url);
      this.ref.detectChanges();
    });

    this.subsVarshowhead = this.functions.showheadEmitter.subscribe((key) => {

      this.showHead = true;
      this.ref.detectChanges();
    });
  }


  async doLogout(): Promise<void> {

    await this.authService.logout();
  }

  isChangeLimitAccessToggle(value) {
    window.sessionStorage.setItem('autoFm', value);
    this.service.putautoFmData(this.env.autoFmId).subscribe(
      data => {
        this.functions.showSnackBar(data.text);
      },
      err => {
//TODO
      }
    )
  }

  routeSetter(value) {
    let temp = '';
    switch (value) {
      case '/dashboard':
      case '/dashboard/tourdetail':
      case '/dashboard/tourdetail/pdf':
        temp = 'dashboard';
        break;
      case '/sendungsdetail':
        temp = 'sendungsdetail';
        break;
      case '/vereinnahmung':
        temp = 'vereinnahmung';
        break;
      case '/tourauswahl':
        temp = 'tourauswahl';
      case '/sendungs-detail-lib':
        temp = 'sendungs-detail-lib';
        break;
    }
    return temp;
  }

  Info() {
    this.functions.showLoader();
    let _this = this;
    if (this.router.url != '/info-view') {
      _this.router.navigate(['/info-view']);
    } else {
      this.functions.emitInfoView(true);
    }

  }

}

