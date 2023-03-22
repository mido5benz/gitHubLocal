import {AfterViewInit, Component, ElementRef, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {noop, Observable, Observer, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {getVisibleTourByTourNr} from '@store/manual-dispo/tour/selectors/tourlist.selectors';

@Component({
  selector: 'app-tour-filter-input-control',
  templateUrl: './tour-filter-input-control.component.html',
  styleUrls: ['./tour-filter-input-control.component.scss'],
})
export class TourFilterInputControlComponent
  implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() labelCaption = '';
  @Input() currentFilter: string[];
  @Input() placeholder = 'Eingeben';

  @ViewChild('input', {static: true}) input: ElementRef;
  @ViewChild('customListTemplate', {static: true}) customListTemplate: ElementRef;

  public tagsList: string[] = [];
  public inputValue = '';
  public selectedTag: number;
  public allowedTagsPattern = /.+/;
  public dataSource$: Observable<any[]>;
  public typeaheadLoading: boolean;
  public errorMessage;

  constructor(
    @Optional() @Self() public controlDir: NgControl,
    private store: Store
  ) {
    this.controlDir.valueAccessor = this;
  }

  inputChanged(event): void {
    const key = event.keyCode;
    switch (key) {
      case 8: // Backspace
        this.handleBackspace();
        break;
      case 13:
        this.addTags([this.inputValue]);
        event.preventDefault();
        break;
      default:
        this.resetSelected();
        break;
    }
  }

  resetSelected(): void {
    this.selectedTag = null;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {

    if (this.currentFilter) {
      this.tagsList = this.currentFilter;
    }
    this.onChange(this.tagsList);

    this.dataSource$ = new Observable((observer: Observer<string>) => {
      observer.next(this.inputValue);
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          return this.store.select(getVisibleTourByTourNr, {tourNr: query}).pipe(
            map((data: any) => data || []),
            tap(
              () => noop,
              (err) => {
                // in case of http error
                this.errorMessage =
                  (err && err.message) || 'Something goes wrong';
              }
            )
          );
        }

        return of([]);
      })
    );
  }

  ngAfterViewInit(): void {
    if (!this.tagsList) {
      console.warn(
        'NgModel is undefined. Please make sure the variable is defined.'
      );
      this.tagsList = [];
      this.onChange(this.tagsList);
    }
  }

  onChange(event): void {
  }

  onTouched(): void {
  }

  onSelect($event): void {
    this.addTags([this.inputValue]);
  }

  changeTypeaheadLoading($event): void {
  }

  reset(): void {
    this.tagsList = [];
  }

  removeTag(tagIndexToRemove): void {
    this.tagsList.splice(tagIndexToRemove, 1);
    this.resetSelected();
    this.onChange(this.tagsList);
  }

  private addTags(tags: string[]): void {
    const validTags = tags.filter((tag) => this.isTagValid(tag));

    if (this.tagsList) {
      if (this.tagsList.findIndex((tag: string) => tag === tags[0]) > -1) {
        this.resetSelected();
        this.resetInput();
        this.onChange(this.tagsList);
        return;
      }
    }

    this.tagsList = this.tagsList.concat(validTags);
    this.resetSelected();
    this.resetInput();
    this.onChange(this.tagsList);
  }

  private handleBackspace(): void {
    if (!this.inputValue.length && this.tagsList.length) {
      this.removeTag(this.selectedTag);
    }
  }

  private isTagValid(tagString: string): boolean {
    return this.allowedTagsPattern.test(tagString);
  }

  private resetInput(): void {
    this.inputValue = '';
  }
}
