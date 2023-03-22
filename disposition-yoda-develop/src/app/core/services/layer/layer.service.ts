import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  activeLayer: BehaviorSubject<any> = new BehaviorSubject({ name: 'sattel', id: [] });
  search: BehaviorSubject<string> = new BehaviorSubject('');

  private deselect = false;

  public deselectTourTable(): void {
    this.deselect = true;
  }

  public resetDeselectStatus(): void {
    this.deselect = false;
  }

  public getDeselectStatus(): Observable<boolean> {
    if (this.deselect === true) {
      return of(true);
    }
    return of(false);
  }

}
