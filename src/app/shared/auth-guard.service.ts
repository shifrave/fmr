import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {

    const accessToken = sessionStorage.getItem('access_token');

    // check if there is access token, and if not - navigate to the login page
    if (!accessToken) {
      this.router.navigate(['login']).then();
      return false;
    }

    return true;
  }
}

