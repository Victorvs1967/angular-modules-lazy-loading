import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged: boolean = false;
    this.auth.isLoggedIn.subscribe(status => logged = status);
    if (logged) {
        return true;
    }
    alert('You must login to the system to access this page...');
    this.router.navigate(['/auth']);
    return false;
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
  ): boolean | UrlTree {
    let username = '';
    this.auth.isLoggedUser().subscribe(user => username = user ? user.username : '');
    if (username === 'admin') {
      return true;
    }
    alert('You must login as Admin to access this page...');
    return false;
  }

}
