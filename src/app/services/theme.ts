import { Injectable, signal } from '@angular/core';
import { ThemeType } from '../types/theme-type';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly _theme = signal<ThemeType>(
    (localStorage.getItem('theme') as ThemeType) || 'light'
  );

  readonly theme = this._theme.asReadonly();

  constructor() {
    // Apply theme on app load / refresh
    document.body.className = this._theme();
  }

  setTheme(theme: ThemeType): void {
    this._theme.set(theme);
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }
}
