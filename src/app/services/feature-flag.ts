import { Injectable, signal } from '@angular/core';
import { FeatureFlags } from '../models/feature-flags';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlag {
  private readonly STORAGE_KEY = 'feature_flags';

  private defaultFlags: FeatureFlags = {
    enableTheme: true,
    enableLanguage: true,
    enableProfilePic: true,
    enableChangePassword: true,
  };

  private _flags = signal<FeatureFlags>(this.loadFlags());
  readonly flags = this._flags.asReadonly();

  toggle(flag: keyof FeatureFlags): void {
    const updated = {
      ...this._flags(),
      [flag]: !this._flags()[flag],
    };

    this._flags.set(updated);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  isEnabled(flag: keyof FeatureFlags): boolean {
    return this._flags()[flag];
  }

  private loadFlags(): FeatureFlags {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : this.defaultFlags;
  }
}
