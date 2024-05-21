import { Profile } from "../Profile.entity";
import { UpdateProfileDto } from "../dto/update-profile-dto.interface";
/**
 * Defines the base service contract for managing profile data.
 *
 * @interface BaseProfileService
 */
export interface BaseProfileService {
  /**
   * Retrieves a saved profile by its ID.
   *
   * @method findOneSavedProfile
   * @param {number} id - The ID of the profile to find.
   * @returns {Promise<Profile>} A Promise that resolves to the full profile object if found, or `undefined` if not found.
   */
  findOneSavedProfile(id: number): Promise<Profile>;

  /**
   * Updates profile details.
   *
   * @method updateProfileDetail
   * @param {UpdateProfileDto} updateProfile - An object containing the update data for the profile. See [UpdateProfileDto Documentation](link/to/update-profile-dto-docs.html) for details on the expected properties (if available).
   * @returns {Promise<Partial<Profile>>} A Promise that resolves to a partially updated profile object (containing only the updated fields).
   */
  updateProfileDetail(
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>>;

  /**
   * Deletes a saved profile.
   *
   * @method deleteSavedProfile
   * @param {number} id - The ID of the profile to delete.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the profile was deleted successfully, or `false` otherwise.
   */
  deleteSavedProfile(id: number): Promise<boolean>;
}
