import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
    private router: Router) { }

  canActivate(): any {
    if(localStorage.getItem('token')) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  
}
