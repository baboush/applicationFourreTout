import { CreateMovieDto, ReadMovieDto, UpdateMovieDto } from "./dto";

/**
 * Interface representing a movie controller in the Angular application.
 * This controller handles interactions related to movie data.
 */
export interface MovieController {
  /**
   * Handles the logic for creating and publishing a new movie.
   *
   * @param createMovie A DTO containing data for the new movie.
   * @returns A Promise that resolves to a partially populated Movie object
   *          representing the created movie, or rejects with an error if creation fails.
   */
  handleCreateAndPublishMovie(
    createMovie: CreateMovieDto,
  ): Promise<Partial<CreateMovieDto>>;

  /**
   * Handles the logic for finding a list of saved movies with pagination.
   *
   * @returns A Promise that resolves to a  list of MovieEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  handleFindSavedMoviesList(): Promise<ReadMovieDto[]>;

  /**
   * Handles the logic for finding a single saved movie by its ID.
   *
   * @param id The unique identifier of the movie to retrieve.
   * @returns A Promise that resolves to a complete Movie object,
   *          or rejects with an error if retrieval fails.
   */
  handleFindOneSavedMovie(id: number): Promise<Partial<ReadMovieDto>>;

  /**
   * Handles the logic for updating the details of a saved movie.
   *
   * @param updateMovie A DTO containing data for updating the movie.
   * @returns A Promise that resolves to a partially populated Movie object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  handleUpdateMovieDetail(
    updateMovie: UpdateMovieDto,
  ): Promise<Partial<UpdateMovieDto>>;

  /**
   * Handles the logic for deleting a saved movie by its ID.
   *
   * @param id The unique identifier of the movie to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  handleDeleteSavedMovie(id: number): Promise<boolean>;
}
