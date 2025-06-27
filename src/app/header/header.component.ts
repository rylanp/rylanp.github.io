import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // <--- Import this!
import { MatButtonModule } from '@angular/material/button'; // Often used for buttons in toolbar
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink // For using routerLink directly on menu items or buttons
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{

  private destroyed = new Subject<void>();

  isHandset: boolean = false; // True if on a small screen (handset)

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset) // Observe if the screen matches a 'handset' breakpoint
      .pipe(takeUntil(this.destroyed)) // Unsubscribe when component is destroyed
      .subscribe(result => {
        this.isHandset = result.matches; // Update isHandset based on breakpoint match
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(); // Emit to signal unsubscription
    this.destroyed.complete(); // Complete the subject
  }

}
