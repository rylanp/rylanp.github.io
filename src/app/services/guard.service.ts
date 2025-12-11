import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthcodewordService } from './authcodeword.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private auth: AuthcodewordService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = route.data['url'] ?? '';
    if (this.auth.isValid(url)) {
      return true;
    }
    this.router.navigate(['/lost']);
    return false;
  }
}
