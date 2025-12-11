import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBackgroundComponent } from './space-background.component';

describe('SpaceBackgroundComponent', () => {
  let component: SpaceBackgroundComponent;
  let fixture: ComponentFixture<SpaceBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
