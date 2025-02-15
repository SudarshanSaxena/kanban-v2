import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
  { 
    path: 'boards', 
    loadChildren: () => import('./boards.routes').then(m => m.BOARD_ROUTES) 
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
};
