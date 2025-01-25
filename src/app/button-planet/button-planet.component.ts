import { Component, Input, ElementRef, Renderer2, Output, EventEmitter} from '@angular/core';
import { ColorPalette } from '../../styles/color-palette';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button-planet',
  imports: [CommonModule],
  templateUrl: './button-planet.component.html',
  styleUrl: './button-planet.component.scss'
})
export class ButtonPlanetComponent{
  @Input() buttontext: string = "Button!";
  @Input() buttonImage: string = "image";
  @Input() isSeletced: boolean = false;
  @Output() buttonClick = new EventEmitter<{ text: string; img: string }>();

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  click() {
    const buttonElement = this.elRef.nativeElement.querySelector('.button');
    if (buttonElement) {
      buttonElement.classList.add('click');
      setTimeout(() => {
        buttonElement.classList.remove('click');
      }, 400); // Match the duration of the animation
      this.buttonClick.emit({ text: this.buttontext, img: this.buttonImage });
      let audio = new Audio('sounds/click.wav');
      audio.load();
      audio.play();
    }
  }
  // playHoverSound(){
  //   // let audio = new Audio('sounds/hover2.wav');
  //   // audio.load();
  //   // audio.play();
  //   const audioContext = new AudioContext();

  //   // Create oscillator and gain nodes
  //   const oscillator = audioContext.createOscillator();
  //   const gainNode = audioContext.createGain();

  //   // Configure the oscillator
  //   oscillator.type = 'square';
  //   var num = Math.round(Math.random() * 10);
  //   var freq = 0;
  //   switch (num){
  //     case 0:
  //       freq = 98.0;
  //       break;
  //     case 1:
  //       freq = 110;
  //       break;
  //     case 2:
  //       freq = 123.5;
  //       break;
  //     case 3:
  //       freq = 130.8;
  //       break;
  //     case 4:
  //       freq = 146.8;
  //       break;
  //     case 5:
  //       freq = 164.8;
  //       break;
  //     case 6:
  //       freq = 174.6;
  //       break;
  //     case 7:
  //       freq = 196;
  //       break;
  //     case 8:
  //       freq = 220;
  //       break;
  //     case 9:
  //       freq = 246.9;
  //       break;
  //     case 10:
  //       freq = 261.6;
  //       break;
        
  //   }
  //   oscillator.frequency.setValueAtTime(freq, audioContext.currentTime); // Frequency in Hz

  //   // Configure the envelope (attack and decay)
  //   const now = audioContext.currentTime;
  //   gainNode.gain.setValueAtTime(0, now); // Start at 0 volume
  //   gainNode.gain.linearRampToValueAtTime(0.09, now + 0.08); // Attack to 30% volume over 8 ms
  //   gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2); // Decay to near silence over 200 ms

  //   // Connect nodes
  //   oscillator.connect(gainNode);
  //   gainNode.connect(audioContext.destination);

  //   // Start and stop oscillator
  //   oscillator.start(now);
  //   oscillator.stop(now + .28); // Stop after 300 ms
  // }
  
}
