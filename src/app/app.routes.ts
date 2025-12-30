import { Routes } from '@angular/router';
import { MyProfile } from './feature/my-profile/my-profile';
import { GeneralSettings } from './feature/general-settings/general-settings';
import { FeaturesToggle } from './feature/features-toggle/features-toggle';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'my-profile',
    pathMatch: 'full'
  },
  {
    path: 'my-profile',
    component: MyProfile
  },
  {
    path: 'general-settings',
    component: GeneralSettings
  },
  {
    path: 'toggle-feature',
    component: FeaturesToggle
  }
];
