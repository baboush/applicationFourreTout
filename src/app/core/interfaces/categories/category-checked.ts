import { NameCategory } from "@shared/types";

/**
 * Interface for CategoriesChecked.
 * This interface represents a category that has been checked relation database many to many.
 *
 * @property {number} id - The unique identifier for the category.
 * @property {string} name - The name of the category.
 * @property {boolean} checked - The state of the category, true if checked, false otherwise.
*/
export interface CategoryChecked {
  readonly id: number;
  readonly name: NameCategory;
  readonly checked: boolean;
}
