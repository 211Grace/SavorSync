export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  musicGenre?: string;
  moodPreference?: string;
  dietaryRestrictions?: string[];
}

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
  email: string;
}
