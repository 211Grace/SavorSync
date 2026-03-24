import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../core/services/recipe.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() isSaved: boolean = false;
  @Output() save = new EventEmitter<string>();
  @Output() unsave = new EventEmitter<string>();

  constructor(public authService: AuthService) {}

  onSaveClick(event: Event): void {
    event.stopPropagation();
    console.log('Save button clicked!', this.recipe.id, 'Saved:', this.isSaved);
    console.log('Is authenticated?', this.authService.isAuthenticated());
    
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      console.log('User not authenticated, redirecting to login');
      this.authService.redirectToLogin();
      return;
    }
    
    if (this.isSaved) {
      this.unsave.emit(this.recipe.id);
    } else {
      this.save.emit(this.recipe.id);
    }
  }
}