/**
 * This interface defines the application logic for deleting a category movie relation
 */

export interface DeleteCategoryMovieUsecase {
  /**
   * Delete a category movie relation with the given ID
   *
   * @param idCategory The unique identifier of the category to delete relation.
   * @param idMovie The unique identifier of the movie to delete relation.
   * @returns A promise that resolves to true if the category was deleted successfully, false otherwise.
   */
  execute(idCategory: number, idMovie: number): Promise<boolean>;
}
