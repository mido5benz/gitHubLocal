import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ChangeStoppsOrderFacade {

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
