import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CookModeComponent } from './cook-mode/cook-mode.component';
import { StepTimerComponent } from './step-timer/step-timer.component';
import { IngredientCheckerComponent } from './ingredient-checker/ingredient-checker.component';

const routes: Routes = [
  { path: ':id', component: CookModeComponent }
];

@NgModule({
  declarations: [
    CookModeComponent,
    StepTimerComponent,
    IngredientCheckerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CookModeModule { }
