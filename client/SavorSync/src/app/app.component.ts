import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Force reload auth state on every navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation to:', event.url);
        
        // Check localStorage and update signals if needed
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr && !this.authService.isAuthenticated()) {
          console.log('Reloading auth state on navigation');
          const user = JSON.parse(userStr);
          (this.authService as any)._currentUser?.set(user);
          (this.authService as any)._isAuthenticated?.set(true);
        }
      }
    });
  }
}