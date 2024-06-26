import { CreateMovieDto } from "../dto";

/**
 * Interface representing a use case for creating a new movie.
 */
export interface CreateMovieUsecase {
  /**
   * Executes the use case logic for creating a movie.
   *
   * @param createMovie A DTO containing data for the new movie.
   * @returns A Promise that resolves to a partially populated Movie object,
   *          or rejects with an error if the creation fails.
   */
  execute(createMovie: CreateMovieDto): Promise<Partial<CreateMovieDto>>;
}
