import { DirectorMovie, PosterMovie, TitleMovie } from '@shared/types';

export interface Movie {
  readonly title: TitleMovie;
  readonly poster: PosterMovie;
  readonly director: DirectorMovie;
}
