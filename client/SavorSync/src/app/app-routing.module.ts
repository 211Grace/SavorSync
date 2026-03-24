import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

// Lazy loaded components (we'll create these)
const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard] },
  { path: 'register', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard] },
  { path: 'profile', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },
  { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'saved', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule), canActivate: [AuthGuard] },
  { path: 'cook-mode/:id', loadChildren: () => import('./components/cook-mode/cook-mode.module').then(m => m.CookModeModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }