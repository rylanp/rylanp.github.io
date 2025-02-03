import { Component, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { SpaceBackgroundComponent } from './space-background/space-background.component';
import { CubesatComponent } from './cubesat/cubesat.component';
import { ProjectSegmentComponent } from './project-segment/project-segment.component';
import { NgIf, ViewportScroller } from '@angular/common';
import { ButtonPlanetComponent } from './button-planet/button-planet.component';
import { PlanetSelectorComponent } from './planet-selector/planet-selector.component';
import { text } from 'body-parser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, SpaceBackgroundComponent, CubesatComponent, NgIf, ProjectSegmentComponent, ButtonPlanetComponent, PlanetSelectorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RylanPaul.com';
  selectedpage = "";
  selectedimage = "";
  selectorpage = "";
  selectorimage = "";
  fadeOutSelectedPageEvent = new EventEmitter<string>();
  
  constructor(private viewportScroller: ViewportScroller) {}
  page_select(event: { text: string; img: string }) {
    if (this.selectedpage !== event.text && event.text !== ""){
      this.selectedpage = event.text;
      this.selectedimage = event.img;
      this.selectorpage = event.text;
      this.selectorimage = event.img;
      
      this.scrollToElement("Project Segment", 1500);
      return;
    }
    this.scrollToElement("", 500);
    this.fadeOutSelectedPageEvent.emit('Fade out');
    this.selectorpage = "";
    this.selectorimage = "";
    setTimeout(() => {
      console.log("done");
      this.selectedpage = "";
      this.selectedimage = "";
    }, 1500); // 1000 ms = 1 second
    
    
  }
  scrollToElement(elementId: string, duration: number) { 
    // Normal scroll to the element
    const element = document.getElementById(elementId);

    const startY = window.scrollY;
    const targetY = element ? element.getBoundingClientRect().top + window.scrollY : 0;
    const distance = targetY - startY;
    const startTime = performance.now();
  
    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
  
      // Smooth easing function (easeInOutQuad)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  
      window.scrollTo(0, startY + distance * ease);
  
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  }
  
}
