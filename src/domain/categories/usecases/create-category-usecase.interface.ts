import { CategoriesEntity } from "..";
import { CreateCategoryDto } from "../dto";

/**
 * @interface CreateCategoryUsecase
 * @description Interface defining the contract for the use case of creating a new category.
 */
export interface CreateCategoryUsecase {
  /**
   * Executes the use case for creating a new category.
   *
   * @param {CreateCategoryDto} createCategory - The data required to create a new category.
   * @returns {Promise<CategoriesEntity>} - A promise that resolves to the newly created category entity.
   * @throws {Error} - If there is an error creating the category.
   */
  execute(createCategory: CreateCategoryDto): Promise<CategoriesEntity>;
}
