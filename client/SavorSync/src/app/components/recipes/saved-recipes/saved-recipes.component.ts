import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent implements OnInit {
  savedRecipes: Recipe[] = [];
  isLoading = true;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🔵🔵🔵 SAVED RECIPES COMPONENT LOADED 🔵🔵🔵');
    
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    
    const stored = localStorage.getItem('savedRecipes');
    console.log('🔵 localStorage savedRecipes:', stored);
    
    this.recipeService.debugSavedRecipes();
    this.loadSavedRecipes();
  }

  loadSavedRecipes(): void {
    console.log('🔵 loadSavedRecipes START');
    this.isLoading = true;
    this.recipeService.getSavedRecipes().subscribe(recipes => {
      console.log('🔵 getSavedRecipes returned:', recipes);
      this.savedRecipes = recipes;
      this.isLoading = false;
    });
  }

  unsaveRecipe(recipeId: string): void {
    this.recipeService.unsaveRecipe(recipeId).subscribe(() => {
      this.savedRecipes = this.savedRecipes.filter(r => r.id !== recipeId);
    });
  }
}