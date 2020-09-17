import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  show(message: string, action = null, duration = 5000, options?: Partial<MatSnackBarConfig>) {
    this.snackBar.open(message, action, {
      duration,
      ...options,
    });
  }
}
