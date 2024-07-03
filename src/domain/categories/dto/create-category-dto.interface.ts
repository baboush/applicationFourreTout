import { NameCategory } from "@shared/types";

/**
 * @interface CreateCategoryDto
 * @description Interface representing the data required to create a new category.
 */
export interface CreateCategoryDto {
  /**
   * The id of the catgory.
   */
  readonly id?: number;

  /**
   * The name of the category.
   */
  readonly name: NameCategory;
}
