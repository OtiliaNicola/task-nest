import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal(false);
  
  private readonly VALID_USERS = [
    { username: 'admin', password: 'admin123' }
  ];

  constructor() {
    this.isAuthenticated.set(!!localStorage.getItem('token'));
  }

  login(credentials: User): Observable<any> {
    const user = this.VALID_USERS.find(
      u => u.username === credentials.username && 
           u.password === credentials.password
    );

    if (user) {
      localStorage.setItem('token', 'fake-token');
      this.isAuthenticated.set(true);
      return of({ success: true }).pipe(delay(1000));
    }

    return throwError(() => new Error('Credenciales inválidas'));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}