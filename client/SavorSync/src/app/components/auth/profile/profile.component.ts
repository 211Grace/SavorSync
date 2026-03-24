import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {
    console.log('🔵🔵🔵 PROFILE COMPONENT CONSTRUCTOR CALLED 🔵🔵🔵');
  }

  ngOnInit(): void {
    console.log('🔵🔵🔵 PROFILE COMPONENT ngOnInit STARTED 🔵🔵🔵');
    this.user = this.authService.currentUser();
    console.log('🔵 Profile component - user:', this.user);
    
    // If no user, redirect to login
    if (!this.user) {
      console.log('🔵 No user found, redirecting to login');
      this.authService.redirectToLogin();
    } else {
      console.log('🔵 User found, staying on profile page');
    }
  }
}