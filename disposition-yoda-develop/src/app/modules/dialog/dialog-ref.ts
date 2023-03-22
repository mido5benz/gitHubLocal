import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {DialogCloseResult} from '@models/dialog/dialog.models';

@Injectable()
export class DialogRef {
  private readonly afterClosed$ = new Subject<any>();

  afterClosed: Observable<any> = this.afterClosed$.asObservable();

  constructor() {
  }

  close(result?: DialogCloseResult): void {
    this.afterClosed$.next(result);
  }
}
