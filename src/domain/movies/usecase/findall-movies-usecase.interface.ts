import { Paginated, PaginateQuery } from "nestjs-paginate";
import { MovieEntity } from "../Movies.entity";

/**
 * Interface representing a use case for finding all movies.
 */
export interface FindAllMoviesUsecase {
  /**
   * Executes the use case logic for retrieving all movies with pagination.
   *
   * @param pagination A query object containing pagination options.
   * @returns A Promise that resolves to a paginated list of MovieEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  execute(pagination: PaginateQuery): Promise<Paginated<MovieEntity>>;
}
