import { CreateMovieDto, ReadMovieDto, UpdateMovieDto } from "./dto";

/**
 * Interface representing a movie repository for data access operations.
 * This repository defines methods for interacting with movie data.
 */
export interface MovieRepository {
  /**
   * Creates a new movie in the data source.
   *
   * @param createMovie A DTO containing data for the new movie.
   * @returns A Promise that resolves to a complete Movie object
   *          representing the created movie, or rejects with an error if creation fails.
   */
  createMovie(createMovie: CreateMovieDto): Promise<CreateMovieDto>;

  /**
   *
   * @returns A Promise that resolves to a list of MovieEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  findAllMovie(): Promise<ReadMovieDto[]>;

  /**
   * Finds a single movie by its ID from the data source.
   *
   * @param id The unique identifier of the movie to retrieve.
   * @returns A Promise that resolves to a complete Movie object,
   *          or rejects with an error if retrieval fails.
   */
  findOneMovie(id: number): Promise<ReadMovieDto>;

  /**
   * Updates the details of an existing movie in the data source.
   *
   * @param id The unique identifier of the movie to update.
   * @param updateMovie A DTO containing data for updating the movie.
   * @returns A Promise that resolves to a partially populated Movie object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  updateMovie(id: number, updateMovie: UpdateMovieDto): Promise<Partial<UpdateMovieDto>>;

  /**
   * Deletes a movie from the data source based on its ID.
   *
   * @param id The unique identifier of the movie to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  deleteMovie(id: number): Promise<boolean>;
}
