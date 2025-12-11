import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanessaComponent } from './vanessa.component';

describe('VanessaComponent', () => {
  let component: VanessaComponent;
  let fixture: ComponentFixture<VanessaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanessaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
