import { Injectable, signal } from '@angular/core';
import { AuthUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly userKey = 'auth-user';
  private readonly loggedInKey = 'is-logged-in';

  private loggedIn$ = signal<boolean>(false);
  readonly isLoggedIn = this.loggedIn$.asReadonly();

  constructor() {
    this.restoreLoginState();
  }

  private restoreLoginState(): void {
    const loggedIn = localStorage.getItem(this.loggedInKey);
    this.loggedIn$.set(loggedIn === 'true');
  }

  login(email: string, password: string): boolean {
    const storedUser = this.getStoredUser();

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem(this.loggedInKey, 'true');
      this.loggedIn$.set(true);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
    this.loggedIn$.set(false);
  }

  getStoredUser(): AuthUser | null {
    return JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }

  saveUser(user: AuthUser): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}
