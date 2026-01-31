import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Initial state is false
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  login(): void {
    // In a real app, this would be called after a successful API response
    this.loggedIn.next(true);
  }

  logout(): void {
    this.loggedIn.next(false);
  }

  isAuthentited(): boolean {
      return this.loggedIn.value;
  }
}
