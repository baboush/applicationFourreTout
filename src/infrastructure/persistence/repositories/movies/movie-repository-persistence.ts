import {
  CreateMovieDto,
  MovieEntity,
  MovieRepository,
  ReadMovieDto,
  UpdateMovieDto,
} from "@domain/movies";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AbstractGeneralRepository } from "@infrastructure/persistence/repositories/generics/general";

@Injectable()
export class MovieRepositoryPersistence
  extends AbstractGeneralRepository<MovieEntity>
  implements MovieRepository
{
  entityName = "Movie";
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {
    super(movieRepository);
  }
  /**
   * @inheritdoc MovieRepository.createMovie
   */
  async createMovie(createMovie: CreateMovieDto): Promise<CreateMovieDto> {
    await super.createEntity(createMovie);

    return {
      title: createMovie.title,
      director: createMovie.director,
      poster: createMovie.poster,
    };
  }

  /**
   * @inheritdoc MovieRepository.findAllMovie
   */
  async findAllMovies(
    entity: string,
    entityRelation: string,
  ): Promise<ReadMovieDto[]> {
    return await super.findAllEntities(entity, entityRelation);
  }

  /**
   * @inheritdoc MovieRepository.findOneMovie
   */
  async findOneMovie(id: number): Promise<ReadMovieDto> {
    return await super.findOneEntity(id);
  }

  /**
   * @inheritdoc MovieRepository.updateMovie
   */
  async updateMovie(
    id: number,
    updateMovie: UpdateMovieDto,
  ): Promise<Partial<UpdateMovieDto>> {
    return await super.updateEntity(id, updateMovie);
  }

  /**
   * @inheritdoc MovieRepository.deleteMovie
   */
  async deleteMovie(id: number): Promise<boolean> {
    return await super.deleteEntity(id);
  }
}
