import { PaginateQuery, Paginated } from "nestjs-paginate";
import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";
import { MovieEntity } from "./Movies.entity";

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
  ): Promise<Partial<Movie>>;

  /**
   * Handles the logic for finding a list of saved movies with pagination.
   *
   * @param pagination A query object containing pagination options.
   * @returns A Promise that resolves to a paginated list of MovieEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  handleFindSavedMoviesList(
    pagination: PaginateQuery,
  ): Promise<Paginated<MovieEntity>>;

  /**
   * Handles the logic for finding a single saved movie by its ID.
   *
   * @param id The unique identifier of the movie to retrieve.
   * @returns A Promise that resolves to a complete Movie object,
   *          or rejects with an error if retrieval fails.
   */
  handleFindOneSavedMovie(id: number): Promise<Movie>;

  /**
   * Handles the logic for updating the details of a saved movie.
   *
   * @param updateMovie A DTO containing data for updating the movie.
   * @returns A Promise that resolves to a partially populated Movie object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  handleUpdateMovieDetail(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;

  /**
   * Handles the logic for deleting a saved movie by its ID.
   *
   * @param id The unique identifier of the movie to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  handleDeleteSavedMovie(id: number): Promise<boolean>;
}
