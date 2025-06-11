import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { LoginRequest, LoginResponse } from '../model/admin.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<boolean>(this.hasToken());
  public authState$ = this.authStateSubject.asObservable();

  private API_URL = `${environment.apiUrl}/auth/login`;

  constructor(private _http: HttpClient, private router: Router) {
    // Initialize the auth state based on token presence
    this.authStateSubject.next(this.hasToken());
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this.API_URL}`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId.toString());
          // Update auth state
          this.authStateSubject.next(true);
        })
      );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Update auth state
    this.authStateSubject.next(false);
  }
}
