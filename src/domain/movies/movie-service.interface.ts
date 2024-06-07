import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";
import { MovieEntity } from "./Movies.entity";

/**
 * Interface representing a movie service for managing movie data in the application.
 * This service likely interacts with a movie repository for data persistence.
 */
export interface MovieService {
  /**
   * Creates and publishes a new movie.
   *
   * @param createMovie A DTO containing data for the new movie.
   * @returns A Promise that resolves to a partially populated Movie object
   *          representing the created movie, or rejects with an error if creation fails.
   */
  createAndPublishMovie(createMovie: CreateMovieDto): Promise<Partial<Movie>>;

  /**
   * Retrieves a paginated list of saved movies.
   *
   * @returns A Promise that resolves to a list of MovieEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  findSavedMoviesList(): Promise<MovieEntity[]>;

  /**
   * Finds a single saved movie by its ID.
   *
   * @param id The unique identifier of the movie to retrieve.
   * @returns A Promise that resolves to a complete Movie object,
   *          or rejects with an error if retrieval fails.
   */
  findOneSavedMovie(id: number): Promise<Movie>;

  /**
   * Updates the details of a saved movie.
   *
   * @param updateMovie A DTO containing data for updating the movie.
   * @returns A Promise that resolves to a partially populated Movie object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  updateMovieDetail(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;

  /**
   * Deletes a saved movie by its ID.
   *
   * @param id The unique identifier of the movie to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  deleteSavedMovie(id: number): Promise<boolean>;
}
