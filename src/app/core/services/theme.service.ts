import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';

export type ThemeColor = 'yellow' | 'violet' | 'green' | 'red' | 'blue';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: BehaviorSubject<ThemeColor>;

  constructor(private readonly snackbarService: SnackbarService) {
    const theme = localStorage.getItem('theme') as ThemeColor;
    this.theme = new BehaviorSubject<ThemeColor>(theme ?? 'yellow');
    document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);
  }

  setTheme(themeName: ThemeColor): void {
    this.theme.next(themeName);
    document.getElementsByTagName('html')[0].setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    this.snackbarService.show('Theme changed 🚀');
  }

  getTheme(): Observable<ThemeColor> {
    return this.theme as Observable<ThemeColor>;
  }
}
