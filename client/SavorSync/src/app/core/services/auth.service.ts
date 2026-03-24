import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = signal<User | null>(null);
  private _isAuthenticated = signal(false);
  
  // Public readonly signals
  currentUser = this._currentUser.asReadonly();
  isAuthenticated = this._isAuthenticated.asReadonly();

  // Mock users storage (in memory)
  private mockUsers: User[] = [
    { id: '1', username: 'demo', email: 'demo@example.com', createdAt: new Date().toISOString() }
  ];
  private mockTokens: Map<string, string> = new Map();

  constructor(private http: HttpClient, private router: Router) {
    this.loadStoredUser();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        const user = this.mockUsers.find(u => u.email === email);
        
        if (!user) {
          observer.error(new Error('Invalid credentials'));
          return;
        }
        
        const token = `mock-jwt-token-${Date.now()}`;
        this.mockTokens.set(user.id, token);
        
        const response: AuthResponse = {
          token: token,
          userId: user.id,
          username: user.username,
          email: user.email
        };
        
        this.handleAuthResponse(response);
        observer.next(response);
        observer.complete();
      }, 500);
    });
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        if (this.mockUsers.some(u => u.email === email)) {
          observer.error(new Error('Email already registered'));
          return;
        }
        
        const newUser: User = {
          id: String(this.mockUsers.length + 1),
          username,
          email,
          createdAt: new Date().toISOString()
        };
        
        this.mockUsers.push(newUser);
        
        const token = `mock-jwt-token-${Date.now()}`;
        this.mockTokens.set(newUser.id, token);
        
        const response: AuthResponse = {
          token: token,
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email
        };
        
        this.handleAuthResponse(response);
        observer.next(response);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify({
      id: response.userId,
      username: response.username,
      email: response.email,
      createdAt: new Date().toISOString()
    }));
    this._currentUser.set({
      id: response.userId,
      username: response.username,
      email: response.email,
      createdAt: new Date().toISOString()
    });
    this._isAuthenticated.set(true);
    
    console.log('✅ Auth response handled. isAuthenticated:', this._isAuthenticated());
    console.log('✅ currentUser:', this._currentUser());
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    console.log('🔍 loadStoredUser - token exists:', !!token);
    console.log('🔍 loadStoredUser - userStr:', userStr);
    
    if (token && userStr) {
      this._currentUser.set(JSON.parse(userStr));
      this._isAuthenticated.set(true);
      console.log('✅ User loaded from storage:', this._currentUser());
      console.log('✅ isAuthenticated set to:', this._isAuthenticated());
    }
  }
}