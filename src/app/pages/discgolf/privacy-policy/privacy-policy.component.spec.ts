import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyComponentDiscGolf } from './privacy-policy.component';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponentDiscGolf;
  let fixture: ComponentFixture<PrivacyPolicyComponentDiscGolf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyComponentDiscGolf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponentDiscGolf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
