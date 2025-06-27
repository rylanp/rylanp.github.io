import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagenotfound',
  imports: [],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.scss'
})
export class PagenotfoundComponent {
  
  constructor(private router: Router) { }
  
  goHome() {
    this.router.navigate(['/home']);
  }

}
