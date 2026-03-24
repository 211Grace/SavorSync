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
