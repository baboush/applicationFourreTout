/**
 * Interface defining the contract for a use case responsible for deleting movies.
 */
export interface DeleteMovieUsecase {
  /**
   * Deletes a movie by its unique identifier.
   *
   * @param {number} id The unique identifier of the movie to delete.
   * @returns {Promise<boolean>} A Promise that resolves to:
   *   - `true` if the deletion is successful.
   *   - `false` otherwise (likely with an error handled by the implementation).
   */
  execute(id: number): Promise<boolean>;
}
