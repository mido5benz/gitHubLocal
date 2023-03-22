import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class InputAutoFocusDirective {
  constructor(public elementRef: ElementRef) {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    });
  }
}
