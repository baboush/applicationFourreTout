import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import { Movie } from "../movie.interface";

export interface ListMoviesDto {
  readonly id: number;
  readonly title: TitleMovie;
  readonly poster: PosterMovie;
  readonly director: DirectorMovie;
}
