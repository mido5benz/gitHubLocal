
import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SnackbarComponent } from './../shared/snackbar/snackbar.component';
var $ = require("jquery");

@Injectable({
    providedIn: 'root'
})

export class Functions {


    tourDetailSubsVar: Subscription;
    tourDetailEmitter = new EventEmitter();
    tourSelected: any;
    shipmentDetail: any = {
        colliBarcode: '',
        sendungId: ''
    };
    snackbarSubscribtion: Subscription;
    snackbaremitter = new EventEmitter();
    tourEmitter = new EventEmitter();
    loginAutoFmEmitter = new EventEmitter();
    dashboardredirectEmitter = new EventEmitter();
    showheadEmitter = new EventEmitter();
    showTourSelection = false;
    infoViewEmitter = new EventEmitter();
    constructor(
        public toastr: ToastrService
    ) { }

    showSnackBar(message: string, timeOut?, module?) {
        this.toastr.show(message, module ? module : null, {
            enableHtml: false,
            toastComponent: SnackbarComponent,
            timeOut: timeOut ? timeOut : 0,
            positionClass: 'toast-bottom-center',
            tapToDismiss: false,
            closeButton: false,
            easeTime: 300,
            toastClass: 'customSnackBar'
        });
    }

    tourDetailOpen(tour) {
        this.tourSelected = tour;
        window.sessionStorage.setItem('tourDetails', JSON.stringify(tour));
    }
    getTourDetails() {
        if (this.tourSelected) {
            return this.tourSelected;
        } else {
            let temp = JSON.parse(window.sessionStorage.getItem('tourDetails'));
            this.tourDetailOpen(temp);
            return this.tourSelected;
        }

    }
    resetTourDetails() {
        this.tourSelected = {};
        window.sessionStorage.removeItem('tourDetails');
    }

    setShipmentDetail(item, showButton?) {

      if (showButton) {
        this.shipmentDetail = {
          colliBarcode: item.colliBarcode,
          sendungId: item.sendungId,
          collectionRedirect: false
        }
      }else {
        this.shipmentDetail = {
          colliBarcode: item.colliBarcode,
          sendungId: item.sendungId,
          collectionRedirect: true
        }
      }
      window.sessionStorage.setItem('shipmentDetail', JSON.stringify(this.shipmentDetail));
    }

    getShipmentDetail() {
        if (this.shipmentDetail.colliBarcode != '' || this.shipmentDetail.sendungId != '') {
            return this.shipmentDetail;
        } else {
            let temp = JSON.parse(window.sessionStorage.getItem('shipmentDetail'));
            if (temp)
                this.setShipmentDetail(temp);
            return this.shipmentDetail;
        }
    }

    resetShipmentDetail() {
        this.tourSelected = {};
        this.shipmentDetail = {
            colliBarcode: '',
            sendungId: ''
        }
        window.sessionStorage.removeItem('shipmentDetail');
    }

    showLoader() {
        $("html").addClass("loaderActive")
        $('.se-pre-con').fadeIn();
    }

    hideLoader() {
            $("html").removeClass("loaderActive")
            $('.se-pre-con').fadeOut()
    }

    emitSnackbarEvent(value) {
        this.snackbaremitter.emit(value);
    }

    emitTourEvent(value) {
        this.tourEmitter.emit(value);
    }

    emitloginEvent(value) {
        this.loginAutoFmEmitter.emit(value);
    }

    emitDashboardRed(value) {
        this.dashboardredirectEmitter.emit(value);
    }
    emitshowhead(value) {
        this.showheadEmitter.emit(value)
    }

    getCurrentDate() {
        var today: any = new Date();
        var dd: any = today.getDate();

        var mm: any = today.getMonth() + 1;
        var yyyy: any = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '.' + mm + '.' + yyyy;
        return today;
    }



    showErrorSnackBar(message: string, timeOut?, module?) {
        this.toastr.show(message, module ? module : null, {
            enableHtml: false,
            toastComponent: SnackbarComponent,
            timeOut: timeOut ? timeOut : 0,
            positionClass: 'toast-bottom-center',
            tapToDismiss: false,
            closeButton: false,
            easeTime: 300,
            toastClass: 'customErrorSnackBar'
        });
    }

    setRedirectFlag(value) {
        window.sessionStorage.setItem('redirectCollection', value);
    }

    removeRedirectFlag() {
        window.sessionStorage.removeItem('redirectCollection');
    }

    fetchRedirectFlag() {
        return window.sessionStorage.getItem('redirectCollection');
    }

    emitInfoView(flag) {
        this.infoViewEmitter.emit(flag);
    }

}
