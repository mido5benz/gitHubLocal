import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @ViewChild('input') input: ElementRef;

  @Input() min = 0;
  @Input() max = 100;

  @Output() rangeChanged: EventEmitter<number> = new EventEmitter<number>();

  private subscription$: Subscription;

  public currentValue = '';
  public disabled: boolean;

  constructor(@Self() @Optional() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
    this.subscription$ = this.controlDir.valueChanges.subscribe((value) => this.rangeChanged.emit(value));
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit(): void {
  }

  onChange(event): void {
  }

  onTouched(): void {
  }


  writeValue(obj: any): void {
    this.input.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
