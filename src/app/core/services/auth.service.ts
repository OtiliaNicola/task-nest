// src/app/core/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly localService = inject(LocalStorageService);

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      this.localService.set('token', 'token');
      return of({
        success: true,
        token: 'token'
      });
    } else {
      return throwError( () => ({
        success: false,
        message: 'Usuario y/o contraseña incorrectos.'
      }));
    }
  }

    async isLoggedIn(): Promise<boolean> {
      return await this.localService.get('token');
    }

    logout(): void {
      this.localService.remove('token');
    }
  }