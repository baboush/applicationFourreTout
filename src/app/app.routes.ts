import { Routes } from '@angular/router';
import {
  HomePageComponent,
  PricesPageComponent,
} from '@application/public/pages';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'prices', component: PricesPageComponent },
];
