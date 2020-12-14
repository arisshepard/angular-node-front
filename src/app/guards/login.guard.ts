import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.loginService.logged()) {
      if (
        route.data.roles &&
        route.data.roles.indexOf(this.loginService.userRole) === -1
      ) {
        this.router.navigateByUrl('/login');
        return false;
      }

      return true;
    } else {
      // console.log('NOT LOGGED');
      this.router.navigateByUrl('/login');
      return false;
    }

    // return this.auth.estaAutenticado();
  }
}
