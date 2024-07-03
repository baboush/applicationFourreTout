import { BaseProfileController } from "../base";
import { AddFavortiteMovie } from "./dto/add-favortite-movie.interface";
import { AddMovieList } from "./dto/add-movie-list.interface";

/**
 * Extends the base profile controller contract with functionalities for managing a user's movie interactions through Lambda functions.
 *
 * @interface UserLambdaController
 * @extends BaseProfileController
 */
export interface ProfileLambdaController extends BaseProfileController {
  /**
   * Handles saving a movie to the user's profile (Lambda function handler).
   *
   * @method handlerSaveMovieInProfile
   * @returns {Promise<AddMovieList>} A Promise that resolves to an object of type `AddMovieList` representing the information about the added movie (if successful).
   */
  handlerSaveMovieInProfile(): Promise<AddMovieList>;

  /**
   * Handles removing a saved movie from the user's profile (Lambda function handler).
   *
   * @method handlerRemoveMovieSavedInProfile
   * @param {number} id The ID of the movie to be removed.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the movie was removed successfully, or `false` otherwise.
   */
  handlerRemoveMovieSavedInProfile(id: number): Promise<boolean>;

  /**
   * Handles saving a movie to the user's favorite movies (Lambda function handler).
   *
   * @method handlerSaveMovieInProfileFavorite
   * @param {number} id The ID of the movie to be saved as a favorite.
   * @returns {Promise<AddFavortiteMovie>} A Promise that resolves to an object of type `AddFavortiteMovie` representing the information about the added favorite movie (if successful).
   */
  handlerSaveMovieInProfileFavorite(id: number): Promise<AddFavortiteMovie>;
}
