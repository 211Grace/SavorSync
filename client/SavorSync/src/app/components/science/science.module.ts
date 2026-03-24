import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ScienceFactComponent } from './science-fact/science-fact.component';
import { ScienceCardComponent } from './science-card/science-card.component';
import { ScienceGeneratorComponent } from './science-generator/science-generator.component';

const routes: Routes = [
  { path: '', component: ScienceFactComponent },
  { path: 'generator', component: ScienceGeneratorComponent }
];

@NgModule({
  declarations: [
    ScienceFactComponent,
    ScienceCardComponent,
    ScienceGeneratorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScienceModule { }
