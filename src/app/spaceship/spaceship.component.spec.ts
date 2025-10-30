import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceshipComponent } from './spaceship.component';

describe('SpaceshipComponent', () => {
  let component: SpaceshipComponent;
  let fixture: ComponentFixture<SpaceshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
