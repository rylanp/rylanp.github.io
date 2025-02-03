import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-planet-selector',
  imports: [CommonModule],
  templateUrl: './planet-selector.component.html',
  styleUrl: './planet-selector.component.scss'
})
export class PlanetSelectorComponent {
  @Input() imagesrc: string = "RP.gif";
  @Input() page: string = "Page selected";
  @Output() buttonClick = new EventEmitter<{ text: string; img: string }>();

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  click() {
    const buttonElement = this.elRef.nativeElement.querySelector('.top-left');
    if (buttonElement) {
      buttonElement.classList.add('click');
      setTimeout(() => {
        buttonElement.classList.remove('click');
      }, 400); // Match the duration of the animation
      this.buttonClick.emit({ text: "", img: "" });
      let audio = new Audio('sounds/click2.wav');
      audio.load();
      audio.play();
    }
  }
}
