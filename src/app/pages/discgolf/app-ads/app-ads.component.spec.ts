import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdsComponent } from './app-ads.component';

describe('AppAdsComponent', () => {
  let component: AppAdsComponent;
  let fixture: ComponentFixture<AppAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
