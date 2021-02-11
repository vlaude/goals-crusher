import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarSubject = new Subject<any>();
  public snackbarState = this.snackbarSubject.asObservable();

  constructor() {}

  show(message: string, type?: string, duration?: number): void {
    // duration of 5s by default on danger message
    if (type === 'danger' && !duration) {
      duration = 5000;
    }
    this.snackbarSubject.next({
      show: true,
      message,
      type,
      duration,
    });
  }
}
