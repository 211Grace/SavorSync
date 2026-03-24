import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { SavedRecipesComponent } from './components/recipes/saved-recipes/saved-recipes.component';  

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard] },
  { path: 'register', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'saved', component: SavedRecipesComponent, canActivate: [AuthGuard] },  
  { path: 'cook-mode', loadChildren: () => import('./components/cook-mode/cook-mode.module').then(m => m.CookModeModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }