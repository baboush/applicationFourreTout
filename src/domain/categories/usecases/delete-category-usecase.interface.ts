/**
 * This interface defines the application logic for deleting a category.
 */
export interface DeleteCategory {
  /**
   * Deletes a category with the given ID.
   *
   * @param id The unique identifier of the category to delete.
   * @returns A promise that resolves to true if the category was deleted successfully, false otherwise.
   */
  execute(id: number): Promise<boolean>;
}
