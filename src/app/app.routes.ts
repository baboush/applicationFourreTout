import { Routes } from '@angular/router';
import { HomePageComponent, PricesPageComponent } from './views/public/pages';
import { MoviePageComponent } from './views/user/pages/movies/movie-page/movie-page.component';
import { ListMoviesComponent } from './views/admin/movies/list-movies/list-movies.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'prices', component: PricesPageComponent },
  { path: 'movie', component: MoviePageComponent },
  { path: 'movie-admin', component: ListMoviesComponent },
];
