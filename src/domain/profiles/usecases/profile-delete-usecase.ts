/**
 * Interface defining the contract for a use case responsible for deleting profiles.
 */
export interface ProfileDeleteUsecase {
  /**
   * Deletes a profile by its unique identifier.
   *
   * @param {number} id - The unique identifier of the profile to delete.
   * @returns {Promise<boolean>} A Promise that resolves to:
   *   - `true` if the deletion is successful.
   *   - `false` otherwise (likely with an error handled by the implementation).
   */
  execute(id: number): Promise<boolean>;
}
