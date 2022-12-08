import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginInfo } from '../models/login-info.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor() { }

  login(info: LoginInfo): Observable<LoginInfo> {
    window.sessionStorage.clear();
    window.sessionStorage.setItem('token', JSON.stringify(info));

    this.loggedIn.next(true);
    return of(info);
  }

  logout() {
    window.sessionStorage.clear();
    this.loggedIn.next(false);

  }

  signup(user: User): Observable<User> {
    return of(user);
  }

  isLoggedUser(): Observable<User | null> {
    const user = window.sessionStorage.getItem('token');
    if (user) return of(JSON.parse(user));
    return of(null);
  }

}
