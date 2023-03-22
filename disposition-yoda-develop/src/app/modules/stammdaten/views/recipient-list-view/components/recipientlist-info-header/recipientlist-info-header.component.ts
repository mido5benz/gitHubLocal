import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {Recipient} from '@models/address/address.model';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {StammdatenService} from "@app/core/services";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipientlist-info-header',
  templateUrl: './recipientlist-info-header.component.html',
  styleUrls: ['./recipientlist-info-header.component.scss']
})
export class RecipientlistInfoHeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() selectedRecipients: Recipient[];

  @Output() onMergeRecipientsClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeleteRecipientClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetFilterClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() showSearchedPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshAddressTable: EventEmitter<any> = new EventEmitter<any>();

  public showZieleAktualisierenButton: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private stammdatenService: StammdatenService
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(this.stammdatenService.refreshZieleObserv.subscribe((zieleAktualisert) => {
      if (zieleAktualisert) {
        this.showZieleAktualisierenButton = true;
      }
    }));
  }

  editRecipient(): void {
    if (this.selectedRecipients.length === 1) {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.activatedRoute,
        queryParams: {
          geopos: this.selectedRecipients[0].geoposition_id
        }
      };
      this.router.navigate(['ziel', 'details', this.selectedRecipients[0].ziel_name_id], navigationExtras);
    }
  }

  mergeRecipients(): void {
    this.onMergeRecipientsClicked.emit(this.selectedRecipients);
    this.selectedRecipients = [];
  }

  deleteRecipient(): void {
    this.onDeleteRecipientClicked.emit(this.selectedRecipients[0]);
  }

  resetFilter(): void {
    this.resetFilterClicked.emit();
  }

  navigateToPage(value: string) {
    this.showSearchedPage.emit(Number.parseFloat(value));
  }

  refreshAddressData() {
    this.refreshAddressTable.emit();
    this.showZieleAktualisierenButton = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // Damit der aktuelle Zustand wieder auf false gesetzt wird. Ansonsten wird der Button bei Seitenwechsel direkt angezeigt (true)
    this.stammdatenService.isZieleUpdated(false);
  }
}
