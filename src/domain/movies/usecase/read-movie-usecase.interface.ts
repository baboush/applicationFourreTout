import { Movie } from "../movie.interface";

/**
 * Interface representing a use case for reading a single movie.
 */
export interface ReadMovieUsecase {
  /**
   * Executes the use case logic for retrieving a movie by its ID.
   *
   * @param id The unique identifier of the movie to retrieve.
   * @returns A Promise that resolves to a complete Movie object,
   *          or rejects with an error if retrieval fails.
   */
  execute(id: number): Promise<Movie>;
}
