import { Categories } from "@domain/entities/Categories.entity";
import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

export interface ListMoviesDto {
  readonly id: number;
  readonly title: TitleMovie;
  readonly poster: PosterMovie;
  readonly director: DirectorMovie;
}
