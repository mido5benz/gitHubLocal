import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Functions } from 'src/app/Global/functions';
import { apiService } from './../../../_services/api.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
var moment = require('moment/moment');
var $ = require("jquery");

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {

  pdfData: any = "";
  tourNo:any = '';
  emptyPdfModalRef: BsModalRef;
  @ViewChild('EmptyPdfModaltemplate') elementView: ElementRef;
  constructor(
    private sanitizer: DomSanitizer,
    private functions: Functions,
    private service: apiService,
    private modalService: BsModalService,
    private router: Router,
  ) { }

  ngOnInit() {

    var date = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('Z')[0];
    this.tourNo = window.sessionStorage.getItem('tourNo');


    this.service.getTourPDF(this.tourNo, date).subscribe(
      (resp) => {
        if (resp.length > 0) {
          this.pdfData = resp[0].dokument;
        }else{
          let _this = this;
          // setTimeout(function(){
            _this.emptyPdfMethod();
          // },450);
        }
        this.functions.hideLoader();
      },
      err => {
        this.functions.hideLoader();
      }
    )
  }

   onPrint(){
    var byteCharacters = atob(this.pdfData);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: 'application/pdf;base64' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
   }



  emptyPdfMethod() {
    this.emptyPdfModalRef = this.modalService.show(this.elementView, {
      class: 'modal-dialog-centered fmPopup',
      backdrop: 'static',
      keyboard: false
    });
  }

  redirectToTourDetail(){
    this.emptyPdfModalRef.hide();
    this.router.navigate(['/dashboard/tourdetail']);
  }
}
