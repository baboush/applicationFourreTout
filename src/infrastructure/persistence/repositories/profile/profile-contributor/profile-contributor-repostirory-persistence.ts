import { Profile } from "@domain/profiles/Profile.entity";
import { UpdateProfileDto } from "@domain/profiles/dto/update-profile-dto/update-profile-dto.interface";
import { ContributorProfileRepository } from "@domain/profiles/profile-moderator";
import { AddFavoreMovie } from "@domain/profiles/profile-moderator/dto/add-favore-movie/add-favore-movie.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

/**
 *ProfileContributorRepositoryPersistence
 * @class
 * @implements {ContributorProfileRepository}
 *
 * @constructor
 * @param {@private @readonly Repository Profile} - [Profile Repository]
 *
 */
@Injectable()
export class ProfileContributorRepositoryPersistence
  implements ContributorProfileRepository
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async updateProfile(
    id: number,
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>> {
    const updatedProfile: UpdateProfileDto =
      await this.profileRepository.update(id, updateProfile);

    if (!updatedProfile) {
      throw new BadRequestException(`Update profile failed`);
    }

    return updatedProfile;
  }

  async findProfile(id: number): Promise<Profile> {
    const profileFetch = this.profileRepository.findOne({ where: { id: id } });

    if (!profileFetch) {
      throw new NotFoundException(`Profile ${id} not found`);
    }

    return profileFetch;
  }

  async deleteProfile(id: number): Promise<boolean> {}

  async addMovieCategorie(): Promise<AddFavoreMovie> {
    return new AddFavoreMovie();
  }
  async deleteMovieCategorie(): Promise<boolean> {
    return true;
  }
}
