import { Profile } from "../Profile.entity";
import { UpdateProfileDto } from "../dto/update-profile-dto/update-profile-dto.interface";

export interface BaseProfileService {
  findOneSavedProfile(id: number): Promise<Profile>;
  updateProfileDetail(
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>>;
  deleteSavedProfile(id: number): Promise<boolean>;
}
