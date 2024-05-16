import { Profile } from "../Profile.entity";
import { UpdateProfileDto } from "../dto/update-profile-dto/update-profile-dto.interface";

/**
 * Defines the base repository contract for managing profile data.
 *
 * @interface BaseProfileRepository
 */
export interface BaseProfileRepository {
  /**
   * Updates a profile in the database.
   *
   * @method updateProfile
   * @param {number} id - The ID of the profile to update.
   * @param {UpdateProfileDto} updateProfile - An object containing the update data for the profile.
   * @returns {Promise<Partial<Profile>>} A Promise that resolves to a partially updated profile object (containing only the updated fields).
   */
  updateProfile(
    id: number,
    updateMovie: UpdateProfileDto,
  ): Promise<Partial<Profile>>;

  /**
   * Finds a profile by its ID from the database.
   *
   * @method findProfile
   * @param {number} id - The ID of the profile to find.
   * @returns {Promise<Profile>} A Promise that resolves to the full profile object if found, or `undefined` if not found.
   */
  findProfile(id: number): Promise<Profile>;

  /**
   * Deletes a profile from the database.
   *
   * @method deleteProfile
   * @param {number} id - The ID of the profile to delete.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the profile was deleted successfully, or `false` otherwise.
   */
  deleteProfile(id: number): Promise<boolean>;
}
