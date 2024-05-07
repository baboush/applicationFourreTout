import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

export interface CreateMovieDto {
  readonly id?: number;
  readonly title: TitleMovie;
  readonly director: DirectorMovie;
  readonly poster: PosterMovie;
}
