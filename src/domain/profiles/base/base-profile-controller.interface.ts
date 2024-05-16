import { Profile } from "../Profile.entity";
import { UpdateProfileDto } from "../dto/update-profile-dto/update-profile-dto.interface";

/**
 * Defines the base controller contract for managing profile data.
 *
 * @interface BaseProfileController
 */
export interface BaseProfileController {
  /**
   * Handles a request to find a saved profile by its ID.
   *
   * @method handleFindOneSavedProfile
   * @param {number} id - The ID of the profile to find.
   * @returns {Promise<Profile>} A Promise that resolves to the full profile object if found, or `undefined` if not found.
   */
  handleFindOneSavedProfile(id: number): Promise<Profile>;

  /**
   * Handles a request to update profile details.
   *
   * @method handleUpdateProfileDetail
   * @param {UpdateProfileDto} updateProfile - An object containing the update data for the profile. See [UpdateProfileDto Documentation](link/to/update-profile-dto-docs.html) for details on the expected properties (if available).
   * @returns {Promise<Partial<Profile>>} A Promise that resolves to a partially updated profile object (containing only the updated fields).
   */
  handleUpdateProfileDetail(
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>>;

  /**
   * Handles a request to delete a saved profile.
   *
   * @method handleDeleteSavedProfile
   * @param {number} id - The ID of the profile to delete.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the profile was deleted successfully, or `false` otherwise.
   */
  handleDeleteSavedProfile(id: number): Promise<boolean>;
}
