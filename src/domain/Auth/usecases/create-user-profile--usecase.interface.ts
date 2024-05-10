import { ProfileEntity } from "@domain/profiles";
import { CreateUserProfile } from "../dto";

export interface CreateUserProfileUsecase {
  execute(createProfileDto: CreateUserProfile): Promise<ProfileEntity>;
}
