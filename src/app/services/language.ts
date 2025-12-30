import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageType } from '../types/language-type';

@Injectable({
  providedIn: 'root',
})
export class Language {
  private readonly KEY = 'app_language';

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem(this.KEY) || 'en';

    translate.setFallbackLang('en');
    translate.use(savedLang);
  }

  changeLanguage(lang: LanguageType) {
    this.translate.use(lang);
    localStorage.setItem(this.KEY, lang);
  }

  currentLanguage() {
    return this.translate.getCurrentLang();
  }
}
