import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserPreferences {
  musicGenre?: string;
  moodPreference?: string;
  dietaryRestrictions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = '/api/users';

  constructor(private http: HttpClient) {}

  updatePreferences(preferences: UserPreferences): Observable<UserPreferences> {
    return this.http.put<UserPreferences>(`${this.API_URL}/preferences`, preferences);
  }

  getPreferences(): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(`${this.API_URL}/preferences`);
  }
}
