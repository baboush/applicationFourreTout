import { Categories } from "../http/model/categories";

/**
 * Interface for CategoriesEntity.
 * This interface represents a category entity which includes an array of categories.
 *
 * @property {number} id - The unique identifier for the category entity.
 * @property {Categories[]} categories - An array of categories associated with the entity.
 */
export interface CategoriesEntity {
  readonly id: number;
  readonly categories: Categories[];
}
