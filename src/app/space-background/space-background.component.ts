import { NgFor } from '@angular/common';
import { Component, AfterViewInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-space-background',
  imports: [],
  templateUrl: './space-background.component.html',
  styleUrl: './space-background.component.scss'
})
export class SpaceBackgroundComponent implements AfterViewInit{
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.setRandomAnimation();
  }
  setRandomAnimation() {
    const bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach((bubble, index) => {
      const randomDuration = (Math.random() * 15 + 4).toFixed(3); // Random duration between 2s and 4s
      const randomDelay = (Math.random() * 3).toFixed(3); // Random phase between 0s and 2s
      const randomScale = (Math.random() * (1.07 - 1.0) + 1.0).toFixed(3); // Random scale between 1.0 and 1.15

      // Apply random duration and delay
      const animationName = `bubbleAnimation-${index}`;
      this.renderer.setStyle(bubble, 'animation-duration', `${randomDuration}s`);
      this.renderer.setStyle(bubble, 'animation-delay', `${randomDelay}s`);
      this.updateScaleAnimation(bubble, randomScale);
      this.createUniqueAnimation(animationName, randomScale);
    });
  }
  createUniqueAnimation(animationName: string, randomScale: string) {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes ${animationName} {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(${randomScale});
        }
        100% {
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(styleElement);
  }
  updateScaleAnimation(bubble: Element, randomScale: string) {
    const scaleAnimation = `
      @keyframes bubbleAnimation {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(${randomScale});
        }
        100% {
          transform: scale(1);
        }
      }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = scaleAnimation;
    document.head.appendChild(styleElement);

    // Apply the animation to the element
    this.renderer.setStyle(bubble, 'animation-name', 'bubbleAnimation');
  }
}
