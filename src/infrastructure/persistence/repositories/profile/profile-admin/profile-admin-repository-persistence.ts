import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProfileAdminRepository } from "@domain/profiles/profile-admin";
import { UpdateProfileDto } from "@domain/profiles/dto/update-profile-dto/update-profile-dto.interface";
import { Profile } from "@domain/profiles/Profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, Repository } from "typeorm";
import { User } from "@domain/Auth/User.entity";

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
   * Update Profile database
   *
   * @async
   * @param {number} id - [id model]
   * @param {UpdateProfileDto} updateProfile - [DTO update Profile]
   * @throws {BadRequestException} - [BadRequestException invalide value]
   * @returns {Promise<Partial<Profile>>} [return promise partial<Profile>]
   */
  async updateProfile(
    id: number,
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>> {
    const updatedProfile: UpdateProfileDto =
      await this.profileRepository.update(id, updateProfile);
    if (!updatedProfile) {
      throw new BadRequestException(`Profile Error Update`);
    }
    return updatedProfile;
  }

  /**
   * Find Profile database
   *
   * @async
   * @param {number} id - [id profile]
   * @throws {NotFoundException} - [Profile not found]
   * @returns {Promise<Profile>} - [Return promise Profile]
   */
  async findProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id: id } });

    if (!profile) {
      throw new NotFoundException(`Profile not found`);
    }
    return profile;
  }

  /**
   * Delete Profile
   *
   * @async
   * @param {number} id - [Id Profile]
   * @throws {EntityNotFoundError} - [Entity Profile not found]
   * @returns {Promise<boolean>} [Return true if deleted]
   */
  async deleteProfile(id: number): Promise<boolean> {
    const isDeleted = false;
    const profileDelete = await this.profileRepository.delete(id);

    if (!profileDelete) {
      throw new EntityNotFoundError(Profile, id);
    }
    return !isDeleted;
  }

  /**
   * Delete User
   *
   * @async
   * @param {number} id - [Id User]
   * @throws {EntityNotFoundError} [Entity User not found]
   * @returns {Promise<boolean>} [Return true if deleted]
   */
  async deletedUserLambda(id: number): Promise<boolean> {
    const isDeleted = false;
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new EntityNotFoundError(Profile, id);
    }
    return !isDeleted;
  }
}
