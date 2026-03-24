import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { MusicService } from '../../../core/services/music.service';

@Component({
  selector: 'app-cook-mode',
  templateUrl: './cook-mode.component.html',
  styleUrls: ['./cook-mode.component.css']
})
export class CookModeComponent implements OnInit, OnDestroy {
  recipe: Recipe | null = null;
  currentStep = 0;
  isPlaying = false;
  isFullscreen = false;
  timer: any = null;
  timerSeconds = 0;
  timerRunning = false;
  showTimer = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipe(id);
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  loadRecipe(id: string): void {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      if (recipe) {
        this.recipe = recipe;
      } else {
        this.router.navigate(['/recipes']);
      }
    });
  }

  nextStep(): void {
    if (this.recipe && this.currentStep < this.recipe.instructions.length - 1) {
      this.currentStep++;
      this.stopTimer(); // Stop timer when moving to next step
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stopTimer(); // Stop timer when going back
    }
  }

  togglePlayMusic(): void {
    this.isPlaying = !this.isPlaying;
    // Here you'll integrate actual music player
  }

  startTimer(minutes: number): void {
    // Clear any existing timer first
    this.stopTimer();
    
    this.timerSeconds = minutes * 60;
    this.timerRunning = true;
    this.showTimer = true;
    
    this.timer = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
      } else {
        // Timer finished
        this.stopTimer();
        alert('⏰ Timer done! Your step is complete!');
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.timerRunning = false;
    this.timerSeconds = 0;
    this.showTimer = false;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullscreen = true;
    } else {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }

  exitCookMode(): void {
    this.stopTimer(); // Stop timer when exiting
    if (this.isFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
    this.router.navigate(['/recipes', this.recipe?.id]);
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
  }
}