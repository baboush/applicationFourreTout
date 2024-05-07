import { Profile } from "@domain/entities/Profile.entity";
import { CreateUserProfile } from "../dto";

export interface CreateUserProfileUsecase {
  execute(createProfileDto: CreateUserProfile): Promise<Profile>;
}
