import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  isLoading = true;
  savedRecipeIds: Set<string> = new Set();

  // Search & Filter
  searchQuery = '';
  selectedMood = '';
  selectedCuisine = '';
  selectedDifficulty = '';
  maxTime = 0;
  sortBy: 'name' | 'time' | 'difficulty' = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Filter options
  moods = ['romantic', 'energetic', 'relaxing', 'adventurous'];
  cuisines = ['Italian', 'Japanese', 'French', 'Thai'];
  difficulties = ['easy', 'medium', 'hard'];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    if (this.authService.isAuthenticated()) {
      this.loadSavedRecipes();
    }
  }

  loadRecipes(): void {
    this.isLoading = true;
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.applyFilters();
      this.isLoading = false;
    });
  }

  loadSavedRecipes(): void {
    this.recipeService.getSavedRecipes().subscribe(saved => {
      this.savedRecipeIds = new Set(saved.map(r => r.id));
    });
  }

  applyFilters(): void {
    let filtered = [...this.recipes];

    // Search by name or description
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      );
    }

    // Filter by mood
    if (this.selectedMood) {
      filtered = filtered.filter(r => r.mood === this.selectedMood);
    }

    // Filter by cuisine
    if (this.selectedCuisine) {
      filtered = filtered.filter(r => r.cuisineType === this.selectedCuisine);
    }

    // Filter by difficulty
    if (this.selectedDifficulty) {
      filtered = filtered.filter(r => r.difficulty === this.selectedDifficulty);
    }

    // Filter by max cooking time
    if (this.maxTime > 0) {
      filtered = filtered.filter(r => (r.prepTime + r.cookTime) <= this.maxTime);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (this.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'time':
          comparison = (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime);
          break;
        case 'difficulty':
          const diffOrder = { easy: 1, medium: 2, hard: 3 };
          comparison = diffOrder[a.difficulty] - diffOrder[b.difficulty];
          break;
      }
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    this.filteredRecipes = filtered;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedMood = '';
    this.selectedCuisine = '';
    this.selectedDifficulty = '';
    this.maxTime = 0;
    this.sortBy = 'name';
    this.sortOrder = 'asc';
    this.applyFilters();
  }

  getFilterCount(): number {
    let count = 0;
    if (this.searchQuery) count++;
    if (this.selectedMood) count++;
    if (this.selectedCuisine) count++;
    if (this.selectedDifficulty) count++;
    if (this.maxTime > 0) count++;
    if (this.sortBy !== 'name') count++;
    return count;
  }

  onSave(recipeId: string): void {
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

  toggleSort(field: 'name' | 'time' | 'difficulty'): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }
}