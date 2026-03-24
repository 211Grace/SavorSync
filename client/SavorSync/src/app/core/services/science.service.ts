import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScienceFact } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ScienceService {
  private readonly API_URL = '/api/science';

  constructor(private http: HttpClient) {}

  getFactsForRecipe(recipeId: string): Observable<ScienceFact[]> {
    return this.http.get<ScienceFact[]>(`${this.API_URL}/recipe/${recipeId}`);
  }

  generateFact(recipeName: string, ingredients: string[], musicGenre: string): Observable<ScienceFact> {
    return this.http.post<ScienceFact>(`${this.API_URL}/generate`, {
      recipeName,
      ingredients,
      musicGenre
    });
  }
}
