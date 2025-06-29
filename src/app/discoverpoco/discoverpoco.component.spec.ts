import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverpocoComponent } from './discoverpoco.component';

describe('DiscoverpocoComponent', () => {
  let component: DiscoverpocoComponent;
  let fixture: ComponentFixture<DiscoverpocoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverpocoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverpocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
