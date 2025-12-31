import { Injectable, signal } from '@angular/core';
import { ThemeType } from '../types/theme-type';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private theme$ = signal<ThemeType>(
    (localStorage.getItem('theme') as ThemeType) || 'light'
  );
  readonly theme = this.theme$.asReadonly();

  constructor() {
    this.applyTheme(this.theme$());
  }

  setTheme(theme: ThemeType) {
    this.theme$.set(theme);
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: ThemeType) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }
}
