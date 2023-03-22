import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-spontaneous-takeover-layout',
  templateUrl: './spontaneous-takeover-layout.component.html',
  styleUrls: ['./spontaneous-takeover-layout.component.scss']
})
export class SpontaneousTakeoverLayoutComponent implements OnInit {

  public isSpontaneousTakeoverCollapsed = false;
  public isCustomerForTakeoverCollapsed = false;
  public isRuleForTakeoverCollapsed = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openSpontaneousTakeover() {
    this.isSpontaneousTakeoverCollapsed = !this.isSpontaneousTakeoverCollapsed;
  }

  openCustomerForTakeover() {
    this.isCustomerForTakeoverCollapsed = !this.isCustomerForTakeoverCollapsed;
  }

  // Regel Abholung
  openRuleForTakeover() {
    this.isRuleForTakeoverCollapsed = !this.isRuleForTakeoverCollapsed;
  }

}
