import {
  CreateMovieDto,
  Movie,
  MovieEntity,
  MovieRepository,
  UpdateMovieDto,
} from "@domain/movies";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";
import { Repository } from "typeorm";

/**
 * Injectable persistence implementation of the MovieRepository interface.
 * This class interacts with a data store (likely a database) using TypeORM's Repository API
 * to manage movie data.
 */
@Injectable()
export class MovieRepositoryPersistence implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  /**
   * @inheritdoc MovieRepository.createMovie
   */
  async createMovie(createMovie: CreateMovieDto): Promise<Movie> {
    if (!createMovie) {
      throw new BadRequestException(`Movie ${createMovie} is Invalid`);
    }
    const newMovie = this.moviesRepository.create(createMovie);
    return await this.moviesRepository.save(newMovie);
  }

  /**
   * @inheritdoc MovieRepository.findAllMovie
   */
  async findAllMovie(
    pagination: PaginateQuery,
  ): Promise<Paginated<MovieEntity>> {
    if (!pagination) {
      throw new BadRequestException(`Error fetch paginate movie`);
    }
    return paginate(pagination, this.moviesRepository, {
      sortableColumns: ["id", "title", "director", "poster"],
      defaultSortBy: [["title", "DESC"]],
      searchableColumns: ["title", "director"],
      select: ["id", "title", "director", "poster"],
    });
  }

  /**
   * @inheritdoc MovieRepository.findOneMovie
   */
  async findOneMovie(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id: id });

    if (!movie) {
      throw new NotFoundException(`Movie with ${id} not found`);
    }

    return movie;
  }

  /**
   * @inheritdoc MovieRepository.updateMovie
   */
  async updateMovie(
    id: number,
    updateMovie: UpdateMovieDto,
  ): Promise<Partial<Movie>> {
    const movie = await this.moviesRepository.update(id, updateMovie);

    if (!updateMovie.id) {
      throw new NotFoundException(`Movie Update ${id} not found`);
    }

    if (!movie) {
      throw new BadRequestException(`Update Movie ${movie} data is invalid`);
    }

    return { id, ...movie };
  }

  /**
   * @inheritdoc MovieRepository.deleteMovie
   */
  async deleteMovie(id: number): Promise<boolean> {
    const deleteMovie = await this.moviesRepository.delete(id);

    if (!deleteMovie) {
      throw new NotFoundException(`Movie width ${id} not found`);
    }

    return !!deleteMovie;
  }
}
