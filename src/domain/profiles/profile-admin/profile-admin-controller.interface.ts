import { BaseProfileController } from "../base";

/**
 * Extends the base profile controller contract with additional admin functionalities for managing profile data.
 *
 * @interface ProfileAdminController
 * @extends BaseProfileController
 */
export interface ProfileAdminController extends BaseProfileController {
  /**
   * Handles a request to delete a saved profile by an admin user.
   *
   * @method handleDeleteSavedUser
   * @param {number} id - The ID of the profile to delete.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the profile was deleted successfully, or `false` otherwise.
   */
  handleDeleteSavedUser(id: number): Promise<boolean>;
}
