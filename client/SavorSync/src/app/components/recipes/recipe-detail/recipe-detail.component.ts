import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  isLoading = true;
  isSaved = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipe(id);
      if (this.authService.isAuthenticated()) {
        this.checkIfSaved(id);
      }
    }
  }

  loadRecipe(id: string): void {
    this.isLoading = true;
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      if (recipe) {
        this.recipe = recipe;
      } else {
        // Recipe not found, redirect to recipes page
        this.router.navigate(['/recipes']);
      }
      this.isLoading = false;
    });
  }

  checkIfSaved(id: string): void {
    this.recipeService.getSavedRecipes().subscribe(saved => {
      this.isSaved = saved.some(r => r.id === id);
    });
  }

 toggleSave(): void {
  console.log('Toggle save clicked!', this.recipe?.id, 'Current saved:', this.isSaved);
  console.log('Is authenticated?', this.authService.isAuthenticated());
  
  // Check if user is authenticated
  if (!this.authService.isAuthenticated()) {
    console.log('Not authenticated, redirecting to login');
    this.authService.redirectToLogin();
    return;
  }

  if (this.isSaved) {
    this.recipeService.unsaveRecipe(this.recipe!.id).subscribe(() => {
      this.isSaved = false;
      console.log('Recipe unsaved');
    });
  } else {
    this.recipeService.saveRecipe(this.recipe!.id).subscribe(() => {
      this.isSaved = true;
      console.log('Recipe saved');
    });
  }
}

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-star-white/60';
    }
  }
}