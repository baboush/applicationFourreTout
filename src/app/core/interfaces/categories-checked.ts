/**
 * Interface for CategoriesChecked.
 * This interface represents a category that has been checked relation database many to many.
 *
 * @property {number} id - The unique identifier for the category.
 * @property {string} name - The name of the category.
 * @property {boolean} checked - The state of the category, true if checked, false otherwise.
*/
export interface CategoriesChecked {
  readonly id: number;
  readonly name: string;
  readonly checked: boolean;
}
