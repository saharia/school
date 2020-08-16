import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ACTION_LOGIN } from '../store/actions/appActions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService
    ,private router: Router
    ,private route: ActivatedRoute
  ) { 

    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      // console.log('meeting id auth', data, state.url);
      let roles = route.data.role;
      console.log(roles);
      this.authService.isLoggedIn()
        .then((response) => {
          // console.log('middleware response', response);
          this.authService.updateState({
            action: ACTION_LOGIN,
            payload: response
          });
          if(roles && roles.indexOf(response.role.name) <= -1) {
            this.router.navigate(['/home']);
          }
          // this.router.navigate(['/home']);
          // console.log('home auth', response)
          resolve(true);
        })
        .catch(err => {
          console.log(err);
          if(err) {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
          resolve(true);
        });
      });
  }
  
}
