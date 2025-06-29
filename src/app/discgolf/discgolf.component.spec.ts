import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscgolfComponent } from './discgolf.component';
describe('DiscgolfComponent', () => {
  let component: DiscgolfComponent;
  let fixture: ComponentFixture<DiscgolfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscgolfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscgolfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
