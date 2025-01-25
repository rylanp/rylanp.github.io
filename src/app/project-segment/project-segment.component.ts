import { Component, Input, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { ProjectData } from '../../models/ProjectData';
import { NgFor } from '@angular/common';
import { Carousel0Component } from '../carousel0/carousel.component';
@Component({
  selector: 'app-project-segment',
  imports: [NgFor, Carousel0Component],
  templateUrl: './project-segment.component.html',
  styleUrl: './project-segment.component.scss'
})
export class ProjectSegmentComponent {
  @Input() title: string = 'Project Title';
  @Input() subtitle: string = 'subtitle';
  @Input() images: string[] = [];
  @Input() about: string = "This is the about paragraph";
  @Input() skills: string[] = ["Skill 1", "Skill 2", "Skill 3"];
  @Input() extralinks: Link[] = [];
  @Input() projectLink: string = "https:example_link.linky.link";
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
}
export class Link {
  image: string = "path_to_image";
  name: string = "Link Name";
  link: string = "https:example_link.linky.link";
}
