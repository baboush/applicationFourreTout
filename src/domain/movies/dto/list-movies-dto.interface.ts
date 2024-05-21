import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

/**
 * Interface representing a DTO (Data Transfer Object) used to represent a list of movies.
 */
export interface ListMoviesDto {
  /**
   * Unique identifier of the movie.
   */
  readonly id: number;

  /**
   * Title of the movie.
   */
  readonly title: TitleMovie;

  /**
   * Poster image URL of the movie.
   */
  readonly poster: PosterMovie;

  /**
   * Director of the movie.
   */
  readonly director: DirectorMovie;
}
