import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

export interface UpdateMovieDto {
  readonly id: number;
  readonly title: TitleMovie;
  readonly poster: PosterMovie;
  readonly director: DirectorMovie;
}
