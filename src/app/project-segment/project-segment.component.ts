import { Component, Input, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { ProjectData } from '../../models/ProjectData';
import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Carousel0Component } from '../carousel0/carousel.component';
import { cilExternalLink } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-project-segment',
  imports: [NgFor, Carousel0Component, NgStyle, NgIf, IconDirective, RouterLink],
  templateUrl: './project-segment.component.html',
  styleUrl: './project-segment.component.scss'
})
export class ProjectSegmentComponent {
  icons = { cilExternalLink };
  @Input() title: string = 'Project Title';
  @Input() subtitle: string = 'subtitle';
  @Input() images: {id: number; src: string}[] = [{ id: 0, src: 'RP.gif'}];
  @Input() about: string = "This is the about paragraph";
  @Input() skills: string[] = ["Skill 1", "Skill 2", "Skill 3"];
  @Input() extralinks: Link[] = [];
  @Input() projectLink: string = "https:example_link.linky.link";
  @Input() opennewtab: boolean = true;
  @Output() buttonClick = new EventEmitter<{ text: string; img: string }>();
  @Input() fadeOutEvent!: EventEmitter<string>;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    // Subscribe to the event emitter
    this.fadeOutEvent.subscribe((data: string) => {
      const buttonElement = this.elRef.nativeElement.querySelector('.main');
      if (buttonElement) {
        buttonElement.classList.add('fadeout');
      }
    });
  }

  click() {
    let audio = new Audio('sounds/click2.wav');
    audio.load();
    audio.play();
    this.buttonClick.emit({ text: "", img: "" });
    const buttonElement = this.elRef.nativeElement.querySelector('.main');
    if (buttonElement) {
      buttonElement.classList.add('fadeout');
    }
  }
  getColor(index: number): string {
    const startColor = [234, 82, 111]; // Starting RGB (e.g., light orange)
    const endColor = [73, 54, 87]; // Ending RGB (e.g., light blue)

    const r = Math.round(startColor[0] + ((endColor[0] - startColor[0]) / (this.skills.length - 1)) * index);
    const g = Math.round(startColor[1] + ((endColor[1] - startColor[1]) / (this.skills.length - 1)) * index);
    const b = Math.round(startColor[2] + ((endColor[2] - startColor[2]) / (this.skills.length - 1)) * index);

    return `rgb(${r}, ${g}, ${b})`;
  }
}
export class Link {
  image: string = "path_to_image";
  name: string = "Link Name";
  link: string = "https:example_link.linky.link";
  opennewtab: boolean = true;
  router: boolean = false;
}
