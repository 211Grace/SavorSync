import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredRecipes: Recipe[] = [];
  isLoading = true;
  selectedMood = '';
  savedRecipeIds: Set<string> = new Set();

  constructor(
    private recipeService: RecipeService,
    public authService: AuthService  // Make public so template can access
  ) {}

  ngOnInit(): void {
    this.loadFeaturedRecipes();
    if (this.authService.isAuthenticated()) {
      this.loadSavedRecipes();
    }
  }

  loadFeaturedRecipes(): void {
    this.isLoading = true;
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.featuredRecipes = recipes.slice(0, 3);
      this.isLoading = false;
    });
  }

  loadSavedRecipes(): void {
    this.recipeService.getSavedRecipes().subscribe(saved => {
      this.savedRecipeIds = new Set(saved.map(r => r.id));
    });
  }

  onMoodSelected(mood: string): void {
    this.selectedMood = mood;
    this.isLoading = true;
    this.recipeService.getRecipesByMood(mood).subscribe(recipes => {
      this.featuredRecipes = recipes.slice(0, 3);
      this.isLoading = false;
    });
  }

  onSave(recipeId: string): void {
    if (!this.authService.isAuthenticated()) {
      // Redirect to login or show message
      return;
    }
    this.recipeService.saveRecipe(recipeId).subscribe(() => {
      this.savedRecipeIds.add(recipeId);
    });
  }

  onUnsave(recipeId: string): void {
    this.recipeService.unsaveRecipe(recipeId).subscribe(() => {
      this.savedRecipeIds.delete(recipeId);
    });
  }

  isRecipeSaved(recipeId: string): boolean {
    return this.savedRecipeIds.has(recipeId);
  }
}