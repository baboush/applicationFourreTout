import { BaseProfileService } from "../base";

/**
 * Extends the base profile service contract with additional admin functionalities.
 *
 * @interface ProfileAdminService
 * @extends BaseProfileService
 */
export interface ProfileAdminService extends BaseProfileService {
  /**
   * Deletes a saved profile. For admin-level deletion with potentially
   *  different behavior, set the `isAdminDelete` flag to true.
   *
   * @method deleteSavedProfile
   * @param {number} id - The ID of the profile to delete.
   * @param {boolean} [isAdminDelete=false] - Optional flag indicating an admin-level deletion.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the profile was deleted successfully, or `false` otherwise.
   */
  deleteSavedProfile(id: number): Promise<boolean>;
}
