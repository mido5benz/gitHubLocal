import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-notification',
  templateUrl: './loading-notification.component.html',
  styleUrls: ['./loading-notification.component.scss']
})
export class LoadingNotificationComponent implements OnInit {

  @Input() loadingText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
