import { Profile } from "../Profile.entity";
import { UpdateProfileDto } from "../dto/update-profile-dto/update-profile-dto.interface";

export interface BaseProfileRepository {
  updateMovie(
    id: number,
    updateMovie: UpdateProfileDto,
  ): Promise<Partial<Profile>>;
  findProfile(id: number): Promise<Profile>;
  deleteMovie(id: number): Promise<boolean>;
}
