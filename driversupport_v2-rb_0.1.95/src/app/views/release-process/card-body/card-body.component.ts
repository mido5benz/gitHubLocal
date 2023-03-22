import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lightbox} from "ngx-lightbox";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Functions} from "../../../Global/functions";
import {ReleaseProcessService} from "../../../_services/release-process-service/release-process.service";


@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss']
})
export class CardBodyComponent implements OnInit {

  @Input() tour;
  @Input() index;
  @Input() rejectionReason;

  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  private _album = [];
  public displayForm = false;
  public imgIndex;
  public modalRef: BsModalRef;
  public ablehnungGrundCode: string;
  public declinePhotoObject;


  public ladeHilfeMock = {
    palette: 2,
    colli: 25,
    gibo: 12,
    einweg: 3
  }


  constructor(private lightbox: Lightbox,
              private alertService: Functions,
              private modalService: BsModalService,
              private releaseProcessService: ReleaseProcessService) {
  }

  ngOnInit(): void {
  }


  public zoomImg(imgsrc) {
    const src = imgsrc;
    const album = {
      src: src
    }
    this._album.push(album);
    this.lightbox.open(this._album, 0);
    this._album = [];
  }

  public save() {
    this.displayForm = !this.displayForm;
  }

  public confirmFreigabe(index, tour) {
    //this.confirm.emit({index, tour, loadingEquipment});
    this.confirm.emit({index, tour});
  }

  public declineFreigabeModal(template, index, tour) {
    this.imgIndex = index;
    this.declinePhotoObject = tour;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered tsPopup valid',
      backdrop: 'static',
      keyboard: false
    });
  }

  public declineFreigabe(index, tour, ablehnungGrundCode) {
    this.modalRef.hide();
    this.decline.emit({index, tour, ablehnungGrundCode});
  }

  calculateQuantity(name, operator, value) {
    switch (name) {
      case 'colli': {
        if (operator === '+') {
          this.ladeHilfeMock.colli = (value + 1);
        } else {
          if (value !== 0) {
            this.ladeHilfeMock.colli = (value - 1);
          }
        }
        break;
      }
      case 'palette': {
        if (operator === '+') {
          this.ladeHilfeMock.palette = (value + 1);
        } else {
          if (value !== 0) {
            this.ladeHilfeMock.palette = (value - 1);
          }
        }
        break;
      }
      case 'gibo': {
        if (operator === '+') {
          this.ladeHilfeMock.gibo = (value + 1);
        } else {
          if (value !== 0) {
            this.ladeHilfeMock.gibo = (value - 1);
          }
        }
        break;
      }
      case 'einweg': {
        if (operator === '+') {
          this.ladeHilfeMock.einweg = (value + 1);
        } else {
          if (value !== 0) {
            this.ladeHilfeMock.einweg = (value - 1);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }
}
