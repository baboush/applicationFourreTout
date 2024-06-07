import { CategoriesEntity } from ".";
import { CreateCategoryDto } from "./dto";

/**
 * @interface CategoriesService
 * @description Interface defining the contract for interacting with category-related operations.
 */
export interface CategoriesService {
  /**
   * Creates a new category in the database and potentially publishes it (implementation-specific).
   *
   * @param {CreateCategoryDto} category - The data to create the category with.
   * @returns {Promise<CategoriesEntity>} - A promise that resolves to the created category entity.
   * @throws {Error} - If there is an error creating or publishing the category.
   */
  createCategoryAndPublish(
    category: CreateCategoryDto,
  ): Promise<Partial<CategoriesEntity>>;

  /**
   * Adds a category to a movie association in the database.
   *
   * @param {number} idMovie - The ID of the movie to associate with the category.
   * @param {number} idCategory - The ID of the category to add to the movie.
   * @returns {Promise<AddCategoryMovieDto>} - A promise that resolves to a DTO representing the updated association between movie and category.
   * @throws {Error} - If there is an error adding the category to the movie.
   */
  addCategoryToMovieRelation(
    idMovie: number,
    idCategory: number,
  ): Promise<boolean>;

  /**
   * Removes a category association from a movie in the database (implementation-specific).
   *
   * @param {number} idMovie - The ID of the movie to remove the category from.
   * @param {number} idCategory - The ID of the category to remove.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the category was successfully removed, `false` otherwise.
   * @throws {Error} - If there is an error removing the category association.
   */
  removeCategoryMovieSaved(
    idMovie: number,
    idCategory: number,
  ): Promise<boolean>;

  /**
   * Removes a category from the database (implementation-specific).
   *
   * @param {number} id - The ID of the category to remove.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the category was successfully removed, `false` otherwise.
   * @throws {Error} - If there is an error removing the category.
   */
  removeCategorySaved(id: number): Promise<Boolean>;

  /**
   * Find all categories (implementation-specific).
   *
   * @returns {Promise<CategoriesEntity[]>} - A promise that resolves to list CategoriesEntity.
   * @throws {Error} - If there is an error removing the category.
   */
  findAllCategorySaved(): Promise<CategoriesEntity[]>;
}
