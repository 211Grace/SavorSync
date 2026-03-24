import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeFilterComponent } from './recipe-filter/recipe-filter.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';

import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'saved', component: SavedRecipesComponent },
  { path: ':id', component: RecipeDetailComponent }
];

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeCardComponent,
    RecipeFilterComponent,
    SavedRecipesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LoadingSpinnerComponent
  ]
})
export class RecipesModule { }