import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesToggle } from './features-toggle';

describe('FeaturesToggle', () => {
  let component: FeaturesToggle;
  let fixture: ComponentFixture<FeaturesToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
