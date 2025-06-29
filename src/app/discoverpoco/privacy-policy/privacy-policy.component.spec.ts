import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyComponentPoco } from './privacy-policy.component';

describe('PrivacyPolicyComponentPoco', () => {
  let component: PrivacyPolicyComponentPoco;
  let fixture: ComponentFixture<PrivacyPolicyComponentPoco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyComponentPoco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponentPoco);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
