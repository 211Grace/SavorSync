import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('GuestGuard checking...');
    console.log('isAuthenticated:', this.authService.isAuthenticated());
    
    if (!this.authService.isAuthenticated()) {
      console.log('GuestGuard: User is guest, allowing access');
      return true;
    }
    
    console.log('GuestGuard: User is authenticated, redirecting to home');
    this.router.navigate(['/']);
    return false;
  }
}