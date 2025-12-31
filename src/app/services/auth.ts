import { Injectable, signal } from '@angular/core';
import { AuthUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userKey = 'auth-user';
  private loggedIn$ = signal<boolean>(false);

  readonly isLoggedIn = this.loggedIn$.asReadonly();

  constructor() {
    const user = localStorage.getItem(this.userKey);
    this.loggedIn$.set(!!user);
  }

  login(email: string, password: string): boolean {
    const stored = this.getStoredUser();

    if (stored && stored.email === email && stored.password === password) {
      localStorage.setItem(this.userKey, JSON.stringify(stored));
      this.loggedIn$.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.loggedIn$.set(false);
  }

  getStoredUser(): AuthUser | null {
    return JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }

  saveUser(user: AuthUser) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}
