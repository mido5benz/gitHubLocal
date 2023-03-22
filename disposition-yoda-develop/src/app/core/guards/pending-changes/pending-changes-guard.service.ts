import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor() {
  }

  canDeactivate(
    component: ComponentCanDeactivate, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate() ?
      true : confirm('Achtung: Alle nicht gespeicherten Änderungen werden verworfen!');
  }
}
