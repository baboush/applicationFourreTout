import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

/**
 * Interface defining the structure of data used for adding movies to a list.
 */
export interface AddMovieList {
  /**
   * The unique identifier of the movie to add (read-only, cannot be changed).
   */
  readonly id: number;

  /**
   * The title information for the movie.
   */
  readonly titleMovie: TitleMovie;

  /**
   * The poster information for the movie.
   */
  readonly posterMovie: PosterMovie;

  /**
   * The director information for the movie.
   */
  readonly directorMovie: DirectorMovie;
}
