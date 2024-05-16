import { AddFavoreMovie } from "./dto/add-favore-movie/add-favore-movie.interface";
import { BaseProfileRepository } from "../base";

/**
 * Extends the base profile repository contract with functionalities for managing a user's favorite movie categories at the data persistence level.
 *
 * @interface ProfileContributorRepository
 * @extends BaseProfileRepository
 */
export interface ProfileContributorRepository extends BaseProfileRepository {
  /**
   * Adds a movie to the user's favorite categories (data persistence).
   *
   * @method addMovieCategorie
   * @returns {Promise<AddFavoreMovie>} A Promise that resolves to an object of type `AddFavoreMovie` representing the added movie category information (if successful).
   */
  addMovieCategorie(): Promise<AddFavoreMovie>;

  /**
   * Removes a movie from the user's favorite categories (data persistence).
   *
   * @method deleteMovieCategorie
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the movie category was removed successfully, or `false` otherwise.
   */
  deleteMovieCategorie(): Promise<boolean>;
}
