export * from './authentification.service';
import { AuthentificationService } from './authentification.service';
export * from './categories.service';
import { CategoriesService } from './categories.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './movie.service';
import { MovieService } from './movie.service';
export const APIS = [AuthentificationService, CategoriesService, DefaultService, MovieService];
