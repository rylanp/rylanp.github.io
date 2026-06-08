import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // <--- Import this!
import { MatButtonModule } from '@angular/material/button'; // Often used for buttons in toolbar
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, interval, map, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
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
  timer$ = interval(1).pipe( map(() => this.getTimeLeft()) );
  private sub?: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset) // Observe if the screen matches a 'handset' breakpoint
      .pipe(takeUntil(this.destroyed)) // Unsubscribe when component is destroyed
      .subscribe(result => {
        this.isHandset = result.matches; // Update isHandset based on breakpoint match
      });
  }
  getTimeLeft(): string {
    const now = new Date().getTime();

    const seconds = Math.floor((now / 1000) % 60);
    const minutes = Math.floor((now / (1000 * 60)) % 60);
    const hours = Math.floor((now / (1000 * 60 * 60)) % 24);
    const days = Math.floor(now / (1000 * 60 * 60 * 24) % 7);
    const weeks = Math.floor(now / (1000 * 60 * 60 * 24 * 7));
    const ms = Math.floor(now % 1000);
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'MMM d, y - HH:mm') ?? '';
    // return pipe.transform(new Date(), 'MMM d, y - HH:mm ss.SSS') ?? '';
    // return this.datePipe.transform(new Date(), 'MMM d, y HH:mm') ?? '';
    // return formatDate(new Date().getTime(), 'MM/dd/yyyy', 'en-GB');

    return `${weeks}w ${days}d ${hours}h ${minutes}min ${seconds}sec`;
  }

  ngOnDestroy(): void {
    this.destroyed.next(); // Emit to signal unsubscription
    this.destroyed.complete(); // Complete the subject
    this.sub?.unsubscribe();
  }
  
}
