import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel0Component } from './carousel.component';

describe('CarouselComponent', () => {
  let component: Carousel0Component;
  let fixture: ComponentFixture<Carousel0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carousel0Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
