import { AbstractGeneralService } from "@application/generics/general";
import { MovieEntity, MovieService } from "@domain/movies";
import { MovieRepositoryPersistence } from "@infrastructure/persistence/repositories";
import { Injectable } from "@nestjs/common";
import { CreateMovieDtoImp, ReadMovieDtoImp, UpdateMovieDtoImp } from "./dto";

/**
 * Injectable application service implementation of the MovieService interface.
 * This class interacts with the MovieRepository to manage movie data at the application level.
 * It handles additional logic beyond data persistence.
 */
@Injectable()
export class MovieServiceImp
  extends AbstractGeneralService<MovieEntity>
  implements MovieService
{
  constructor(movieRepository: MovieRepositoryPersistence) {
    super(movieRepository);
  }

  /**
   * @inheritdoc MovieService.createAndPublishMovie
   */
  async createAndPublishMovie(
    createMovie: CreateMovieDtoImp,
  ): Promise<Partial<CreateMovieDtoImp>> {
    return await super.createEntity(createMovie);
  }

  /**
   * @inheritdoc MovieService.findSavedMoviesList
   */
  async findSavedMoviesList(): Promise<ReadMovieDtoImp[]> {
    return await super.findAllEntity();
  }

  /**
   * @inheritdoc MovieService.findOneSavedMovie
   */
  async findOneSavedMovie(id: number): Promise<ReadMovieDtoImp> {
    return await super.findOneEntity(id);
  }

  /**
   * @inheritdoc MovieService.updateMovieDetail
   */
  async updateMovieDetail(
    updateMovie: UpdateMovieDtoImp,
  ): Promise<Partial<UpdateMovieDtoImp>> {
    return await super.updateEntity(updateMovie.id, updateMovie);
  }

  /**
   * @inheritdoc MovieService.deleteSavedMovie
   */
  async deleteSavedMovie(id: number): Promise<boolean> {
    return await super.deleteEntity(id);
  }
}
