import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface SavedRecipe {
  recipeId: string;
  notes?: string;
  recipe: Recipe;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly API_URL = '/api/recipes';
  
  savedRecipes = signal<Recipe[]>([]);
  recentlyViewed = signal<Recipe[]>([]);

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.API_URL}/public`);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API_URL}/public/${id}`);
  }

  searchRecipes(params: { q?: string; mood?: string; cuisine?: string; maxTime?: number }): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.API_URL}/search`, { params });
  }

  getSavedRecipes(): Observable<SavedRecipe[]> {
    return this.http.get<SavedRecipe[]>(`${this.API_URL}/saved`);
  }

  saveRecipe(recipeId: string, notes?: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/saved/${recipeId}`, { notes });
  }

  unsaveRecipe(recipeId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/saved/${recipeId}`);
  }
}
