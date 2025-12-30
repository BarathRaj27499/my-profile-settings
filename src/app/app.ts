import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SettingsConstants } from './constants/settings.constants';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-profile-settings');
  settingsConstants: any = SettingsConstants;
  selectedCategory: string = localStorage.getItem('settings-category') === this.settingsConstants.PROFILE ? this.settingsConstants.PROFILE : (localStorage.getItem('settings-category') === this.settingsConstants.GENERAL ? this.settingsConstants.GENERAL : this.settingsConstants.FEATURE);
  constructor(private router: Router) {}

  togglePage(category: string) {
    debugger
    switch (category) {
      case this.settingsConstants.PROFILE:
        this.selectedCategory = category;
        localStorage.setItem('settings-category', category);
        this.router.navigate(['my-profile']);
        break;
      case this.settingsConstants.GENERAL:
        this.selectedCategory = category;
        localStorage.setItem('settings-category', category);
        this.router.navigate(['general-settings']);
        break;
      case this.settingsConstants.FEATURE:
        this.selectedCategory = category;
        localStorage.setItem('settings-category', category);
        this.router.navigate(['toggle-feature']);
        break;
    }
  }
}
