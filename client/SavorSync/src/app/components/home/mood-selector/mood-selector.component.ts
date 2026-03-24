import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mood-selector',
  templateUrl: './mood-selector.component.html',
  styleUrls: ['./mood-selector.component.css']
})
export class MoodSelectorComponent {
  @Output() moodSelected = new EventEmitter<string>();
  selectedMood: string = '';

  moods = [
    { name: 'Romantic', icon: '🎵', value: 'romantic' },
    { name: 'Energetic', icon: '⚡', value: 'energetic' },
    { name: 'Relaxing', icon: '😌', value: 'relaxing' },
    { name: 'Adventurous', icon: '🗺️', value: 'adventurous' }
  ];

  selectMood(mood: string): void {
    this.selectedMood = mood;
    this.moodSelected.emit(mood);
  }

  getButtonClass(moodValue: string): string {
    const baseClass = 'p-6 rounded-2xl border border-nebula-violet/50 text-star-white hover:bg-nebula-violet/40 transition text-center ';
    if (this.selectedMood === moodValue) {
      return baseClass + 'bg-nebula-violet';
    }
    return baseClass + 'bg-nebula-violet/20';
  }
}