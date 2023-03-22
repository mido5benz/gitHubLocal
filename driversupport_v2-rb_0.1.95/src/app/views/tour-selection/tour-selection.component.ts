import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TourSelectionModel, TypeResponse } from 'src/app/_services/api';
import { apiService } from './../../_services/api.service';
import { Functions } from './../../Global/functions';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ReleaseProcessService} from "../../_services/release-process-service/release-process.service";
var $ = require("jquery");

@Component({
  selector: 'app-tour-selection',
  templateUrl: './tour-selection.component.html',
  styleUrls: ['./tour-selection.component.scss']
})
export class TourSelectionComponent implements OnInit {

  tourArray: TourSelectionModel[];
  selectionState: boolean = true;
  selectionArray: any;
  loginName: any;
  originalArray: TourSelectionModel[];
  scrollButton: any = false;
  count: any = 0;
  searchModel: any = '';
  modelChanged: Subject<any> = new Subject<any>();
  modalRef: BsModalRef;
  counter: any = 0;
  maxTours: any = 0;
  constructor(
    private service: apiService, private functions: Functions,
    private modalService: BsModalService,
    private router: Router,
    private releaseProcessService: ReleaseProcessService
  ) {
    // this.modelChanged.pipe(
    //   debounceTime(2000),
    //   distinctUntilChanged()).subscribe(model => {
    //     if(model.enterPressed){
    //       this.searchModel = model.text;
    //     }
    //   });
  }

  ngOnInit() {
    this.loginName = window.sessionStorage.getItem('loginName');
    this.maxTours = JSON.parse(window.sessionStorage.getItem('MaxTourNumber'));
    this.getTourData(this.loginName, '');
    this.functions.removeRedirectFlag();
    this.functions.emitshowhead(true);
  }

  getTourData(loginName, popup) {
    this.service.getTourSelection(loginName).subscribe((resp: TourSelectionModel[]) => {

      this.originalArray = resp;
      this.count = 0;
      this.counter = 0;
      if(resp !== null){
      for (var i = 0; i < resp.length; i++) {
        this.originalArray[i].selectionState = resp[i].isSavedByLoginUser;
        if (resp[i].isSavedByLoginUser) {
          this.count++;
          this.counter++
        }
      }

      if (this.count > 0 && !this.functions.showTourSelection) {
        this.router.navigate(['dashboard']);
      }
      let obj = {
        name: 'TourSelection',
        value: this.count
      }

      this.functions.emitTourEvent(obj);
      this.tourArray = JSON.parse(JSON.stringify(this.originalArray));
      this.tourArray.sort(function (x, y) {
        return (x.isSavedByLoginUser === y.isSavedByLoginUser) ? 0 : x.isSavedByLoginUser ? -1 : 1;
      })

      if (popup != "") {
        let _this = this;
        // setTimeout(function () {
          $("html").removeClass("loaderActive");
          $('.tourSelectionLoader').fadeOut();
          _this.functions.showSnackBar(popup, 3000);
        // }, 1000);
      }

      let _this = this;
      // setTimeout(function () {
        _this.functions.hideLoader();
      // }, 1000);
    }
    },
      error => {
        this.functions.hideLoader();
      });

  }


  toggleSelection(element, index, template) {
    // this.tourArray[index].selectionState = !this.tourArray[index].selectionState;
    let temp = true;
    if (!element.selectionState == true) {
      this.counter++
    } else {
      this.counter--
    }

    if (this.counter > this.maxTours) {
      this.modalRef = this.modalService.show(template, {
        class: 'modal-dialog-centered tsPopup',
        backdrop: 'static',
        keyboard: false
      });
      this.counter--
    } else {
      element.selectionState = !element.selectionState;
    }



  }

  saveTours() {
    let temp = [];
    this.tourArray.forEach(element => {
      if (element.isSavedByLoginUser != element.selectionState) {
        element.loginName = this.loginName;
        let tour = JSON.parse(JSON.stringify(element));
        delete tour.selectionState;
        temp.push(tour);
      }
    });

    if (temp && temp.length > 0) {
      $("html").addClass("loaderActive")
      $('.tourSelectionLoader').fadeIn();
      // Api call Logic goes here
      this.service.saveTourSelections(temp).subscribe((resp: TypeResponse) => {
        // if(resp)
        //   this.functions.showSnackBar(resp.text);
        this.getTourData(this.loginName, resp.text);
          this.releaseProcessService.transferSelectedTours(true);
        // this.toggleSelectionState(false);
      },
        error => {
          let _this = this;
          // setTimeout(function () {
            $("html").removeClass("loaderActive");
            $('.tourSelectionLoader').fadeOut();
            this.functions.showSnackBar(error.text,3000);
          // }, 1000);


        });

    }


  }

  toggleSelectionState(state) {
    this.selectionState = state;
  }

  scrollFunction(event, flag) {
    if (flag) {
      if (event.target.scrollTop > 0) {
        this.scrollButton = true;
      } else {
        this.scrollButton = false;
      }
    }

  }

  topFunction() {
    const tourContainers = document.getElementsByClassName('testScrollClass')[0];
    tourContainers.scrollTop = 0;
    this.scrollButton = false;
  }

  onkeypress(text: string, enter) {
    let object = {
      text: text,
      enterPressed: enter ? true : false
    }
    this.modelChanged.next(object);
  }

}
