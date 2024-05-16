import { BaseProfileController } from "../base";
import { AddFavoreMovie } from "./dto/add-favore-movie/add-favore-movie.interface";

/**
 * Extends the base profile controller contract with functionalities for managing a user's favorite movie categories.
 *
 * @interface ProfileContributorController
 * @extends BaseProfileController
 */
export interface ProfileContributorController extends BaseProfileController {
  /**
   * Handles a request to add a movie to the user's favorite categories.
   *
   * @method handlerAddMovieCategorie
   * @returns {Promise<AddFavoreMovie>} A Promise that resolves to an object of type `AddFavoreMovie` representing the added movie category information (if successful).
   */
  handlerAddMovieCategorie(): Promise<AddFavoreMovie>;

  /**
   * Handles a request to delete a movie from the user's favorite categories.
   *
   * @method handlerDeleteMovieCategorie
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the movie category was deleted successfully, or `false` otherwise.
   */
  handlerDeleteMovieCategorie(): Promise<boolean>;
}
