import { ProfileEntity } from "..";
import { UpdateProfileDto } from "../dto/update-profile-dto.interface";

/**
 * Interface defining the contract for a use case responsible for updating profiles.
 */
export interface ProfileUpdateUsecase {
  /**
   * Updates a profile with the provided information.
   *
   * @param {number} id - The unique identifier of the profile to update.
   * @param {UpdateProfileDto} profileUpdate - An object containing the update data for the profile.
   * @returns {Promise<ProfileEntity>} A Promise that resolves to the updated ProfileEntity object
   *                                    if successful, or throws an error otherwise.
   */
  export(id: number, profileUpdate: UpdateProfileDto): Promise<ProfileEntity>;
}
