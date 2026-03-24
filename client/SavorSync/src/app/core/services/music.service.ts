import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MusicPairing } from './recipe.service';

export interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  audio: string;
  image: string;
  duration: number;
  musicinfo?: {
    tags: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly API_URL = 'https://api.jamendo.com/v3.0';
  private readonly API_KEY = 'f9404361'; // Your Jamendo API key
  private readonly USE_REAL_API = true; // Set to false to always use mock data

  // Mock music data (fallback when API fails)
  private mockMusic: Map<string, MusicPairing> = new Map([
    ['romantic', {
      songTitle: 'Clair de Lune',
      artist: 'Claude Debussy',
      genre: 'Classical',
      mood: 'romantic',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'The gentle, flowing melody enhances the creamy texture and earthy notes.'
    }],
    ['energetic', {
      songTitle: 'Thunderstruck',
      artist: 'AC/DC',
      genre: 'Rock',
      mood: 'energetic',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'High-energy rock music enhances the perception of spiciness.'
    }],
    ['relaxing', {
      songTitle: 'Nocturne in E-flat major',
      artist: 'Frédéric Chopin',
      genre: 'Classical',
      mood: 'relaxing',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'Slow, contemplative melody complements rich, deep notes.'
    }],
    ['adventurous', {
      songTitle: 'One Night in Bangkok',
      artist: 'Murray Head',
      genre: 'Pop',
      mood: 'adventurous',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'Exotic rhythms enhance complex flavor profiles.'
    }]
  ]);

  constructor(private http: HttpClient) {}

  getPairingForRecipe(recipeId: string, mood: string): Observable<MusicPairing> {
    return this.searchMusicByMood(mood).pipe(
      catchError(() => {
        console.log('API failed, falling back to mock data');
        return of(this.mockMusic.get(mood) || this.mockMusic.get('romantic')!);
      })
    );
  }

  searchMusicByMood(mood: string): Observable<MusicPairing> {
    // Use real API if flag is true
    if (this.USE_REAL_API) {
      const searchTerm = this.getSearchTermByMood(mood);
      console.log(`🎵 Searching Jamendo for: ${searchTerm} (mood: ${mood})`);
      
      return this.http.get<{ results: JamendoTrack[] }>(`${this.API_URL}/tracks/`, {
        params: {
          client_id: this.API_KEY,
          format: 'json',
          search: searchTerm,
          limit: '3',
          include: 'musicinfo',
          audioformat: 'mp32'
        }
      }).pipe(
        map(response => {
          if (response.results && response.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.results.length);
            const track = response.results[randomIndex];
            console.log(`✅ Found track: ${track.name} by ${track.artist_name}`);
            return {
              songTitle: track.name,
              artist: track.artist_name,
              genre: this.getGenreByMood(mood),
              mood: mood,
              musicUrl: track.audio,
              embedUrl: `https://www.jamendo.com/track/${track.id}`,
              scienceExplanation: this.getScienceExplanation(mood)
            };
          }
          console.log('No results found, using mock data');
          return this.mockMusic.get(mood) || this.mockMusic.get('romantic')!;
        }),
        catchError(error => {
          console.error('Jamendo API error:', error);
          return of(this.mockMusic.get(mood) || this.mockMusic.get('romantic')!);
        })
      );
    }
    
    // Use mock data
    console.log('Using mock music data');
    return of(this.mockMusic.get(mood) || this.mockMusic.get('romantic')!);
  }

  searchMusic(query: string): Observable<JamendoTrack[]> {
    if (!this.USE_REAL_API) {
      return of([]);
    }
    
    return this.http.get<{ results: JamendoTrack[] }>(`${this.API_URL}/tracks/`, {
      params: {
        client_id: this.API_KEY,
        format: 'json',
        search: query,
        limit: '10',
        audioformat: 'mp32'
      }
    }).pipe(
      map(response => response.results || [])
    );
  }

  private getSearchTermByMood(mood: string): string {
    const terms: Record<string, string> = {
      romantic: 'classical piano romantic',
      energetic: 'rock upbeat energetic',
      relaxing: 'ambient chill relaxing',
      adventurous: 'world music adventure'
    };
    return terms[mood] || 'instrumental relaxing';
  }

  private getGenreByMood(mood: string): string {
    const genres: Record<string, string> = {
      romantic: 'Classical',
      energetic: 'Rock',
      relaxing: 'Ambient',
      adventurous: 'World'
    };
    return genres[mood] || 'Instrumental';
  }

  private getScienceExplanation(mood: string): string {
    const explanations: Record<string, string> = {
      romantic: 'Classical music enhances the perception of complex flavors and creates a more enjoyable dining experience.',
      energetic: 'Fast-paced music increases eating tempo and enhances the perception of spiciness.',
      relaxing: 'Slow, calming music allows for better appreciation of subtle flavors and textures.',
      adventurous: 'Unfamiliar musical patterns complement exotic spices and create a sense of discovery.'
    };
    return explanations[mood] || 'Music enhances your taste experience through psychoacoustic effects.';
  }
}