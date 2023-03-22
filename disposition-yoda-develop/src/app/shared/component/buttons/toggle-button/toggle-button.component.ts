import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  @Input() selectedCaption: string;
  @Input() deselectedCaption: string;
  @Input() isChecked: boolean;
  /**
   * Name of the font awesome icon which should be displayed as the icon in front of the button text. Pick the classnema from the
   * font-awesome website without the fa- (e.g. if you want to display the pencil just pass pencil and not fa-penciil )
   */
  @Input() deselectedIcon: string;
  @Input() selectedIcon: string;

  @Output() clicked = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onButtonClicked(): void {
    this.clicked.emit();
  }

  /**
   * Returns the font awesome specific css icon classname
   */
  public getIconClass(): string {
    if (this.selectedIcon && this.deselectedIcon) {
      return this.isChecked ? `fa-${this.deselectedIcon}` : `fa-${this.selectedIcon}`;
    }
  }
}
