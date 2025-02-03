import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPlanetComponent } from './button-planet.component';

describe('ButtonPlanetComponent', () => {
  let component: ButtonPlanetComponent;
  let fixture: ComponentFixture<ButtonPlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPlanetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
