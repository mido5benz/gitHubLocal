import {
  Component,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable, Observer, noop, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { StammdatenService } from '@app/core/services/stammdaten/stammdaten.service';

@Component({
  selector: 'app-filter-input-control',
  templateUrl: './filter-input-control.component.html',
  styleUrls: ['./filter-input-control.component.scss'],
})
export class FilterInputControlComponent
  implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() labelCaption = '';
  @Input() currentFilter: string[];
  @Input() placeholder = 'Add a tag';

  @ViewChild('input', { static: true }) input: ElementRef;

  public tagsList: string[] = [];
  public inputValue = '';
  public selectedTag: number;
  public allowedTagsPattern = /.+/;

  dataSource$: Observable<any[]>;
  typeaheadLoading: boolean;
  errorMessage;

  constructor(
    @Optional() @Self() public controlDir: NgControl,
    private stammdatenService: StammdatenService
  ) {
    this.controlDir.valueAccessor = this;
  }

  inputChanged(event): void {
    const key = event.keyCode;
    switch (key) {
      case 8: // Backspace
        this._handleBackspace();
        break;
      case 13:
        this._addTags([this.inputValue]);
        event.preventDefault();
        break;
      default:
        this._resetSelected();
        break;
    }
  }

  private _addTags(tags: string[]): void {
    const validTags = tags.filter((tag) => this._isTagValid(tag));

    if (this.tagsList.findIndex((tag: string) => tag === tags[0]) > -1) {
      this._resetSelected();
      this._resetInput();
      this.onChange(this.tagsList);
      return;
    }

    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.tagsList);
  }

  private _handleBackspace(): void {
    if (!this.inputValue.length && this.tagsList.length) {
      this._removeTag(this.selectedTag);
    }
  }

  public _removeTag(tagIndexToRemove): void {
    this.tagsList = [...this.tagsList];
    this.tagsList.splice(tagIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.tagsList);
  }

  private _isTagValid(tagString: string): boolean {
    return this.allowedTagsPattern.test(tagString);
  }

  private _resetInput(): void {
    this.inputValue = '';
  }

  _resetSelected(): void {
    this.selectedTag = null;
  }

  writeValue(obj: any): void {}

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
          return this.stammdatenService.getDienstNames().pipe(
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

  onChange(event): void {}

  onTouched(): void {}

  onSelect($event): void {
    this._addTags([this.inputValue]);
  }

  changeTypeaheadLoading($event): void {}

  reset(): void {
    this.tagsList = [];
  }
}
