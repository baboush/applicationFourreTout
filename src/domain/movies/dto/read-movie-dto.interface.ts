import { Categories } from "@domain/entities/Categories.entity";
import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

export interface ReadMovieDto {
  readonly id: number;
  readonly title: TitleMovie;
  readonly poster: PosterMovie;
  readonly director: DirectorMovie;
}
