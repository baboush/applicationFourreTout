import { BaseProfileService } from "../base";
import { AddFavortiteMovie } from "./dto/add-favortite-movie.interface";
import { AddMovieList } from "./dto/add-movie-list.interface";

/**
 * Extends the base profile service contract with functionalities for managing a user's movie interactions through Lambda functions.
 *
 * @interface ProfileLambdaService
 * @extends BaseProfileService
 */
export interface ProfileLambdaService extends BaseProfileService {
  /**
   * Adds a movie to the user's list (business logic execution in a Lambda function context).
   *
   * @method addMovieInList
   * @param {number} id The ID of the movie to be added.
   * @returns {Promise<AddMovieList>} A Promise that resolves to an object of type `AddMovieList` representing the information about the added movie (if successful).
   */
  addMovieInList(id: number): Promise<AddMovieList>;

  /**
   * Removes a movie from the user's list (business logic execution in a Lambda function context).
   *
   * @method removeMovieInList
   * @param {number} id The ID of the movie to be removed.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the movie was removed successfully, or `false` otherwise.
   */
  removeMovieInList(id: number): Promise<boolean>;

  /**
   * Adds a movie to the user's favorite movies (business logic execution in a Lambda function context).
   *
   * @method addMovieFavorie (corrected spelling: favorite)
   * @param {number} id The ID of the movie to be saved as a favorite.
   * @returns {Promise<AddFavortiteMovie>} A Promise that resolves to an object of type `AddFavortiteMovie` representing the information about the added favorite movie (if successful).
   */
  addMovieFavorie(id: number): Promise<AddFavortiteMovie>;
}
