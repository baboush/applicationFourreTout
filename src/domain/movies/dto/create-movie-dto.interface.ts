import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

/**
 * Interface representing a DTO (Data Transfer Object) used to create a new movie.
 */
export interface CreateMovieDto {
  /**
   * Optional unique identifier of the movie. (usually set by the server)
   */
  readonly id?: number;

  /**
   * Title of the movie.
   */
  readonly title: TitleMovie;

  /**
   * Director of the movie.
   */
  readonly director: DirectorMovie;

  /**
   * Poster image URL of the movie.
   */
  readonly poster: PosterMovie;
}
