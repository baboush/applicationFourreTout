import { CategoriesEntity } from ".";
import { AddCategoryMovieDto, CreateCategoryDto } from "./dto";

/**
 * @interface CategoriesRepository
 * @description Interface defining the contract for interacting with the categories repository.
 */
export interface CategoriesRepository {
  /**
   * Creates a new category in the database.
   *
   * @param {CreateCategoryDto} category - The data to create the category with.
   * @returns {Promise<CategoriesEntity>} - A promise that resolves to the created category entity.
   * @throws {Error} - If there is an error creating the category.
   */
  createCategory(category: CreateCategoryDto): Promise<CategoriesEntity>;

  /**
   * Adds a category to a movie in the database.
   *
   * @param {number} idMovie - The ID of the movie to associate with the category.
   * @param {number} idCategory - The ID of the category to add to the movie.
   * @returns {Promise<AddCategoryMovieDto>} - A promise that resolves to a DTO representing the updated association between movie and category.
   * @throws {Error} - If there is an error adding the category to the movie.
   */
  addCategoryMovie(
    idMovie: number,
    idCategory: number,
  ): Promise<AddCategoryMovieDto>;

  /**
   * Removes a category association from a movie in the database.
   *
   * @param {number} idMovie - The ID of the movie to remove the category from.
   * @param {number} idCategory - The ID of the category to remove.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the category was successfully removed, `false` otherwise.
   * @throws {Error} - If there is an error removing the category association.
   */
  removeCategoryMovie(idMovie: number, idCategory: number): Promise<boolean>;

  /**
   * Removes a category from the database.
   *
   * @param {number} id - The ID of the category to remove.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the category was successfully removed, `false` otherwise.
   * @throws {Error} - If there is an error removing the category.
   */
  removeCategory(id: number): Promise<Boolean>;
}
