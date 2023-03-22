import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DispoStopp} from '@shared/models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ToastrService} from 'ngx-toastr';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {TourService} from '@app/core/services';

@Component({
  selector: 'app-selected-tour-stopps-list',
  templateUrl: './selected-tour-stopps-list.component.html',
  styleUrls: ['./selected-tour-stopps-list.component.scss']
})
export class SelectedTourStoppsListComponent implements OnInit {

  constructor(private alertService: ToastrService, private selectedTourFacade: SelectedTourFacade, private tourService: TourService) {
  }

  @Input() reloadLineIndex: number;
  @Input() reloadlineEditable: boolean;
  @Input() stopps: DispoStopp[];
  @Input() frozen: boolean;
  @Output() stoppOrderChanged: EventEmitter<DispoStopp[]> = new EventEmitter<DispoStopp[]>();
  @Output() reloadLineMoved: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteReloadLineClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output() stoppSelected: EventEmitter<DispoStopp> = new EventEmitter<DispoStopp>();

  public abgefertigt: boolean;
  public editable: boolean;
  public blocked: boolean;
  public stoppsUnterDerNachladebereich: boolean;

  ngOnInit(): void {
    this.selectedTourFacade.abgefertigt$.subscribe((istAbgefertigt) => this.abgefertigt = istAbgefertigt);
    this.selectedTourFacade.reloadEditable$.subscribe((editable) => this.editable = editable);

    if (this.stopps.length > 0) {
      this.tourService.isTourBlocked(this.stopps[0]?.tour_id).subscribe((tourBlocked: boolean) => {
        tourBlocked ? this.blocked = true : this.blocked = false;
      });
    }
  }

  // @ts-ignore
  drop($event: CdkDragDrop<T, any>): void {
    // Wird überprüft ob die Nachladelinie verschiebbar ist
    if (this.editable && !this.abgefertigt) {
      if (this.stopps[$event.previousIndex].isReloadStopp) {
        this.handleReloadLineDrop($event);
        return;
      }
    } else {
      this.alertService.error('Es ist nicht mehr möglich die Nachladelinie zu verschieben!');
    }

    if (!this.blocked && !this.abgefertigt) {
      // Do nothing when when the item was not moved at all
      if ($event.previousIndex === $event.currentIndex) {
        return;
      }

      // Wenn die Nachladelinie nicht gesetzt ist, wird die Methode ausgeführt (Stoppverschiebung)
      if (!this.reloadLineIndex) {
        this.handleDropAboveReloadLine($event);
        return;
      }

      let nachladebereichIndex = this.stopps.findIndex((stopp) => stopp.soll_stopp === this.reloadLineIndex);
      const beneathReloadLine = nachladebereichIndex <= $event.previousIndex;

      if (beneathReloadLine) {
        // Nachladelinie gesetzt, von unten nach oben (über die Nachladelinie)
        this.handleDropBeneathReloadLine($event);
      } else {
        // Nachladelinie gesetzt, von oben nach unten (über die Nachladelinie)
        this.handleDropAboveReloadLine($event);
      }
    } else {
      this.alertService.error('Es ist nicht mehr möglich die Stopps zu verschieben!');
    }
  }

  // Nachladelinie ist gesetzt und Stopps nach der Nachladelinie werden verschoben
  private handleDropBeneathReloadLine<T>($event: CdkDragDrop<T, any>): void {
    const stopps = [...this.stopps];

    // Nachladebereich wird in der stoppVerschiebung - Methode entfernt
    this.stoppsUnterDerNachladebereich = true;
    this.stoppVerschiebung(stopps, $event);
  }

  private handleDropAboveReloadLine<T>($event: CdkDragDrop<T, any>): void {
    const stopps = [...this.stopps];

    for (let i = 0; i < stopps.length; i++) {
      if (stopps[i].soll_stopp === 12345) {
        stopps.splice(i, 1);
      }
    }

    this.stoppVerschiebung(stopps, $event);
  }

