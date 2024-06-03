import { Routes } from '@angular/router';
import { HomePageComponent, PricesPageComponent } from './views/public/pages';
import { MoviePageComponent } from './views/user/pages/movie-page/movie-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'prices', component: PricesPageComponent },
  { path: 'movie', component: MoviePageComponent },
];
