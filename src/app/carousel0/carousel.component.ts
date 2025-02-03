import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, ThemeDirective } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { cilCaretLeft, cilCaretRight } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carousel',
  imports: [ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselControlComponent, RouterLink, CarouselModule, IconDirective, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class Carousel0Component {
  icons = { cilCaretLeft, cilCaretRight};
  @Input() slides: { id: number; src: string }[] = [{ id: 0, src: 'RP.gif'}];
  activeIndex = 0;
}
