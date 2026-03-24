import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturedRecipesComponent } from './featured-recipes/featured-recipes.component';
import { MoodSelectorComponent } from './mood-selector/mood-selector.component';
import { StatsComponent } from './stats/stats.component';

import { SharedModule } from '../../shared/shared.module';

const routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    FeaturedRecipesComponent,
    MoodSelectorComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }