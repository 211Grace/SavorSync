import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MusicPairing } from '../../../core/services/recipe.service';
import { MusicService } from '../../../core/services/music.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @Input() pairing!: MusicPairing;
  @Input() mood: string = '';
  
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 0.7;
  audio: HTMLAudioElement | null = null;
  isLoading = false;
  error = '';
  isMuted = false;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
  console.log('MusicPlayerComponent received pairing:', this.pairing);
  console.log('MusicPlayerComponent received mood:', this.mood);
  
  if (this.pairing?.musicUrl) {
    console.log('Music URL found:', this.pairing.musicUrl);
    this.initAudio();
  } else if (this.mood) {
    console.log('No music URL, loading by mood:', this.mood);
    this.loadMusicForMood();
  } else {
    console.log('No music data available');
  }
}

  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  initAudio(): void {
    if (!this.pairing?.musicUrl) return;
    
    this.audio = new Audio(this.pairing.musicUrl);
    this.audio.volume = this.volume;
    
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio?.duration || 0;
      console.log('Audio loaded, duration:', this.duration);
    });
    
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio?.currentTime || 0;
    });
    
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.currentTime = 0;
    });
    
    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      this.error = 'Could not load audio. Try again.';
      this.isLoading = false;
    });
  }

  loadMusicForMood(): void {
    this.isLoading = true;
    this.musicService.getPairingForRecipe('', this.mood).subscribe({
      next: (pairing) => {
        this.pairing = pairing;
        this.initAudio();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Could not load music. Using mock data.';
        console.error('Music load error:', err);
        this.isLoading = false;
      }
    });
  }

  togglePlay(): void {
    if (!this.audio) {
      this.initAudio();
    }
    
    if (this.isPlaying) {
      this.audio?.pause();
    } else {
      this.audio?.play().catch(err => {
        console.error('Playback failed:', err);
        this.error = 'Playback failed. Try again.';
      });
    }
    this.isPlaying = !this.isPlaying;
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  seek(event: any): void {
    const seekTime = parseFloat(event.target.value);
    if (this.audio) {
      this.audio.currentTime = seekTime;
      this.currentTime = seekTime;
    }
  }

  changeVolume(event: any): void {
    this.volume = parseFloat(event.target.value) / 100;
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
  }
  
}