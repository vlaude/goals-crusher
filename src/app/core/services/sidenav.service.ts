import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  toggled$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  isToggled$(): Observable<boolean> {
    return this.toggled$.asObservable();
  }

  toggle() {
    this.toggled$.next(!this.toggled$.value);
  }

  setToggled(toggled: boolean) {
    this.toggled$.next(toggled);
  }
}
