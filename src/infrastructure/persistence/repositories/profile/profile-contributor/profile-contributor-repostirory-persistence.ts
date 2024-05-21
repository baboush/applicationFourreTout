import { Profile } from "@domain/profiles/Profile.entity";
import { UpdateProfileDto } from "@domain/profiles/dto/update-profile-dto/update-profile-dto.interface";
import { AddFavoreMovie } from "@domain/profiles/profile-moderator/dto/add-favore-movie/add-favore-movie.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileContributorRepository } from "@domain/profiles/profile-moderator";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { MovieEntity } from "@domain/movies";
import { NameCategory } from "@shared/types";
import { CategoriesEntity } from "@domain/categories";
import { throwError } from "rxjs";

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
  implements ProfileContributorRepository
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ) {}

  async updateProfile(
    id: number,
    updateProfile: UpdateProfileDto,
  ): Promise<Partial<Profile>> {
    const updatedProfile: UpdateProfileDto =
      await this.profileRepository.update(id, updateProfile);

    if (!updatedProfile) {
      throw new BadRequestException(`Update profile ${id} failed`);
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

  async deleteProfile(id: number): Promise<boolean> {
    const isDeleted = await this.profileRepository.delete(id);

    if (!isDeleted) {
      throw new BadRequestException(`Profile ${id} not found `);
    }
    return !!isDeleted;
  }

  async addMovieCategorie(
    idMovie: number,
    idCategory: number,
  ): Promise<AddFavoreMovie> {
    const movie = await this.movieRepository.findOne({
      where: { id: idMovie },
    });
    const category = await this.categoryRepository.findOne({
      where: { id: idCategory },
    });

    if (!movie) {
      throw new NotFoundException(`Movie ${idMovie} not found`);
    }

    if (!category) {
      throw new NotFoundException(`Category ${idCategory} not found`);
    }

    const addCategoryToMovie = movie.categories.push(category);
    const saveCategoryToMovie = await this.movieRepository.save(movie);
    return new saveCategoryToMovie();
  }
  async deleteMovieCategorie(): Promise<boolean> {
    return true;
  }
}
