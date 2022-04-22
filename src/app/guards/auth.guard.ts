import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MsalAuthenticationService } from '../services/msal-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private msalAuthenticationService: MsalAuthenticationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.msalAuthenticationService.isLoggedIn()) {
      this.router.navigate(['']);
      return false
    }
    return this.msalAuthenticationService.isLoggedIn()
  }

}
