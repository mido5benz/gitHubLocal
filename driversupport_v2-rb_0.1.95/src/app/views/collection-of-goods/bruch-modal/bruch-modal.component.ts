import {CollectionOfGoodsComponent} from './../collection-of-goods.component';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Lightbox} from 'ngx-lightbox';
import {NgxSpinnerService} from 'ngx-spinner';
import {Functions} from 'src/app/Global/functions';
import {TypeResponse} from 'src/app/_services/api';
import {apiService} from 'src/app/_services/api.service';
import {NgxImageCompressService} from 'ngx-image-compress';

var $ = require('jquery');

@Component({
  selector: 'app-bruch-modal',
  templateUrl: './bruch-modal.component.html',
  styleUrls: ['./bruch-modal.component.scss']
})
export class BruchModalComponent implements OnInit {

  @Output() confirm = new EventEmitter();

  VereinnahmungModalRef: BsModalRef;

  byteCounter: number = 0;
  fotoAnzahl: any;
  //searchTextBruch: any = '';
  @Input() searchTextBruch: any = '';
  newPhotoState: boolean = false;

  BruchModalRef: BsModalRef;
  imageDataList: any = [];
  url: any = 'assets/img/brand/container_truck.jpg';

  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = true;
  showIndicator = false;
  numval: string;
  bruchSelectedMRow: any;

  bruchBarcodeError: boolean = false;
  bruchRequiredError: boolean = false;
  bruchNoFotosError: boolean = false;

  colliActive: boolean = true;

  constructor(
    public modalService: BsModalService,
    private functions: Functions,
    private service: apiService,
    private _lightbox: Lightbox,
    private spinner: NgxSpinnerService,
    private imgCompress: NgxImageCompressService
  ) {
  }


  ngOnInit(): void {
    this.fotoAnzahl = window.sessionStorage.getItem('fotoAnzahl');
  }


  openImageModal(index: number): void {
    // open lightbox
    this._lightbox.open(this.imageDataList, index);
    this.bruchNoFotosError = false;
  }


  closeBruchModal() {

    this.imageDataList = [];
    this.url = '';
    this.modalService.hide(1);
  }


  deleteimg(index) {
    this.imageDataList.splice(index, 1);
    let temp = JSON.parse(JSON.stringify(this.imageDataList));
    this.imageDataList = temp;
    if (this.imageDataList.length === 0) {
      this.imageDataList = [];
      this.bruchNoFotosError = true;
    } else {
      this.bruchNoFotosError = false;
    }
  }

  bruchModalConfirm() {

    let imageArray = [];
    for (var i = 0; i < this.imageDataList.length; i++) {
      imageArray.push(this.imageDataList[i].src);
    }

    this.numval = this.numval.replace(/\s+/g, '');
    let data = {
      // imageData: this.url,
      // imageData: this.webcamImage.imageAsDataUrl,
      imageData: imageArray,
      colliBarcode: [this.numval],
      isColl: this.colliActive
    };


    if (this.numval == this.searchTextBruch && !this.bruchNoFotosError) {
      this.spinner.show();
      this.bruchBarcodeError = false;
      this.bruchRequiredError = false;

      // for (let i = 0; i < data.imageData.length; i++) {

      // let dataObject = {
      //   colliBarcode: data.colliBarcode,
      //   isColl: data.isColl,
      //   imageData: [data.imageData[i]]
      // };

      this.service.getCollectbyDone(data).subscribe((response: TypeResponse) => {
          this.BruchModalRef.hide();
          // this.closeVerinnahmungModal()
          let message = response.text;

          if (response.code == '200') {
            this.spinner.hide();
            this.functions.showSnackBar(message, 3000, 'Collection');
            this.confirm.emit();
          }
          if (response.code == '400') {
            this.spinner.hide();
            this.functions.showErrorSnackBar(message, 3000, 'Collection');
          }

          this.newPhotoState = false;
          this.imageDataList = [];
          this.url = '';
          this.numval = null;
        },
        err => {
          this.imageDataList = [];
          this.url = '';
          this.spinner.hide();
          this.BruchModalRef.hide();
          this.functions.showErrorSnackBar('Error Foto wurde nicht erfolgreich gespeichert', 3000, 'Collection');
        });
      // }

    } else {
      if (this.numval == null || this.numval == undefined) {
        this.bruchRequiredError = true;
      } else {
        this.bruchRequiredError = false;
      }
      if (this.numval !== this.searchTextBruch) {
        this.bruchBarcodeError = true;
        this.numval = '';
        // this.searchBarField.nativeElement.onfocus();
        $('#bruchModalInput').focus();
      } else {
        this.bruchBarcodeError = false;
      }
      //this.bruchBarcodeError = true;
      if (this.bruchNoFotosError) {
        this.bruchNoFotosError = true;
      }
    }

  }


  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    this.bruchBarcodeError = false;
    // Only Numbers 0-9
    // this.numval = this.numval.replace(/\s+/g, '');
    // charCode = this.numval;
    this.bruchRequiredError = false;
    if (this.numval == null || this.numval == undefined) {
      this.bruchRequiredError = true;
    }

    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  toggleColli(flag) {
    this.colliActive = flag;
  }

  totalImageSize: number = 0;

  bruchModalNewPhoto() {
    if (this.imageDataList.length >= this.fotoAnzahl) {
      this.functions.showErrorSnackBar('Sie haben die maximale Fotoanzahl von ' + this.fotoAnzahl + ' überschritten', 3000);
    } else {
      $('#imagUploadId').click();
      this.newPhotoState = true;
    }

  }

  selectFile(event, template?) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.bruchNoFotosError = false;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;

      this.imgCompress.compressFile(this.url, 50, 50).then(
        result => {
          if (this.imgCompress.byteCount(result) < 10485760) {
            this.imageDataList.push({src: result});
            console.warn('Size in bytes was:', this.imgCompress.byteCount(this.url));
            console.warn('Size in bytes is now:', this.imgCompress.byteCount(result));

            this.totalImageSize += this.imgCompress.byteCount(result);
            console.warn('Total Image size: ', this.totalImageSize);
            if (this.totalImageSize > 10485760) {
              this.imageDataList.pop();
              this.totalImageSize -= this.imgCompress.byteCount(result);
              this.functions.showErrorSnackBar('Die maximale Größe der hochzuladenden Bilder darf nicht 10 MB überschreiten ! Foto konnte nicht gespeichert werden');
              console.warn('Total Image size: ', this.totalImageSize);
            }
          } else {
            this.functions.showErrorSnackBar('Die maximale Größe der hochzuladenden Bilder darf nicht 10 MB überschreiten ! Foto konnte nicht gespeichert werden');
          }
        }
      );

      if (this.newPhotoState == false) {
        this.BruchModalRef = this.modalService.show(template, {
          class: 'modal-dialog-centered bruchmodelclass modal-lg',
          backdrop: 'static',
          keyboard: false
        });
      }

    };
    this.numval = null;
    let _this = this;
    // setTimeout(function () {
    $('#bruchModalInput').focus();
    // }, 100)
  }

  bruchMethod(item, template, custom: boolean = false) {

    // initialize error Felds
    this.bruchBarcodeError = false;
    this.bruchRequiredError = false;

    this.newPhotoState = false;
    $('#imagUploadId').click();
    this.bruchSelectedMRow = item;
  }
}
