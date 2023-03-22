import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() popoverText: string;
  @Input() trigger: string;
  @Input() caption: string;

  /**
   * Name of the font awesome icon which should be displayed as the icon in front of the button text. Pick the classnema from the
   * font-awesome website without the fa- (e.g. if you want to display the pencil just pass pencil and not fa-penciil )
   */
  @Input() icon: string;

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
    if (this.icon) {
      return `fa-${this.icon}`;
    }
  }
}
