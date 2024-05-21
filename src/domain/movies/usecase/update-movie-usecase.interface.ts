import { UpdateMovieDto } from "../dto/update-movie-dto.interface";
import { Movie } from "../movie.interface";

/**
 * Interface representing a use case for updating an existing movie.
 */
export interface UpdateMovieUsecase {
  /**
   * Executes the use case logic for updating a movie.
   *
   * @param updateMovie A DTO containing data for updating the movie.
   * @returns A Promise that resolves to a partially populated Movie object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  execute(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
}
