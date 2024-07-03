import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

/**
 * Interface representing a Movie entity in the application.
 */
export interface Movie {
  /**
   * Unique identifier of the movie.
   */
  readonly id: number;

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
