import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('🔒 AuthGuard checking authentication for:', state.url);
    
    // Get current auth state from signals
    const isAuth = this.authService.isAuthenticated();
    const currentUser = this.authService.currentUser();
    const token = this.authService.getToken();
    
    console.log('🔒 isAuthenticated from signal:', isAuth);
    console.log('🔒 currentUser from signal:', currentUser);
    console.log('🔒 token from localStorage:', token);
    
    // Also check localStorage directly
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('🔒 Direct localStorage - token:', !!storedToken, 'user:', !!storedUser);
    
    // If signal says false but localStorage has data, refresh the signal
    if (!isAuth && storedToken && storedUser) {
      console.log('🔄 Refreshing auth state from localStorage');
      const user = JSON.parse(storedUser);
      (this.authService as any)._currentUser?.set(user);
      (this.authService as any)._isAuthenticated?.set(true);
      console.log('🔄 After refresh - isAuthenticated:', this.authService.isAuthenticated());
      return true;
    }
    
    if (isAuth) {
      console.log('✅ AuthGuard: Access granted');
      return true;
    }
    
    console.log('❌ AuthGuard: Access denied, redirecting to login');
    localStorage.setItem('redirectUrl', state.url);
    this.router.navigate(['/login']);
    return false;
  }
}