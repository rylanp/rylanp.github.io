import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalacticwarfarepageComponent } from './galacticwarfarepage.component';

describe('GalacticwarfarepageComponent', () => {
  let component: GalacticwarfarepageComponent;
  let fixture: ComponentFixture<GalacticwarfarepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalacticwarfarepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalacticwarfarepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
