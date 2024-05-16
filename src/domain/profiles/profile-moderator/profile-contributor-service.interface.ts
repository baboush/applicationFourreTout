import { BaseProfileService } from "../base";
import { AddFavoreMovie } from "./dto/add-favore-movie/add-favore-movie.interface";

/**
 * Extends the base profile service contract with functionalities for managing a user's favorite movie categories.
 *
 * @interface ProfileContributorService
 * @extends BaseProfileService
 */
export interface ProfileContributorService extends BaseProfileService {
  /**
   * Adds a movie to the user's favorite categories.
   *
   * @method addMovieCategory
   * @returns {Promise<AddFavoreMovie>} A Promise that resolves to an object of type `AddFavoreMovie` representing the added movie category information (if successful).
   */
  addMovieCategory(): Promise<AddFavoreMovie>;

  /**
   * Removes a movie from the user's favorite categories.
   *
   * @method removeMovieCategory
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the movie category was removed successfully, or `false` otherwise.
   */
  removeMovieCategory(): Promise<boolean>;
}
