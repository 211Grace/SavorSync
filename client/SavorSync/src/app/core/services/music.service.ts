import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicPairing } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly API_URL = '/api/music';

  constructor(private http: HttpClient) {}

  getPairingForRecipe(recipeId: string): Observable<MusicPairing> {
    return this.http.get<MusicPairing>(`${this.API_URL}/pairing/${recipeId}`);
  }

  getPlaylistByMood(mood: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/mood/${mood}`);
  }

  searchMusic(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/search`, { params: { q: query } });
  }
}
