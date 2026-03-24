import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_RECIPES } from '../mock/recipes.mock';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  cuisineType: string;
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  mood: 'romantic' | 'energetic' | 'relaxing' | 'adventurous';
  ingredients: string[];
  instructions: string[];
  musicPairing?: MusicPairing;
  scienceFacts?: ScienceFact[];
}

export interface MusicPairing {
  songTitle: string;
  artist: string;
  genre: string;
  mood: string;
  musicUrl: string;
  embedUrl: string;
  scienceExplanation: string;
}

export interface ScienceFact {
  id: string;
  title: string;
  factText: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = MOCK_RECIPES;
  savedRecipes = signal<Recipe[]>([]);

  constructor() {
    this.initializeSavedRecipes();
  }

  private initializeSavedRecipes(): void {
    const savedFromStorage = localStorage.getItem('savedRecipes');
    if (savedFromStorage) {
      try {
        const parsed = JSON.parse(savedFromStorage);
        this.savedRecipes.set(parsed);
        console.log('Loaded saved recipes from localStorage:', parsed);
      } catch (e) {
        console.error('Error parsing saved recipes:', e);
      }
    }
  }

  getAllRecipes(): Observable<Recipe[]> {
    return of(this.recipes).pipe(delay(500));
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    const recipe = this.recipes.find(r => r.id === id);
    return of(recipe).pipe(delay(300));
  }

  getRecipesByMood(mood: string): Observable<Recipe[]> {
    const filtered = this.recipes.filter(r => r.mood === mood);
    return of(filtered).pipe(delay(300));
  }

  searchRecipes(params: { q?: string; mood?: string; cuisine?: string; maxTime?: number }): Observable<Recipe[]> {
    let filtered = this.recipes;

    if (params.mood) {
      filtered = filtered.filter(r => r.mood === params.mood);
    }
    if (params.cuisine) {
      filtered = filtered.filter(r => r.cuisineType.toLowerCase().includes(params.cuisine!.toLowerCase()));
    }
    if (params.q) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(params.q!.toLowerCase()) ||
        r.description.toLowerCase().includes(params.q!.toLowerCase())
      );
    }

    return of(filtered).pipe(delay(300));
  }

  getSavedRecipes(): Observable<Recipe[]> {
    return of(this.savedRecipes()).pipe(delay(300));
  }

  saveRecipe(recipeId: string): Observable<void> {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (recipe && !this.savedRecipes().find(r => r.id === recipeId)) {
      this.savedRecipes.update(saved => [...saved, recipe]);
      // Persist to localStorage
      localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipes()));
      console.log('Recipe saved. Saved recipes:', this.savedRecipes());
    }
    return of(undefined).pipe(delay(200));
  }

  unsaveRecipe(recipeId: string): Observable<void> {
    this.savedRecipes.update(saved => saved.filter(r => r.id !== recipeId));
    // Persist to localStorage
    localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipes()));
    console.log('Recipe unsaved. Saved recipes:', this.savedRecipes());
    return of(undefined).pipe(delay(200));
  }

  debugSavedRecipes(): void {
    console.log('Current saved recipes:', this.savedRecipes());
  }
}