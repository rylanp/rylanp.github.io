import { Component, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';
import { tick } from '@angular/core/testing';
import { distinct } from 'rxjs';

@Component({
  selector: 'app-cubesat',
  imports: [],
  templateUrl: './cubesat.component.html',
  styleUrl: './cubesat.component.scss'
})
export class CubesatComponent implements OnInit {
  private mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Default to center
  private orbitalElement!: HTMLElement;
  private velocity = { x: 0, y: 0 }; // Initial velocity
  private position = { x: 0, y: 0 }; // Current position
  private rotation = 0; // Initial rotation
  private gravitationalConstant = 10.0; // Controls gravitational pull strength
  private updateInterval = 16; // ~60 updates per second
  private rotationSmoothingFactor = 0.05;
  private distscale = 40;
  private scrollPosition: number = 0;
  private mouseY: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY; // Vertical scroll position
    this.mousePosition.y = this.mouseY + this.scrollPosition;
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition.x = event.clientX;
    this.mouseY = event.clientY;
    this.mousePosition.y = this.mouseY + this.scrollPosition;
  }

  ngOnInit() {
    this.orbitalElement = this.el.nativeElement.querySelector('.cubesat');
    this.initializeOrbital();
    this.startUpdateLoop();
  }

  // Initialize the div's position and rotation randomly
  private initializeOrbital() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    this.position.x = Math.random() * screenWidth;
    this.position.y = Math.random() * screenHeight;
    this.rotation = Math.random() * 360;

    this.updateElementStyles();
  }

  // Update orbital position based on stored mouse position
  private updateOrbitalPosition() {
    const dx = this.mousePosition.x - this.position.x;
    const dy = this.mousePosition.y - this.position.y;
    const sqrtdistance = dx * dx + dy * dy * this.distscale;
    const force = this.gravitationalConstant / Math.max(sqrtdistance, 1); // Prevent division by zero
    const acceleration = { x: force * dx, y: force * dy};
    this.velocity.x += acceleration.x;
    this.velocity.y += acceleration.y;
    // // const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    const targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
    this.rotation = this.lerp(this.rotation, targetRotation, this.rotationSmoothingFactor);

    this.updateElementStyles();
  }

  // Update styles for position and rotation
  private updateElementStyles() {
    this.orbitalElement.style.left = this.position.x - this.orbitalElement.offsetWidth / 2 + 'px';
    this.orbitalElement.style.top = this.position.y - this.orbitalElement.offsetHeight / 2 + 'px';
    this.orbitalElement.style.rotate = this.rotation + 'deg';
  }

  // Start an interval or animation loop for continuous updates
  private startUpdateLoop() {
    setInterval(() => {
      this.updateOrbitalPosition();
    }, this.updateInterval);
  }
  private lerp(current: number, target: number, smoothing: number): number {
    // Handle angular wraparound (e.g., -180 to 180 degrees)
    const difference = ((target - current + 540) % 360) - 180;
    return current + difference * smoothing;
  }
}
