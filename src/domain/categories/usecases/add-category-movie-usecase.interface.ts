import { AddCategoryMovieDto } from "../dto";

/**
 * @interface AddCategoryMovieUsecase
 * @description Interface defining the contract for the use case of adding a category to a movie.
 */
export interface AddCategoryMovieUsecase {
  /**
   * Executes the use case for adding a category to a movie.
   *
   * @param {number} idMovie - The ID of the movie to associate with the category.
   * @param {number} idCategory - The ID of the category to add to the movie.
   * @returns {Promise<AddCategoryMovieDto>} - A promise that resolves to a DTO representing the updated association between movie and category.
   */
  execute(idMovie: number, idCategory: number): Promise<AddCategoryMovieDto>;
}
