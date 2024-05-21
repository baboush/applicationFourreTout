import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProfileAdminRepository } from "@domain/profiles/profile-admin";
import { Profile } from "@domain/profiles/Profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@domain/Auth/User.entity";
import { UpdateProfileDto } from "@domain/profiles/dto/update-profile-dto.interface";

/**
 * ProfileAdminRepositoryPersistence
 * @class
 * @implements {ProfileAdminRepository}
 * @Injectable
 *
 * @param {@private @readonly Repository<Profile>} - Repository Profile
 * @param {@private @readonly Repository<User>} - Repository user
 */
@Injectable()
export class ProfileAdminRepositoryPersistence
  implements ProfileAdminRepository
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @inheritdoc ProfileAdminRepository.updateProfile
   */
  async updateProfile(
    id: number,
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>> {
    const updatedProfile = await this.profileRepository.update(
      id,
      updateProfile,
    );

    if (!updatedProfile) {
      throw new BadRequestException(`Profile bad data`);
    }
    return { id, ...updatedProfile };
  }

  /**
   * @inheritdoc ProfileAdminRepository.findProfile
   */
  async findProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id: id } });

    if (!profile) {
      throw new NotFoundException(`Profile not found`);
    }

    return profile;
  }

  /**
   * @ ProfileAdminRepository.deleteProfile
   */
  async deleteProfile(id: number): Promise<boolean> {
    const profileDelete = await this.profileRepository.delete(id);

    if (!profileDelete) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return !!profileDelete;
  }

  /**
   * @inheritdoc ProfileAdminRepository.deletedUserLambda
   */
  async deletedUserLambda(id: number): Promise<boolean> {
    const userDelete = await this.userRepository.delete(id);

    if (!userDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return !!userDelete;
  }
}
