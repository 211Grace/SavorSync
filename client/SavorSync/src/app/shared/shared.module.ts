import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { RecipeCardComponent } from '../components/recipes/recipe-card/recipe-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';

// Directives
import { HoverEffectDirective } from './directives/hover-effect.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    RecipeCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    HeaderComponent,
    FooterComponent,
    TruncatePipe,
    HoverEffectDirective,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RecipeCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    HeaderComponent,
    FooterComponent,
    TruncatePipe,
    HoverEffectDirective,
    ClickOutsideDirective
  ]
})
export class SharedModule { }