import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GoalsState } from '../../state/goals.state';

@Injectable({ providedIn: 'root' })
export class StateInitializedResolver implements Resolve<void> {
  constructor(private readonly state: GoalsState) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    return this.state.initialized.asObservable();
  }
}
