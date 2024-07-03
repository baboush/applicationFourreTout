import { BaseProfileRepository } from "../base";
import { AddFavortiteMovie } from "./dto/add-favortite-movie.interface";
import { AddMovieList } from "./dto/add-movie-list.interface";

/**
 * Extends the base profile repository contract with functionalities for interacting with a user's movie interactions at the data persistence level, specifically within the context of Lambda functions.
 *
 * @interface UserLambdaRepostiory
 * @extends BaseProfileRepository
 */

export interface ProfileLambdaRepostiory extends BaseProfileRepository {
  /**
   * Adds a movie to the user's profile (data persistence).
   *
   * @method addMovie
   * @param {number} id The ID of the movie to be added.
   * @returns {Promise<AddMovieList>} A Promise that resolves to an object of type `AddMovieList` representing the information about the added movie (if successful).
   */
  addMovie(id: number): Promise<AddMovieList>;

  /**
   * Removes a movie from the user's profile (data persistence).
   *
   * @method removeMovie
   * @param {number} id The ID of the movie to be removed.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the movie was removed successfully, or `false` otherwise.
   */
  removeMovie(id: number): Promise<boolean>;

  /**
   * Adds a movie to the user's favorite movies (data persistence).
   *
   * @method addMovieFavorite
   * @param {number} id The ID of the movie to be saved as a favorite.
   * @returns {Promise<AddFavortiteMovie>} A Promise that resolves to an object of type `AddFavortiteMovie` representing the information about the added favorite movie (if successful).
   */
  addMovieFavorite(id: number): Promise<AddFavortiteMovie>;
}
