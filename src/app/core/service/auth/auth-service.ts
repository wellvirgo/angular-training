import { HttpClient, HttpResponse, HttpContextToken, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthReq } from '../../dto/auth/auth-req';
import { ApiResponse } from '../../api/api-response';
import { AuthRes } from '../../dto/auth/auth-res';
import { Router } from '@angular/router';

export const IS_PUBLIC_API = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = 'http://localhost:8080/api/auth';
  private readonly ACC_TOKEN_KEY = 'accessToken';

  public requestToken(payload: AuthReq): Observable<HttpResponse<ApiResponse<AuthRes>>> {
    return this.httpClient.post<ApiResponse<AuthRes>>(`${this.API_URL}`, payload, {
      observe: 'response', context: new HttpContext().set(IS_PUBLIC_API, true), withCredentials: true
    });
  }

  public requestLogout(): Observable<HttpResponse<ApiResponse<void>>> {
    return this.httpClient.post<ApiResponse<void>>(`${this.API_URL}/logout`, {}, { observe: 'response' });
  }

  public refreshToken(): Observable<HttpResponse<ApiResponse<AuthRes>>> {
    return this.httpClient.post<ApiResponse<AuthRes>>(`${this.API_URL}/refresh`, {}, {
      observe: 'response',
      withCredentials: true,
      context: new HttpContext().set(IS_PUBLIC_API, true)
    });
  }

  public login(token: string): void {
    localStorage.setItem(this.ACC_TOKEN_KEY, token);
    this.isAuthenticated.set(true);
    this.router.navigate(['']);
  }

  public refresh(token: string): void {
    localStorage.setItem(this.ACC_TOKEN_KEY, token);
  }

  public logout(): void {
    localStorage.removeItem(this.ACC_TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['login']);
  }

  public isAuthenticated = signal<boolean>(!!localStorage.getItem(this.ACC_TOKEN_KEY));

  public getToken(): string {
    return localStorage.getItem(this.ACC_TOKEN_KEY) ?? '';
  }
}
