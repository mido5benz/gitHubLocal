import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-badge-icon-link',
  templateUrl: './nav-badge-icon-link.component.html',
  styleUrls: ['./nav-badge-icon-link.component.scss'],
})
export class NavBadgeIconLinkComponent implements OnInit {
  @Input() url: string;
  @Input() caption: string;
  @Input() objectCount = 0;

  @Input() badge = true;

  constructor() {}


  ngOnInit(): void {
  }
}
