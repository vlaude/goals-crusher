import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState } from '../../state/app.state';

@Injectable({ providedIn: 'root' })
export class StateInitializedResolver implements Resolve<void> {
  constructor(private readonly state: AppState) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    return this.state.initialized.asObservable();
  }
}
