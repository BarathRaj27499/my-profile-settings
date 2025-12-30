import { Component } from '@angular/core';
import { Theme } from '../../services/theme';
import { ThemeType } from '../../types/theme-type';
import { Language } from '../../services/language';
import { LanguageType } from '../../types/language-type';
import { TranslatePipe } from '@ngx-translate/core';
import { FeatureFlag } from '../../services/feature-flag';

@Component({
  selector: 'app-general-settings',
  imports: [TranslatePipe],
  templateUrl: './general-settings.html',
  styleUrl: './general-settings.css',
})
export class GeneralSettings {
  
  currentTheme: any;

  constructor(private themeService: Theme, private languageService: Language, public flagsService: FeatureFlag){
    this.currentTheme = this.themeService.theme;
  }

  get currentLanguage(){
    return this.languageService.currentLanguage();
  }

  change(lang: LanguageType) {
    this.languageService.changeLanguage(lang);
  }

  setTheme(theme: ThemeType): void {
    this.themeService.setTheme(theme);
  }

  isActive(theme: ThemeType): boolean {
    return this.currentTheme() === theme;
  }

  changeLanguage(selectedLanguage: LanguageType){
    this.languageService.changeLanguage(selectedLanguage);
  }
}
