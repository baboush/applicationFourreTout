import { Movie } from "../movie.interface";

export interface ListMoviesDto {
  readonly itemsMovies: Movie[];
  readonly itemsCount: number;
}
