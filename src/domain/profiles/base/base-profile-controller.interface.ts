import { Profile } from "../Profile.entity";
import { UpdateProfileDto } from "../dto/update-profile-dto/update-profile-dto.interface";

export interface BaseProfileController {
  handleFindOneSavedProfile(id: number): Promise<Profile>;
  handleUpdateProfileDetail(
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>>;
  handleDeleteSavedProfile(id: number): Promise<boolean>;
}
