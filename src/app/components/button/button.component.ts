import { Component, Input, OnInit, ElementRef, Renderer2, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import { ColorPalette } from '../../../../styles/color-palette';
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit{
  @Input() buttontext: string = "Button!";
  @Input() bordercolor: string = ColorPalette.PRIMARY;
  @Input() backgroundcolor: string = ColorPalette.TERTIARY;
  @Input() fillcolor: string = ColorPalette.PRIMARY;
  @Input() textcolor: string = ColorPalette.TEXT_PRIMARY;
  @Output() buttonClick = new EventEmitter<String>();

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const button = this.elRef.nativeElement.querySelector('.button');
    if (button) {
      console.log('Applying styles:', {
        background: this.backgroundcolor,
        border: this.bordercolor,
        text: this.textcolor,
        fill: this.fillcolor,
      });
      this.renderer.setStyle(button, '--background-color', this.backgroundcolor);
      this.renderer.setStyle(button, '--border-color', this.bordercolor);
      this.renderer.setStyle(button, '--text-color', this.textcolor);
      this.renderer.setStyle(button, '--fill-color', this.fillcolor);
    }
    else {
      console.warn('Button element not found in the component');
    }
  }
  click() {
    const buttonElement = this.elRef.nativeElement.querySelector('.button');
    if (buttonElement) {
      buttonElement.classList.add('click');
      setTimeout(() => {
        buttonElement.classList.remove('click');
      }, 400); // Match the duration of the animation
      this.buttonClick.emit(this.buttontext);
    }
  }
  
}
