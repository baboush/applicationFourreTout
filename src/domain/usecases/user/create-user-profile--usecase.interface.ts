import { CreateUserProfile } from '@domain/dto';
import { Profile } from '@domain/entities/Profile.entity';

export interface CreateUserProfileUsecase {
  execute(createProfileDto: CreateUserProfile): Promise<Profile>;
}
