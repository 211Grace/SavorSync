import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFilterComponent } from './recipe-filter/recipe-filter.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';

import { SharedModule } from '../../shared/shared.module';  // Import SharedModule

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'saved', component: SavedRecipesComponent },
  { path: ':id', component: RecipeDetailComponent }
];

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeFilterComponent,
    SavedRecipesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule  // Add SharedModule here instead of LoadingSpinnerComponent
  ]
})
export class RecipesModule { }