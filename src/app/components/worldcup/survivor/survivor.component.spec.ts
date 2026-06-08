import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivorComponent } from './survivor.component';

describe('SurvivorComponent', () => {
  let component: SurvivorComponent;
  let fixture: ComponentFixture<SurvivorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurvivorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurvivorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
