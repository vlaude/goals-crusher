import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public toggled$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  toggle() {
    this.toggled$.next(!this.toggled$.value);
  }

  hide() {
    this.toggled$.next(false);
  }

  setToggled(toggled: boolean) {
    this.toggled$.next(toggled);
  }
}