  stoppVerschiebung(stopps, $event) {
    //TODO: Stopps von unten nach oben verschieben
    if ([$event.previousIndex] > [$event.currentIndex]) {

      this.nachladebereichLoschen(stopps);

      let startIndex;
      let endIndex;
      // Bei den Stopps, die unter der Nachladelinie sind, muss der Index mit -1 angepasst werden
      if (this.stoppsUnterDerNachladebereich) {
        startIndex = stopps.indexOf(stopps[$event.currentIndex - 1]);
        endIndex = stopps.indexOf(stopps[$event.previousIndex - 1]);
      } else {
        startIndex = stopps.indexOf(stopps[$event.currentIndex]);
        endIndex = stopps.indexOf(stopps[$event.previousIndex]);
      }

      if(startIndex >= 0) {

      let verschobeneStopp = [];

      let previousObject;
      let currentObject;

      if (this.stoppsUnterDerNachladebereich) {
        previousObject = {...stopps[$event.previousIndex - 1]};
        currentObject = {...stopps[$event.currentIndex - 1]};
      } else {
        previousObject = {...stopps[$event.previousIndex]};
        currentObject = {...stopps[$event.currentIndex]};
      }

      // Stopp, der verschoben wird bekommt den Sollstopp Nummer von Ziel Objekt.
      // Bsp. Stopp 1 auf 5 verschoben --> Stopp 1 bekommt die Stoppnummer 5
      previousObject.soll_stopp = currentObject.soll_stopp;
      verschobeneStopp.push(previousObject);

      let kopieStopps = this.erstelleKopieObjekt(stopps);

      // Stopps, die zwischen StartIndex und EndIndex befinden, bekommen alle eine neue Stoppnummer
      for (let i = startIndex; i <= endIndex; i++) {
        if (kopieStopps[i + 1]) {
          kopieStopps[i].soll_stopp = kopieStopps[i + 1].soll_stopp;
        }
      }

      // Hier wird die verschobene Object durch das alte ersetzt
      let resultStopps = kopieStopps.map((obj) => verschobeneStopp.find((o) => o.dispostopp_id === obj.dispostopp_id) || obj);

      this.stoppOrderChanged.emit(resultStopps);
      this.stoppsUnterDerNachladebereich = false;

      } else {
        this.alertService.info('Stopp an der falschen Stelle verschoben. Bitte eine Stelle nach unten verschieben', 'Stoppverschiebung nicht möglich!')
      }

    } else {

      //TODO: Stopps von oben nach unten verschieben

      this.nachladebereichLoschen(stopps);

      let startIndex;
      let endIndex;
      // Bei den Stopps, die unter der Nachladelinie sind, muss der Index mit -1 angepasst werden
      if (this.stoppsUnterDerNachladebereich) {
        startIndex = stopps.indexOf(stopps[$event.currentIndex - 1]);
        endIndex = stopps.indexOf(stopps[$event.previousIndex - 1]);
      } else {
        startIndex = stopps.indexOf(stopps[$event.currentIndex]);
        endIndex = stopps.indexOf(stopps[$event.previousIndex]);
      }

      if (startIndex >= 0) {

        let changeObjectArray = [];

        let previousObject;
        let currentObject;

        if (this.stoppsUnterDerNachladebereich) {
          previousObject = {...stopps[$event.previousIndex - 1]};
          currentObject = {...stopps[$event.currentIndex - 1]};
        } else {
          previousObject = {...stopps[$event.previousIndex]};
          currentObject = {...stopps[$event.currentIndex]};
        }

        // Stopp, der verschoben wird bekommt den Sollstopp Nummer von Ziel Objekt.
        // Bsp. Stopp 1 auf 5 verschoben --> Stopp 1 bekommt die Stoppnummer 5
        previousObject.soll_stopp = currentObject.soll_stopp;
        changeObjectArray.push(previousObject);

        let kopieStopps = this.erstelleKopieObjekt(stopps);

        // Stopps, die zwischen StartIndex und EndIndex befinden, bekommen alle eine neue Stoppnummer
        // Achtung! Hier wurde groesser gleich zeichen umgedreht
        for (let i = startIndex; i >= endIndex; i--) {
          if (kopieStopps[i - 1]) {
            kopieStopps[i].soll_stopp = kopieStopps[i - 1].soll_stopp;
          }
        }

        // Hier wird die verschobene Object durch das alte ersetzt
        let resultStopps = kopieStopps.map((obj) => changeObjectArray.find((o) => o.dispostopp_id === obj.dispostopp_id) || obj);

        this.stoppOrderChanged.emit(resultStopps);
        this.stoppsUnterDerNachladebereich = false;

      } else {
        this.alertService.info('Stopp an der falschen Stelle verschoben. Bitte eine Stelle nach oben verschieben', 'Stoppverschiebung nicht möglich!')
      }
    }
  }

  nachladebereichLoschen(stopps): void {
    if (this.stoppsUnterDerNachladebereich) {
      for (let i = 0; i < stopps.length; i++) {
        if (stopps[i].soll_stopp === 12345) {
          stopps.splice(i, 1);
        }
      }
    }
  }

  erstelleKopieObjekt(stopps) {
    // Hier wird ein Kopie von Stopps erstellt - wegen readonly
    let copyStoppObject;
    let newStopps = [];
    for (let i = 0; i < stopps.length; i++) {
      copyStoppObject = {...stopps[i]};
      newStopps.push(copyStoppObject);
    }
    return newStopps;
  }


  private handleReloadLineDrop($event: CdkDragDrop<any, any>): void {
    let sollStopp;

    if ($event.previousIndex < $event.currentIndex) {

      for (let i = 0; i < this.stopps.length; i++) {
        if (this.stopps[i].soll_stopp === this.stopps[$event.currentIndex].soll_stopp) {
          sollStopp = this.stopps[i + 1]?.soll_stopp;
          break;
        }
      }

      // Bei Stopps mit Nachkommastellen --> Wenn die Nachladelinie an der letzten Stellen platziert wird
      if (sollStopp > this.stopps.slice(-1)[0].soll_stopp) {
        sollStopp = $event.previousIndex - 1;
      }

      // Bei Stopps ohne Nachkommastellen --> Wenn die Nachladelinie an der letzten Stellen platziert wird
      if (this.stopps.length === sollStopp) {
        sollStopp = $event.previousIndex + 1;
      }
    } else {
      sollStopp = this.stopps[$event.currentIndex].soll_stopp;
    }

    // Don`t dispatch the request to move the reload line because the soll stopps number is null
    if (!sollStopp) {
      return;
    }
    this.reloadLineMoved.emit(sollStopp);
    return;
  }

  stoppClicked(stopp: DispoStopp): void {
    this.stoppSelected.emit(stopp);
  }

  deleteReloadLine(): void {
    if (this.editable) {
      this.deleteReloadLineClicked.emit();
    } else {
      this.alertService.error('Es ist nicht mehr möglich die Nachladelinie zu löschen!');
    }
  }


}
