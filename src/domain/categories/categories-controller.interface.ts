import { CategoriesEntity } from ".";
import { AddCategoryMovieDto, CreateCategoryDto } from "./dto";

/**
 * @interface CategoriesController
 * @description Interface defining the contract for category-related operations exposed through the controller.
 */
export interface CategoriesController {
  /**
   * Handles the creation of a new category in the database and potentially publishes it (implementation-specific).
   *
   * @param {CreateCategoryDto} category - The data to create the category with.
   * @returns {Promise<CategoriesEntity>} - A promise that resolves to the created category entity.
   * @throws {Error} - If there is an error creating or publishing the category.
   */
  handlerCreateCategoryAndPublish(
    category: CreateCategoryDto,
  ): Promise<CategoriesEntity>;

  /**
   * Handles adding a category to a movie association in the database.
   *
   * @param {number} idMovie - The ID of the movie to associate with the category.
   * @param {number} idCategory - The ID of the category to add to the movie.
   * @returns {Promise<AddCategoryMovieDto>} - A promise that resolves to a DTO representing the updated association between movie and category.
   * @throws {Error} - If there is an error adding the category to the movie.
   */
  handlerAddCategoryToMovieRelation(
    idMovie: number,
    idCategory: number,
  ): Promise<AddCategoryMovieDto>;

  /**
   * Handles removing a category association from a movie in the database (implementation-specific).
   *
   * @param {number} idMovie - The ID of the movie to remove the category from.
   * @param {number} idCategory - The ID of the category to remove.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the category was successfully removed, `false` otherwise.
   * @throws {Error} - If there is an error removing the category association.
   */
  handlerRemoveCategoryMovieSaved(
    idMovie: number,
    idCategory: number,
  ): Promise<boolean>;

  /**
   * Handles removing a category from the database (implementation-specific).
   *
   * @param {number} id - The ID of the category to remove.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the category was successfully removed, `false` otherwise.
   * @throws {Error} - If there is an error removing the category.
   */
  handlerRemoveCategorySaved(id: number): Promise<Boolean>;
}
