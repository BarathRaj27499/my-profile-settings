import { Component } from '@angular/core';
import { FeatureFlag } from '../../services/feature-flag';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-features-toggle',
  imports: [TranslatePipe],
  templateUrl: './features-toggle.html',
  styleUrl: './features-toggle.css',
})
export class FeaturesToggle {
  constructor(public flagsService: FeatureFlag) {}
}
