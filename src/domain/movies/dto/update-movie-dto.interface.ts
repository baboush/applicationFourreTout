import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";

/**
 * Interface representing a DTO (Data Transfer Object) used to update an existing movie.
 */
export interface UpdateMovieDto {
  /**
   * Unique identifier of the movie. (used for identification during update)
   */
  readonly id: number;

  /**
   * Title of the movie. (can be updated)
   */
  readonly title: TitleMovie;

  /**
   * Poster image URL of the movie. (can be updated)
   */
  readonly poster: PosterMovie;

  /**
   * Director of the movie. (can be updated)
   */
  readonly director: DirectorMovie;
}
