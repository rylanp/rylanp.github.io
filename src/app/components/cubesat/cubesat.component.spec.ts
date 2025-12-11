import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubesatComponent } from './cubesat.component';

describe('CubesatComponent', () => {
  let component: CubesatComponent;
  let fixture: ComponentFixture<CubesatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubesatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubesatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
