import { Component, Signal, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SettingsConstants } from './constants/settings.constants';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Theme } from './services/theme';
import { filter } from 'rxjs';
import { Auth } from './services/auth';
import { Toast } from './shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TranslatePipe, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-profile-settings');
  settingsConstants: any = SettingsConstants;
  selectedCategory: string = this.settingsConstants.PROFILE;
  private routeCategoryMap: Record<string, string> = {
    'my-profile': this.settingsConstants.PROFILE,
    'general-settings': this.settingsConstants.GENERAL,
    'toggle-feature': this.settingsConstants.FEATURE,
  };
  isLoggedIn!: Signal<boolean>;
  isDarkMode!:Signal<string>;

  constructor(private router: Router, private themeService: Theme, private authService: Auth) {
    this.createUser();
    this.setCategoryFromUrl();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.setCategoryFromUrl());
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isDarkMode =  this.themeService.theme;
  }

  //to create a dummy user to demonstrate fake login authentication in frontend without backend
  createUser() {
    this.authService.saveUser({
      email: 'rakesh.singh@example.com',
      password: 'Password@123',
    });
  }

  private setCategoryFromUrl() {
    const currentUrl = this.router.url.replace('/', '');
    this.selectedCategory = this.routeCategoryMap[currentUrl] ?? this.settingsConstants.PROFILE;
  }

  togglePage(category: string) {
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

  logOut(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
