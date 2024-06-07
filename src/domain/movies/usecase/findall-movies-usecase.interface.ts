import { MovieEntity } from "../Movies.entity";

/**
 * Interface representing a use case for finding all movies.
 */
export interface FindAllMoviesUsecase {
  /**
   * Executes the use case logic for retrieving all movies with pagination.
   *
   * @returns A Promise that resolves to a paginated list of MovieEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  execute(): Promise<MovieEntity[]>;
}
