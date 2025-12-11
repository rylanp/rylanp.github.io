import { Component, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';

enum AnimationState {
    IDLE = 1,
    ACCELERATE,
    FORWARD,
    DECCELERATE,
}
@Component({
  selector: 'app-spaceship',
  imports: [],
  templateUrl: './spaceship.component.html',
  styleUrl: './spaceship.component.scss'
})

export class SpaceshipComponent {
  private mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Default to center
  private orbitalElement!: HTMLElement;
  
  private targetPosition = { x: 0, y: 0 };
  private isMoving = false;
  private slowing_down = false;
  private detectionRadius = 40;  // how close mouse must get to trigger motion
  private arrivalThreshold = 100;  // how close to target before stopping
  private maxSpeed = 10;
  private accelerationRate = 0.002;
  private decelerationRate = 0.99;

  private acceleration = { x: 0, y: 0 }; // Initial velocity
  private velocity = { x: 0, y: 0 }; // Initial velocity
  private position = { x: 0, y: 0 }; // Current position
  private rotation = 0; // Initial rotation
  private updateInterval = 16; // ~60 updates per second
  private rotationSmoothingFactor = 0.008;
  private scrollPosition: number = 0;
  private mouseY: number = 0;
  // Animation
  private IDLE_frames: string[] = ["spaceshipIDLE.png"];
  private ACCELERATE_frames: string[] = ["spaceshipAcclerate1.png", "spaceshipAcclerate2.png", "spaceshipAcclerate3.png", "spaceshipAcclerate4.png", "spaceshipAcclerate5.png"];
  private FORWARD_frames: string[] = ["spaceshipForward1.png", "spaceshipForward2.png", "spaceshipForward3.png", "spaceshipForward4.png", "spaceshipForward5.png"];
  private DECCELERATE_frames: string[] = ["spaceshipDeccelerate1.png", "spaceshipDeccelerate2.png", "spaceshipDeccelerate3.png", "spaceshipDeccelerate4.png", "spaceshipDeccelerate5.png", "spaceshipDeccelerate6.png"];
  currentFrame = "spaceshipIDLE.png";
  private animationState: AnimationState = AnimationState.IDLE;
  private frame_index = 0;
  private animationInterval = 160; // ~10 updates per second
  


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
    this.orbitalElement = this.el.nativeElement.querySelector('.spaceship');
    this.initializeOrbital();
    this.startUpdateLoop();
  }

  // Initialize the div's position and rotation randomly
  private initializeOrbital() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let pos = this.new_pos();
    this.position.x = pos.x;
    this.position.y = pos.y;
    this.rotation = Math.random() * 360;

    this.updateElementStyles();
  }

  private new_pos(){
    const screenHeight = window.innerHeight;
    let numy = Math.random();
    const screenWidth = window.innerWidth;
    let numx = Math.random();
    while ((numy > 0.23 && numy < 0.70) && (numx > 0.32 && numx < 0.70)){ // keep out from the middle
      numy = Math.random();
      numx = Math.random();
    }
    return {x: numx * screenWidth * 0.90 + 50, y: numy * screenHeight * 0.90 + 50};
  }
  private pickNewTarget() {
    let pos = this.new_pos();
    this.targetPosition.x = pos.x;
    this.targetPosition.y = pos.y;
  }
  

  // Update orbital position based on stored mouse position
  private updateOrbitalPosition() {
    const dxMouse = this.mousePosition.x - this.position.x;
    const dyMouse = this.mousePosition.y - this.position.y;
    const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

    // --- TRIGGER: mouse comes close ---
    if ((!this.isMoving || this.slowing_down) && distanceToMouse < this.detectionRadius) {
      this.pickNewTarget();
      this.isMoving = true;
      this.slowing_down = false;
    }

    // --- MOVEMENT PHASE ---
    if (this.isMoving) {
      const dx = this.targetPosition.x - this.position.x;
      const dy = this.targetPosition.y - this.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.arrivalThreshold) {
        this.slowing_down = true;
        // Close enough — stop
        this.velocity.x *= this.decelerationRate;
        this.velocity.y *= this.decelerationRate;

        if (Math.abs(this.velocity.x) < 0.02 && Math.abs(this.velocity.y) < 0.02) {
          console.log("stopped");
          this.velocity = { x: 0, y: 0 };
          this.isMoving = false;
        }
      } else {
        this.slowing_down = false;
        // Accelerate toward target
        const ax = (dx / distance) * this.accelerationRate;
        const ay = (dy / distance) * this.accelerationRate;
        this.acceleration.x = ax;
        this.acceleration.y = ay;
        this.velocity.x += ax;
        this.velocity.y += ay;

        // Cap speed
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (speed > this.maxSpeed) {
          this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
          this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }
      }

      // Update position
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      // Rotate toward movement direction
      if (Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.y) > 0.01) {
        const targetRotation = Math.atan2(this.velocity.y, this.velocity.x) * (180 / Math.PI) + 90;
        this.rotation = this.lerp(this.rotation, targetRotation, this.rotationSmoothingFactor);
      }
    }

    this.updateAnimation();
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
    setInterval(() => {
      this.next_frame();
    }, this.animationInterval);
  }
  private lerp(current: number, target: number, smoothing: number): number {
    // Handle angular wraparound (e.g., -180 to 180 degrees)
    const difference = ((target - current + 540) % 360) - 180;
    return current + difference * smoothing;
  }
  private updateAnimation(){
    if (this.animationState == AnimationState.IDLE && this.isMoving && !this.slowing_down){
      this.animationState = AnimationState.ACCELERATE;
      this.frame_index = 0;
    } else if (this.animationState == AnimationState.FORWARD && this.slowing_down){
      this.animationState = AnimationState.DECCELERATE;
      this.frame_index = 0;
    }
  }
  private next_frame() {
    let frames: string[] = [];
    switch (this.animationState) {
      case AnimationState.IDLE:
        frames = this.IDLE_frames;
        this.currentFrame = frames[this.frame_index % frames.length];
        this.frame_index = (this.frame_index + 1) % frames.length;
        break;

      case AnimationState.FORWARD:
        frames = this.FORWARD_frames;
        this.currentFrame = frames[this.frame_index % frames.length];
        this.frame_index = (this.frame_index + 1) % frames.length;
        break;

      case AnimationState.ACCELERATE:
        frames = this.ACCELERATE_frames;
        this.currentFrame = frames[this.frame_index];
        this.frame_index += 1;
        if (this.frame_index == frames.length){
          this.frame_index = 0;
          this.animationState = AnimationState.FORWARD;
        }
        break;

      case AnimationState.DECCELERATE:
        frames = this.DECCELERATE_frames;
        this.currentFrame = frames[Math.min(this.frame_index, frames.length - 1)];
        this.frame_index += 1;
        if (this.frame_index == frames.length){
          this.frame_index = 0;
          this.animationState = AnimationState.IDLE;
        }
        break;

      default:
        break;
    }
  }
  
}
